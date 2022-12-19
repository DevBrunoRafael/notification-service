import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationDTO {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 250)
  content: string;

  @IsNotEmpty()
  category: string;
}
