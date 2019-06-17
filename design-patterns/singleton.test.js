describe('test suite for singletone objects', () => {
  it('should not be the same', () => {
    expect({}).not.toBe({});
  });

  it('should not be the same object even creating with new syntax', () => {
    function Box() {

    }

    expect(new Box()).not.toBe(new Box());
  });

  it('should be static variable', () => {
    function Box() {
      Box.randomInstace = Math.random();
      this.random = Math.random();

      return this;
    }

    const box1 = new Box();
    const box2 = new Box();

    expect(box1.randomInstace).toBe(box2.randomInstace);
    expect(box1.random).not.toBe(box2.random);
  });

  describe('test suite for sharing instance in a static property', () => {
    let Box;

    beforeEach(() => {
      Box = function Box() {
        if (typeof Box.instace === 'object') {
          return Box.instace;
        }

        // cache prev created obj.
        Box.instace = this;

        return this;
      }
    });

    it('should instance of Box', () => {
      const box = new Box();
      expect(box instanceof Box).toBe(true);
    });

    it('should return self', () => {
      const box = new Box();
      expect(box).toBe(box);
    });

    it('should share same instance', () => {
      const box1 = new Box();
      const box2 = new Box();

      expect(box1).toBe(box2);
    });
  });

  describe('test suite for instace in closure', () => {
    let Box;

    beforeEach(() => {
      Box = function BoxObj() {
        // cache instance
        const instace = this;

        Box = function () {
          return instace;
        }

        Box.prototype = this;
      };
    });

    it('should share same instance', () => {
      const box1 = new Box();
      const box2 = new Box();

      expect(box1).toBe(box2);
    });

    it('should share prototype variables', () => {
      Box.prototype.share = 'protoType1';
      const box1 = new Box();
      Box.prototype.shareAfterCreate = 'protoType2';
      const box2 = new Box();

      expect(box1.shareAfterCreate).toBe('protoType2');
      expect(box1.share).toBe('protoType1');
      expect(box2.shareAfterCreate).toBe('protoType2');
      expect(box2.share).toBe('protoType1');
    });
  });
});