import { Content } from './content';
import { Notification } from './notification';

// describe -> categoriza os tests
describe('Notification', () => {
  // it() = teste()
  it('it should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'example-recipient-id',
      category: 'example-category',
      content: new Content('Conteúdo da notificação!'),
    });

    expect(notification).toBeTruthy();
  });
});
