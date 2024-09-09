import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ unique: [true] })
  @IsString()
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
