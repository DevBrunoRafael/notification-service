import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  countNotifications: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      countNotifications: count,
    };
  }
}
