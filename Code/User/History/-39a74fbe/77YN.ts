import * as fs from 'node:fs';
import { PDFDocument, PDFPage, rgb } from 'pdf-lib';
import { TemplateService } from '@app/template/template.service';
import { TemplateInformationsResponse } from '@app/template/types/templateInformationsResponse.interface';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CardEntity } from './card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface CardData {
  back: object;
  front: object;
}

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,

    private readonly templateService: TemplateService,
  ) {}


  async createCard(
    createCardDto: any,
    templateId: number,
  ): Promise<CardEntity> {
    const templateEntity = await this.templateService.findById(templateId);
    const template = await this.templateService.getTemplateInformations(
      templateEntity,
    );

    const cardData = this.validateCardInformations(template, createCardDto);

    if (
      Object.keys(cardData.back).length == 0 &&
      Object.keys(cardData.front).length == 0
    ) {
      throw new UnprocessableEntityException({
        errors: { back: 'não pode ser vazio', front: 'não pode ser vazio' },
      });
    }

    const cardEntity = new CardEntity();

    cardEntity.data = cardData;
    cardEntity.template = templateEntity;

    return this.cardRepository.save(cardEntity);
  }

  private validateCardInformations(
    template: TemplateInformationsResponse,
    card: any,
  ): CardData {
    const data: CardData = {
      front: {},
      back: {},
    };

    const errorResponse = {
      errors: {
        back: {},
        front: {},
      },
    };

    for (const key in card.front) {
      if (template.front.informations.hasOwnProperty(key)) {
        const value = card.front[key];
        // if (typeof value !== template.front.informations[key].type) {
        //   errorResponse.errors.front[
        //     key
        //   ] = `must be of type ${template.front.informations[key].type}`;
        // }
        data.front[key] = value;
      }
    }

    for (const key in card.back) {
      if (template.back.informations.hasOwnProperty(key)) {
        const value = card.back[key];
        if (typeof value !== template.back.informations[key].type) {
          errorResponse.errors.back[
            key
          ] = `must be of type ${template.back.informations[key].type}`;
        }
        data.back[key] = value;
      }
    }

    if (
      Object.keys(errorResponse.errors.back).length > 0 ||
      Object.keys(errorResponse.errors.front).length > 0
    ) {
      throw new UnprocessableEntityException(errorResponse);
    }

    return data;
  }

  async findById(id: number): Promise<CardEntity> {
    const template = await this.cardRepository.findOne({
      where: { id: id },
    });

    if (!template) {
      throw new NotFoundException({ errors: { id: 'not found' } });
    }

    return template;
  }

  async exportCard(id: number): Promise<any> {
    const card = await this.findById(id);
    const templateInformations =
      await this.templateService.getTemplateInformations(card.template);

    const pdfDoc = await PDFDocument.create();

    
    const frontColor = this.hexToRgb(templateInformations.front.fontColor);
    const backColor = this.hexToRgb(templateInformations.back.fontColor);
    
    const frontImageArrayBuffer = await this.prepareImage(
      templateInformations.front.background,
      );
    const backImageArrayBuffer = await this.prepareImage(
      templateInformations.back.background,
      );
      
    const frontImage = await pdfDoc.embedJpg(frontImageArrayBuffer);
    const backImage = await pdfDoc.embedJpg(backImageArrayBuffer);

    const frontPage = pdfDoc.addPage();
        
    frontPage.setFontColor(rgb(frontColor.r, frontColor.g, frontColor.b));
    frontPage.drawImage(frontImage);
    frontPage.setWidth(948);
    frontPage.setHeight(623);

    this.writeToPage(pdfDoc, frontPage, templateInformations.front.informations, card.data.front)
    
    const backPage = pdfDoc.addPage();
    
    backPage.setFontColor(rgb(backColor.r, backColor.g, backColor.b));
    backPage.drawImage(backImage);
    backPage.setWidth(948);
    backPage.setHeight(623);

    this.writeToPage(pdfDoc, backPage, templateInformations.back.informations, card.data.back)

    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync(`${__dirname}/pdfs/test.pdf`, pdfBytes);

    return pdfDoc.saveAsBase64();
  }

  private async writeToPage(pdfDoc: PDFDocument, page: PDFPage, template: object, card: object){
    for (const key in template) {
      const value = template[key];

      switch (value.type) {
        case 'string':
            page.drawText(card[key], {
              x: value.position.x,
              y: value.position.y,
              maxWidth: value.width,
              lineHeight: value.height,
            });
          break;

        case 'image':
            const image = await this.prepareImage(card[key]);
            pdfDoc.embedJpg(image);
            page.drawImage(card[key], {
              x: value.position.x,
              y: value.position.y,
              width: value.width,
              height: value.height,
            });
          break;

        default:
          break;
      }
    }
  };

  private hexToRgb(hex: string) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseFloat(`0.${parseInt(result[1], 16)}`),
          g: parseFloat(`0.${parseInt(result[2], 16)}`),
          b: parseFloat(`0.${parseInt(result[3], 16)}`),
        }
      : null;
  }

  private async prepareImage(base64: string): Promise<ArrayBuffer> {
    return await fetch(base64).then((res) => res.arrayBuffer());
  }
}