import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderDatailsDTO {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
