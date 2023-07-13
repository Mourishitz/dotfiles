import { Controller, Get, UseGuards } from '@nestjs/common';
import { CardService } from '@app/card/card.service';
import { AuthGuard } from '@app/user/guards/auth.guard';

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}
}
