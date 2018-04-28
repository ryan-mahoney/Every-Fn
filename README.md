Every-Fn
========

Javascript helper function thate iterates over an array of functions until one function returns `false`.

The return values of each function are merged into a local state at each iteration and passed as an argument to the next function.

An initial state can optionally be provided.

The intent of the helper is to make it easier to write functions that do not require multiple returns.

### Example Before
```
const loginCustomer: async (req, res) => {
  const errors = validationErrors(req.body);
  if (errors) {
    jsonResponse(res, { status: "error", error: "Please check your input and resubmit.", errors: errors });
    return;
  }
  const data = cleanInput(req.body);
  const customer = await customerModel.findBy({ email: data.email, password: data.password }).first();
  if (!customer) {
    jsonResponse(res, { status: "error", error: "Account not found." });
    return;
  }

  jsonResponse(res, { status: "ok", payload: { customer: customer } });
}
```

### Example After
```

```