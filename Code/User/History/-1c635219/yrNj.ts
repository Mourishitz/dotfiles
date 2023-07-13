import { Body, Catch, Controller, NotFoundException, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CardService } from '@app/card/card.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { TemplateService } from '@app/template/template.service';

@Controller()
export class CardController {
  constructor(
    private readonly cardService: CardService,
    ) {}
  
  @Post('card/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async createCard(
    @Param('id') templateId: number,
    @Body('card') createCardDto: any,
  ){
    return await this.cardService.createCard(createCardDto, templateId);
  }
}

