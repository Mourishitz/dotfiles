import { Controller } from "@nestjs/common";
import { CardService } from "./card.service";

@Controller()
export class TemplateController {
  constructor(private readonly cardService: CardService) {}

}