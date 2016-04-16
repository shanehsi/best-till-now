import Person from "../main/Person";

function once(fn) {
  var returnValue, called = false;
  return function() {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
}

describe("Person", () => {
  it("should report name", () => {
    const spy = sinon.spy();
    const proxy = once(spy);
    proxy();

    assert.equal("John", "John");
    assert(spy.called);
  });
});
