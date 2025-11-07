import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import IngredientsRequestDto from 'src/application-core/dto/request/ingredients-dto';
import RecipesResponseDto from 'src/application-core/dto/response/recipes-dto';
import { RecipesResponse } from 'src/application-core/swagger/recipes-response-schema';
import { OpenAiService } from 'src/infraestructure/services/open-ai/open-ai.service';

@Controller('recipes')
export class RecipesController {
  constructor(
    @Inject(OpenAiService)
    private readonly openAiService: OpenAiService,
  ) { }

  @Post('suggestion')
  @ApiResponse({
    status: 201,
    description: 'Sugerencia de receta generada exitosamente',
    type: RecipesResponse,
  })
  async getRecipeSuggestion(
    @Body() ingredients: IngredientsRequestDto,
  ): Promise<RecipesResponseDto> {
    const recipe = await this.openAiService.getRecipeSuggestion(
      ingredients.ingredients,
    );
    return plainToInstance(RecipesResponseDto, {
      recipeName: recipe.split('*')[1],
      recipeHtml: recipe.replace(/\*/g, ''),
    });
  }
}
