import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CardService } from '@app/card/card.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { TemplateService } from '@app/template/template.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class CardController {
  constructor(
    private readonly cardService: CardService,
    
    private readonly templateService: TemplateService
    ) {}
  
  @Post('card')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async createCard(
    @Body('template') templateId: number,
    @Body('card') createCardDto: any,
  ){
    try{
      this.templateService.findById(templateId);
      return await this.cardService.createCard(createCardDto);
    } catch (exception: HttpException | any) {
      return new HttpException(
        { errors: { id: 'not found' } },
        HttpStatus.NOT_FOUND,
      )
    }
  }
}

