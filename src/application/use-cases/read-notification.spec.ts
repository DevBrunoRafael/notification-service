import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationRpository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('shold be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: new Content('test test test test test'),
    });

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a nom existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const cancelNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-id-test',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
