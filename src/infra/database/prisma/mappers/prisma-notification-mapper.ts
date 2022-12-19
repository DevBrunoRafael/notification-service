import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      recipientId: notification.recipientId,
      cancelAt: notification.cancelAt,
    };
  }

  static toDomain(prismaNotification: PrismaNotification): Notification {
    return new Notification(
      {
        category: prismaNotification.category,
        content: new Content(prismaNotification.content),
        readAt: prismaNotification.readAt,
        createdAt: prismaNotification.createdAt,
        recipientId: prismaNotification.recipientId,
      },
      prismaNotification.id,
    );
  }
}
