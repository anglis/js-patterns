const CreateBox = function Box() {
  return this;
}

CreateBox.prototype.getVolume = function getVolume() {
  return this.height * this.width * this.length;
}

CreateBox.factory = function factory() {

}

describe('test suite for factory pattern', () => {
  it('should be defined', () => {
    expect(CreateBox).toBeDefined();
  });

  it('should have prototype getVolume method', () => {
    const box = new CreateBox();

    expect(box.getVolume).toBeDefined();
  });

  it('should have static factory method', () => {
    expect(CreateBox.factory).toBeDefined();
  });
});