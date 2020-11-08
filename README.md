# Every-Fn

## Every

`every` is a function that iterates over an list of functions until one of the functions returns `false`. The output of each function is merged into the output of the previously called function and passed as input to the next function call.

An optional initial state object may be provided as a second argument.

If an asynchronous function is specified, `every` will `await` it's return before calling the next function.

For example: `sample-controller.js`

```javascript
import { every } from "every-fn";
import {
  validateInput,
  sendValidationErrors,
  cleanUserInput,
  findCustomer,
  handleDbError,
  sendCustomerExistsError,
  sendLoginSuccessResponse
} from "./lib/customer-login.js";

export const loginCustomer = async (req, res) =>
  await every(
    [
      validateInput,
      sendValidationErrors,
      cleanUserInput,
      findCustomer,
      handleDbError,
      sendCustomerExistsError,
      sendLoginSuccessResponse
    ],
    { req, res }
  );
```
