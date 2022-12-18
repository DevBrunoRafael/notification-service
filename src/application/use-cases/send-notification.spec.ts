import { InMemoryNotificationRpository } from '../../../test/repositories/in-memory-notification-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('shold be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRpository();
    const sendNotification = new SendNotification(notificationRepository);
    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      category: 'example-category',
      content: 'example-content',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
