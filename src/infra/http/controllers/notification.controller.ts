import { Controller, Body, Get, Post } from '@nestjs/common';
import { SendNotification } from '../../../application/use-cases/send-notification';
import { CreateNotificationDTO } from '../dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private sendNotification: SendNotification) {}

  @Post('send')
  async create(@Body() data: CreateNotificationDTO) {
    const { category, content, recipientId } = data;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return notification;
  }
}
