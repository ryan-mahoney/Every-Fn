import assert from "assert";
import { every, typed } from "./../src/index";

describe("every/2", () => {
  it("allows last function", () => {
    let executed = false;
    const input = [() => true, () => true, () => (executed = true)];
    every(input).then(() => {
      assert.equal(executed, true);
    });
  });

  it("skips last function", () => {
    let executed = false;
    const input = [() => true, () => false, () => (executed = true)];
    every(input).then(() => {
      assert.equal(executed, false);
    });
  });

  it("passes values accross functions", () => {
    let total = 0;
    const input = [
      () => ({
        value: 2
      }),
      context => {
        total = context.value * 5;
      }
    ];
    every(input).then(() => {
      assert.equal(total, 10);
    });
  });

  it("overrides values accross functions", () => {
    let actual;
    const expected = { a: 10, b: 10 };
    const input = [() => ({ a: 5, b: 10 }), context => ({ a: 10 })];
    every(input).then(actual => {
      assert.deepEqual(expected, actual);
    });
  });

  it("utilizes initial state", () => {
    const expected = { a: true };
    every([], expected).then(actual => {
      assert.deepEqual(expected, actual);
    });
  });
});

describe("typed/3", () => {
  const nameLength = typed({ name: String }, { count: Number }, ({ name }) => ({
    count: name.length
  }));

  const nameLengthBadReturn = typed(
    { name: String },
    { count: Number },
    ({ name }) => ({
      count: "Hello"
    })
  );

  const nameLengthAsync = typed({ name: String }, async ({ name }) => ({
    count: name.length
  }));

  const nameLengthAsyncReturnCheck = typed(
    { name: String },
    { count: Number },
    async ({ name }) => ({
      count: await new Promise(resolve =>
        setTimeout(() => {
          resolve(name.length);
        }, 100)
      )
    })
  );

  it("returns correct length", () => {
    const { count } = nameLength({ name: "Javascript" });
    assert.equal(count, 10);
  });

  it("returns type error on input", () => {
    assert.throws(() => {
      nameLength({ name: 100 });
    }, /TypeError: expecting arguments\[0\]\.name to be String, got Number 100/);
  });

  it("returns type error on output", () => {
    assert.throws(() => {
      nameLengthBadReturn({ name: "Javascript" });
    }, /TypeError: expecting return value\.count to be Number, got String "Hello"/);
  });

  it("validates only input of an async function", async () => {
    const { count } = await nameLengthAsync({ name: "Javascript" });
    assert.equal(count, 10);
  });

  it("can not handle return check of async function", () => {
    assert.throws(() => {
      nameLengthAsyncReturnCheck({ name: "Javascript" });
    }, /TypeError: expecting return value\.count to be Number, got undefined/);
  });
});
