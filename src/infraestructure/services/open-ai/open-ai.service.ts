import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  constructor() {}

  async getRecipeSuggestion(ingredients: string[]): Promise<string> {
    const maxTokens = Number(process.env.MAX_TOKENS) ?? 500;
    const openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const prompt = `Sugiere una receta que pueda hacerse con los siguientes ingredientes: ${ingredients.join(
      ', ',
    )}, tortilla de tacos. Proporciona solo el nombre de la receta y su descripción. Responde en ${
      maxTokens
    } tokens o menos. Añade instrucciones breves de preparación. Distingue el nombre de la receta encerrandolo entre asteriscos y en una etiqueta strong con clase "recipeName". Que sea html la respuesta. La respuesta que sea lista para presentar en un div html (no agregues saltos de línea)`;

    const response = await openAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
    });

    return response.choices[0].message.content.trim();
  }
}
