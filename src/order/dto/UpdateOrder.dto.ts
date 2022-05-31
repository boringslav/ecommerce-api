import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsArray()
  orderDetailsList?: string[];
}
