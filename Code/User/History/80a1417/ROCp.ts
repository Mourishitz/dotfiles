import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { LayoutEntity } from '@app/template/layout.entity';
import { CardEntity } from '@app/card/card.entity';
import { CardService } from '@app/card/card.service';
import { CardController } from '@app/card/card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, LayoutEntity])],
  controllers: [CardController],
  providers: [CardService, AuthGuard],
})
export class cardModule {}
