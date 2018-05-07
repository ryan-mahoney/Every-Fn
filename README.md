Every-Fn
========

Javascript function that iterates over an array of functions until one of the functions returns `false`. The output of each function is combined and passed as input to the next function call.

An optional initial state object may be provided.

If an asynchronous function is specified, `Every-Fn` will await it's response before calling the next function.

### Example
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
