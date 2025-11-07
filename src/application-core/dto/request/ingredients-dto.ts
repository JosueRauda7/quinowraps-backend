import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export default class IngredientsRequestDto {
  @ApiProperty({
    type: [String],
    description: 'Lista de ingredientes disponibles',
    example: ['tomate', 'lechuga', 'pollo'],
  })
  @IsArray({ message: 'Ingredientes deben ser un array de strings' })
  @ArrayNotEmpty({ message: 'La lista de ingredientes no puede estar vacía' })
  @IsString({
    each: true,
    message: 'Cada ingrediente debe ser una cadena de texto',
  })
  ingredients: string[];

  constructor(partial: Partial<IngredientsRequestDto>) {
    Object.assign(this, partial);
  }
}
