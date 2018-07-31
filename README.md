# Every-Fn

Nano package that exports two functions: `every` and `typed`.

---

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

---

### Typed

The `typed` function is a helper that uses [ObjectModel](http://objectmodel.js.org/) for performing runtime type-checking.

For example `lib/some-lib.js`

```javascript
import { typed } from "every-fn";

export const nameLength = typed({ name: String }, { count: Number }, ({ name }) => ({
  count: name.length
}));

const { count } = nameLength({ name: "Javascript" });
// assert.equal(count, 10);

nameLength({ name: 100 });
// TypeError: expecting arguments[0].name to be String, got Number 100
```

For async functions, don't check the return value, just pass two arguments:

```javascript
import { typed } from "every-fn";

typed(
    { name: String },
    async ({ name }) => ({
      count: await new Promise(resolve =>
        setTimeout(() => {
          resolve(name.length);
        }, 100)
      )
    })
  )
```
