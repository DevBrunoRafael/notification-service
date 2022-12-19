import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationRpository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('shold be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: new Content('test test test test test'),
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a nom existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-id-test',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
