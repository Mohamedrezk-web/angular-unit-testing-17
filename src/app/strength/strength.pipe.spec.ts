import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {
  let pipe: StrengthPipe;
  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('should display no strength if falsy value is passed in', () => {
    expect(
      pipe.transform(null as unknown as number) &&
        pipe.transform([] as unknown as number) &&
        pipe.transform('' as unknown as number)
    ).toBe('no strength');
  });

  it('should display weak if strength is 5', () => {
    expect(pipe.transform(5)).toBe('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    expect(pipe.transform(10)).toBe('10 (strong)');
  });

  it('should display unbelievable if strength is 20', () => {
    expect(pipe.transform(20)).toBe('20 (unbelievable)');
  });
});
