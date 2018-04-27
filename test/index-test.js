import assert from "assert";
import everyFn from "./../src/index";

describe("helper", () => {
  it("allows last function", () => {
    let executed = false;
    const input = [() => true, () => true, () => (executed = true)];
    everyFn(input);
    assert.equal(executed, true);
  });

  it("skips last function", () => {
    let executed = false;
    const input = [() => true, () => false, () => (executed = true)];
    everyFn(input);
    assert.equal(executed, false);
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
    everyFn(input);
    assert.equal(total, 10);
  });

  it("overrides values accross functions", () => {
    const expected = { a: 10, b: 10 };
    const input = [() => ({ a: 5, b: 10 }), context => ({ a: 10 })];
    const actual = everyFn(input);
    assert.deepEqual(expected, actual);
  });

  it("utilizes initial state", () => {
    const expected = { a: true };
    const actual = everyFn([], expected);
    assert.deepEqual(expected, actual);
  });
});
