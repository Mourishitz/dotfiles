import { Controller } from "@nestjs/common";
import { CardService } from "@app/card/card.service";

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

}