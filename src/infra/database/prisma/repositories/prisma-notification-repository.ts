import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const listPrismaNotifications =
      await this.prismaService.notification.findMany({
        where: {
          recipientId: recipientId,
        },
      });

    return listPrismaNotifications.map((prismaNotification) => {
      return PrismaNotificationMapper.toDomain(prismaNotification);
    });
  }

  async create(notification: Notification): Promise<void> {
    const notificationPersistence =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: notificationPersistence,
    });
  }

  async save(notification: Notification) {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: prismaNotification.id,
      },
      data: prismaNotification,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prismaService.notification.count({
      where: {
        recipientId: recipientId,
      },
    });
  }
}
