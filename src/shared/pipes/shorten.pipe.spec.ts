import { ShortenPipe } from './shorten.pipe';

describe('ShortenPipe', () => {
  it('should shorten text correctly', () => {
    const pipe = new ShortenPipe();
    const result = pipe.transform('Angular testing example', 10);
    expect(result).toBe('Angular te...');
  });

  it('should not shorten if text is short enough', () => {
    const pipe = new ShortenPipe();
    const result = pipe.transform('Short', 10);
    expect(result).toBe('Short');
  });
});
