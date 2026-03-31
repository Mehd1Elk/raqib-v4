import { PLATFORMS } from '@/lib/constants';

describe('platform definitions', () => {
  test('defines 9 platforms', () => {
    expect(Object.keys(PLATFORMS)).toHaveLength(9);
  });

  test.each(Object.entries(PLATFORMS))('defines %s with a name', (_, platform) => {
    expect(platform.name).toBeTruthy();
  });

  test.each(Object.entries(PLATFORMS))('defines %s with a color', (_, platform) => {
    expect(platform.color).toMatch(/^#/);
  });

  test.each(Object.entries(PLATFORMS))('defines %s with a description', (_, platform) => {
    expect(platform.description).toBeTruthy();
  });
});
