import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationRpository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count Recipient Notifications', () => {
  it('shold be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    const notification1 = new Notification({
      recipientId: 'example-recipient-id-1',
      category: 'social',
      content: new Content('test test test test test'),
    });

    const notification2 = new Notification({
      recipientId: 'example-recipient-id-1',
      category: 'social',
      content: new Content('test test test test test'),
    });

    const notification3 = new Notification({
      recipientId: 'example-recipient-id-2',
      category: 'social',
      content: new Content('test test test test test'),
    });

    await notificationRepository.create(notification1);
    await notificationRepository.create(notification2);
    await notificationRepository.create(notification3);

    const { countNotifications } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(countNotifications).toEqual(2);
  });
});
