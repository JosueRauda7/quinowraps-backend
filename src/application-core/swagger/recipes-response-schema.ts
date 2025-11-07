import { ApiProperty } from '@nestjs/swagger';
import { GlobalResponseSchema } from './global-response-schemas';
import RecipesResponseDto from '../dto/response/recipes-dto';

export class RecipesArrayResponse extends GlobalResponseSchema<
  RecipesResponseDto[]
> {
  @ApiProperty({
    type: [RecipesResponseDto],
  })
  public data: RecipesResponseDto[];
}

export class RecipesResponse extends GlobalResponseSchema<RecipesResponseDto> {
  @ApiProperty({
    type: RecipesResponseDto,
  })
  public data: RecipesResponseDto;
}
