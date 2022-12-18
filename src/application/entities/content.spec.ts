import { Content } from './content';

// describe -> categoriza os tests
describe('Notification', () => {
  // it() = teste()
  it('it should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma notificação1');

    expect(content).toBeTruthy();
  });

  it('it should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('it should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('aaa'.repeat(200))).toThrow();
  });
});
