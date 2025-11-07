import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class RecipesResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Nombre de la receta sugerida',
  })
  recipeName: string;
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Descripción de la receta en formato HTML',
  })
  recipeHtml: string;

  constructor(partial: Partial<RecipesResponseDto>) {
    Object.assign(this, partial);
  }
}
