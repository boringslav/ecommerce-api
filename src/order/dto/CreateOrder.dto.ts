import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * TODO when authenticated remove customerId field
 */
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsArray()
  orderDetailsList: string[];
}
