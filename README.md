Every-Fn
========

Javascript helper function that iterates over an array of functions until one of the functions returns `false`.

If a function returns an object, the values are merged into the original object state and sent to the next function as input.

An initial state object may be provided.

Individual functions can be either synchronous or asynchronous, for this reason, `everyFn` returns a promise.

The intent of the helper is to make it easier to write controller-like functionality by speficying a list of small single-purpose functions.

### Example Before (pseudocode)
`controller.js`
```javascript
export const loginCustomer = async (req, res) => {
  const errors = validationErrors(req.body);
  if (errors) {
    jsonResponse(res, {
      status: "error",
      error: "Please check your input and resubmit.",
      errors: errors
    });
    return;
  }
  const data = cleanInput(req.body);
  const customer = await customerModel
    .findBy({ email: data.email, password: data.password })
    .first();
  if (!customer) {
    jsonResponse(res, { status: "error", error: "Account not found." });
    return;
  }

  jsonResponse(res, { status: "ok", payload: { customer: customer } });
};
```

### Example After (pseudocode)
`controller.js`
```
import {
  validateInput,
  sendValidationErrors,
  cleanUserInput,
  findCustomer,
  sendCustomerError,
  sendLoginSuccess
} from "./lib/customer-login.js";

export const loginCustomer = async (req, res) =>
  await everyFn(
    [
      validateInput,
      sendValidationErrors,
      cleanUserInput,
      findCustomer,
      sendCustomerError,
      sendLoginSuccess
    ],
    { req, res }
  )
```

`lib/customer-login.js`
```javascript
export const validateInput = ({ req }) => ({ errors: validationErrors(req.body) });

export const sendValidationErrors = ({ res, errors }) =>
  errors
    ? jsonResponse(res, {
        status: "error",
        error: "Please check your input and resubmit.",
        errors: errors
      }) || false
    : {};

export const cleanUserInput = ({ req }) => ({ data: cleanInput(req.body) });

export const findCustomer = async ({ data }) => ({
  customer: await customerModel.findBy(data).first()
});

export const sendCustomerError = ({ res, customer }) =>
  !customer
    ? jsonResponse(res, { status: "error", error: "Account not found." }) ||
      false
    : {};

export const sendLoginSuccess = ({ res, customer }) =>
  jsonResponse(res, { status: "ok", payload: { customer: customer } });
```



