# Every-Fn

Javascript function that iterates over an array of functions until one of the functions returns `false`. The output of each function is merged into the output of the previously called function and passed as input to the next function call.

An optional initial state object may be provided.

If an asynchronous function is specified, `Every-Fn` will `await` it's return before calling the next function.

### Example

`sample-controller.js`

```
import { every } from "every-fn";
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
  );
```

---

### Example of Defining a Function With Runtime Type Checking

```
import { typed } from "every-fn";

export const nameLength = typed({ name: String }, { count: Number }, ({ name }) => ({
  count: name.length
}));

const { count } = nameLength({ name: "Javascript" });
// assert.equal(count, 10);

nameLength({ name: 100 });
// TypeError: expecting arguments[0].name to be String, got Number 100
```
