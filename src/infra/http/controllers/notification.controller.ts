import { Controller, Body, Get, Post, Patch, Param } from '@nestjs/common';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { SendNotification } from '../../../application/use-cases/send-notification';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notification')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotification: CountRecipientNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Post('send')
  async send(@Body() data: CreateNotificationDTO) {
    const { category, content, recipientId } = data;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Get(':recipientId/list')
  async getAllFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    const notificationsToHTTP = notifications.map((notification) => {
      return NotificationViewModel.toHTTP(notification);
    });

    return notificationsToHTTP;
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { countNotifications } =
      await this.countRecipientNotification.execute({
        recipientId,
      });

    return {
      countNotifications,
    };
  }
}
