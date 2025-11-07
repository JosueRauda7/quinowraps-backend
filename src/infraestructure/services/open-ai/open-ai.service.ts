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
    )}, tortilla de taco (Dí Quinowraps en la receta, no tortilla de maíz o algo por el estilo). Proporciona solo el nombre de la receta y su descripción. Responde en ${
      maxTokens
    } tokens o menos. Añade instrucciones breves de preparación. Distingue el nombre de la receta encerrandolo entre asteriscos. La respuesta debe estar en formato HTML (sin \`\`\`html ni \\n, ocupar solamente h2, ul, li, p y strong) para titulos de instrucciones e ingredientes también envolverlos en strong`;

    const response = await openAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens + 100,
    });

    return response.choices[0].message.content.trim();
  }

  async getNameFromSpanishToEnglish(spanishName: string): Promise<string> {
    const openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const prompt = `Traduce el siguiente nombre de receta de español a inglés: ${spanishName}. Proporciona solo la traducción del nombre.`;

    const response = await openAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 60,
    });

    return response.choices[0].message.content.trim();
  }
}
