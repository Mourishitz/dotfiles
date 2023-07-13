import * as fs from 'node:fs';
import { PDFDocument, StandardFonts, rgb,  } from 'pdf-lib';
import { TemplateService } from '@app/template/template.service';
import { TemplateInformationsResponse } from '@app/template/types/templateInformationsResponse.interface';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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

  async createCard(createCardDto: any, templateId: number): Promise<CardEntity> {
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
        if (typeof value !== template.front.informations[key].type) {
          errorResponse.errors.front[
            key
          ] = `must be of type ${template.front.informations[key].type}`;
        }
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

  async exportCard(id: number, query: any): Promise<any> {

    const card = await this.findById(id);
    const templateInformations = await this.templateService.getTemplateInformations(card.template);

    const pdfDoc = await PDFDocument.create()

    const frontPage = pdfDoc.addPage();

    //@ts-ignore
    const frontColor = this.hexToRgb(templateInformations.front.fontColor);
    // @ts-ignore
    const frontImageArrayBuffer = await this.prepareImage(templateInformations.front.background);
    // @ts-ignore
    const backImageArrayBuffer = await this.prepareImage(templateInformations.back.background)

    const frontImage = await pdfDoc.embedJpg(frontImageArrayBuffer)
    const backImage = await pdfDoc.embedJpg(backImageArrayBuffer)
  
    frontPage.setFontColor(rgb(frontColor.r, frontColor.g, frontColor.b));
    frontPage.drawImage(frontImage);
    frontPage.drawImage(backImage);
    frontPage.setWidth(948);
    frontPage.setHeight(623);

    for (const key in templateInformations.front.informations) {
      const value = templateInformations.front.informations[key]
      frontPage.drawText(card.data.front[key], {
        x: value.position.x,
        y: value.position.y,
        maxWidth: value.width,
        lineHeight: value.height,
      });
    }

    const backPage = pdfDoc.addPage();

    //@ts-ignore
    const backColor = this.hexToRgb(templateInformations.back.fontColor);

    backPage.setFontColor(rgb(backColor.r, backColor.g, backColor.b));
    backPage.setWidth(948);
    backPage.setHeight(623);

    for (const key in templateInformations.back.informations) {
      const value = templateInformations.back.informations[key]
      backPage.drawText(`${card.data.back[key]}`, {
        x: value.position.x,
        y: value.position.y,
        maxWidth: value.width,
        lineHeight: value.height,
      });
    }

    const pdfBytes = await pdfDoc.save()

    fs.writeFileSync(`${__dirname}/test.pdf`, pdfBytes);

    return pdfDoc.saveAsBase64();
  }

  private hexToRgb(hex: string) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseFloat(`0.${parseInt(result[1], 16)}`),
      g: parseFloat(`0.${parseInt(result[2], 16)}`),
      b: parseFloat(`0.${parseInt(result[3], 16)}`)
    } : null;
  }

  private async prepareImage(base64: string): Promise<ArrayBuffer> {
    return await fetch(base64).then((res) => res.arrayBuffer())
  }
}
