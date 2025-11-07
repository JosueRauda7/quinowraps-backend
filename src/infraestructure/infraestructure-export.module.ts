import { Module } from '@nestjs/common';
import { OpenAiService } from './services/open-ai/open-ai.service';

@Module({
  imports: [],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class InfraestructureExportModule {}
