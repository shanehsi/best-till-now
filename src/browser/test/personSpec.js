import Person from '../main/Person';

describe('Person', () => {
  it('should report name', () => {
    expect(new Person('John').name).toEqual('John');
  });
});
