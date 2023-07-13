import { Body, Controller, Param, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CardService } from '@app/card/card.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { CardEntity } from './card.entity';

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('card')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async createCard(
    @Body('template') templateId: number,
    @Body('card') createCardDto: any,
  ): Promise<CardEntity> {
    return await this.cardService.createCard(createCardDto, templateId);
  }

  @Get('card/:id')
  @UseGuards(AuthGuard)
  async exportCard(
    @Param('id') id: number,
    @Query() query: any
  ): Promise<any> {
    return await this.cardService.exportCard(id, query);
  }
}
