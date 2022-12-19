import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationRpository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

describe('Cancel Notification', () => {
  it('shold be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: new Content('test test test test test'),
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a nom existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-id-test',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
