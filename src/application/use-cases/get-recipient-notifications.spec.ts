import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationRpository } from '@test/repositories/in-memory-notification-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it('shold be able to get a notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const countRecipientNotification = new GetRecipientNotifications(
      notificationRepository,
    );

    const notification1 = new Notification({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: new Content('test test test test test'),
    });

    const notification2 = new Notification({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: new Content('test test test test test'),
    });

    await notificationRepository.create(notification1);
    await notificationRepository.create(notification2);

    const { notifications } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ]),
    );
  });
});
