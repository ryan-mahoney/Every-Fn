Every-Fn
========

Javascript helper function that iterates over an array of functions until one of the functions returns `false`.

If a function returns and object, the values are merged into the original object state and sent to the next function as input.

An initial state can optionally be provided.

Individual functions can be either synchronous or asynchronous functions.

The intent of the helper is to make it easier to write controller-like functionality by speficying a list of pure single-expression functions. Using single expression functions is optional.

### Example Before
```javascript
const loginCustomer = async (req, res) => {
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

### Example After
The `Every-Fn` function allows each block of logic from the previous controller to be re-written as a single expression pure function. The individual functions perform no assignment and have no `return` keyword. While this style may seem more verbose, it is makes it easier to test each stage of the controller individually.

```javascript
const checkForValidationErrors = ({ req }) => ({ errors: validationErrors(req.body) });

const sendValidationErrors = ({ res, errors }) =>
  errors
    ? jsonResponse(res, {
        status: "error",
        error: "Please check your input and resubmit.",
        errors: errors
      }) || false
    : {};

const cleanUserInput = ({ req }) => ({ data: cleanInput(req.body) });

const findCustomer = async ({ data }) => ({
  customer: await customerModel.findBy(data).first()
});

const sendNoCustomerError = ({ res, customer }) =>
  !customer
    ? jsonResponse(res, { status: "error", error: "Account not found." }) ||
      false
    : {};

const sendLoginResponse = ({ res, customer }) =>
  jsonResponse(res, { status: "ok", payload: { customer: customer } });

const loginCustomer = async (req, res) =>
  await everyFn(
    [
      checkForValidationErrors,
      sendValidationErrors,
      cleanUserInput,
      findCustomer,
      sendNoCustomerError,
      sendLoginResponse
    ],
    { req: req, res: res }
  )
```

