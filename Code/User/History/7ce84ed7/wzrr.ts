import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { LayoutEntity } from '@app/template/layout.entity';
import { TemplateEntity } from '@app/template/template.entity';
import { TemplateService } from '@app/template/template.service';
import { TemplateController } from '@app/template/template.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity, LayoutEntity])],
  controllers: [TemplateController],
  providers: [TemplateService, AuthGuard],
})
export class TemplateModule {}
