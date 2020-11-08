import assert from "assert";
import { every } from "./../src/index";

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
