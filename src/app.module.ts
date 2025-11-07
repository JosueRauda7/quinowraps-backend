import { Module } from '@nestjs/common';
import { InfraestructureExportModule } from './infraestructure/infraestructure-export.module';
import { ApplicationCoreExportModule } from './application-core/application-core-export.module';
import { HealthController } from './presentation/controller/health/health.controller';
import { RecipesController } from './presentation/controller/recipes/recipes.controller';

@Module({
  imports: [ApplicationCoreExportModule, InfraestructureExportModule],
  controllers: [HealthController, RecipesController],
  providers: [],
})
export class AppModule {}
