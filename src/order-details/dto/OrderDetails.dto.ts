import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderDetailsDto {
  @IsString()
  @IsOptional()
  order?: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
