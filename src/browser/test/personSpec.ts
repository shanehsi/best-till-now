import Person from '../main/Person';

describe('Person', () => {
  it('should report name', () => {
    assert.equal(new Person("John").name, "John");
  });

  it("test a Promise with async/await", async () => {
    var testPromise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("Hello World!");
      }, 200);
    });

    var result = await testPromise;

    assert.equal(result, "Hello World!");
  });
});
