describe('First test', () => {
  let sut;

  beforeEach(() => {
    // sut ==> system under test
    sut = {};
  });

  it('should be true', () => {
    // arrange pre condition of test
    sut.id = null;

    // act
    sut.id = 1;

    //assert
    expect(sut.id).toBe(1);
  });
});
