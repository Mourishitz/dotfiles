import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
  UsePipes,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { TemplateService } from '@app/template/template.service';
import { CreateTemplateDto } from '@app/template/dto/createTemplate.dto';
import { UpdateTemplateDto } from '@app/template/dto/updateTemplate.dto';
import { TemplateListResponseInterface } from '@app/template/types/templateListResponse.interface';
import { TemplateResponseInterface } from '@app/template/types/templateResponse.interface';
import { TemplateInformationsResponse } from './types/templateInformationsResponse.interface';
import { CardEntity } from '@app/card/card.entity';

@Controller()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post('template')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async createTemplate(
    @Body('template') createTemplateDto: CreateTemplateDto,
  ): Promise<TemplateResponseInterface> {
    const template = await this.templateService.createTemplate(
      createTemplateDto,
    );
    return this.templateService.buildTemplateResponse(template);
  }

  @Get('templates')
  @UseGuards(AuthGuard)
  async findAll(@Query() query: any): Promise<TemplateListResponseInterface> {
    return this.templateService.findAll(query);
  }

  @Get('template/:id')
  @UseGuards(AuthGuard)
  async findTemplateById(
    @Param('id') id: number,
  ): Promise<TemplateResponseInterface> {
    const template = await this.templateService.findById(id);

    return this.templateService.buildTemplateResponse(template);
  }

  @Get('template/informations/:id')
  @UseGuards(AuthGuard)
  async getTemplateInformations(@Param('id') id: number): Promise<TemplateInformationsResponse> {
    const template = await this.templateService.findById(id);

    return this.templateService.getTemplateInformations(template);
  }

  @Get('template/cards')
  @UseGuards(AuthGuard)
  async getTemplateCards(@Param('id') id: number): Promise<CardEntity[]> {
    const template = await this.templateService.findById(id);

    return this.templateService.getCardsFromTemplate(template);
  }


  @Put('template/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateTemplate(
    @Param('id') id: number,
    @Body('template') updateTemplateDto: UpdateTemplateDto,
  ): Promise<TemplateResponseInterface> {
    const template = await this.templateService.updateTemplate(
      id,
      updateTemplateDto,
    );
    return this.templateService.buildTemplateResponse(template);
  }

  @Delete('template/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async deleteTemplate(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<Response> {
    await this.templateService.deleteTemplate(id);
    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
