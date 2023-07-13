import { LayoutDto } from '@app/template/dto/layout.dto';
import { LayoutEntity } from '@app/template/layout.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from '@app/template/template.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTemplateDto } from '@app/template/dto/createTemplate.dto';
import { UpdateTemplateDto } from '@app/template/dto/updateTemplate.dto';
import { DEFAULT_EXPIRATION_DAY, DEFAULT_EXPIRATION_MONTH } from '@app/config';
import { TemplateListResponseInterface } from '@app/template/types/templateListResponse.interface';
import { TemplateResponseInterface } from '@app/template/types/templateResponse.interface';
import { TemplateInformationsResponse } from '@app/template/types/templateInformationsResponse.interface';

@Injectable()
export class TemplateService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,

    @InjectRepository(LayoutEntity)
    private readonly layoutRepository: Repository<LayoutEntity>,
  ) {}

  async createTemplate(
    createTemplateDto: CreateTemplateDto,
  ): Promise<TemplateEntity> {
    const errorResponse = {
      errors: {},
    };

    const templateByName = await this.templateRepository.findOne({
      where: { name: createTemplateDto.name },
    });

    if (templateByName) {
      errorResponse.errors['name'] = 'Ja existe';
    }

    if (templateByName) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newTemplate = new TemplateEntity();

    const back = await this.createLayout(createTemplateDto.back);
    const front = await this.createLayout(createTemplateDto.front);

    Object.assign(newTemplate, createTemplateDto);

    if (!newTemplate.expires) {
      this.setTemplateExpiration(newTemplate);
    }

    newTemplate.back = back;
    newTemplate.front = front;

    return await this.templateRepository.save(newTemplate);
  }

  async findById(id: number): Promise<TemplateEntity> {
    const template = await this.templateRepository.findOne({
      where: { id: id },
    });

    if (!template) {
      throw new HttpException(
        { errors: { id: 'not found' } },
        HttpStatus.NOT_FOUND,
      );
    }

    return template;
  }

  async findAll(query: any): Promise<TemplateListResponseInterface> {
    const queryBuilder = this.dataSource
      .getRepository(TemplateEntity)
      .createQueryBuilder('templates');

    if (query.name) {
      queryBuilder.andWhere('templates.name LIKE :name', {
        name: `%${query.name}`,
      });
    }

    queryBuilder.orderBy('templates.createdAt', 'DESC');
    const templateCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    return {
      templateCount: templateCount,
      templates: await queryBuilder.getMany(),
    };
  }

  async getTemplateInformations(template: TemplateEntity): Promise<TemplateInformationsResponse> {
    const queryBuilder = this.dataSource
      .getRepository(TemplateEntity)
      .createQueryBuilder('templates')
      .leftJoinAndSelect('templates.back', 'backLayout')
      .leftJoinAndSelect('templates.front', 'frontLayout')
      .andWhere('templates.id = :id', {
        id: `%${template.id}`,
      })


    console.log(await queryBuilder.getOne())

    return {
      id: template.id,
      name: template.name,
      back: {informations: template.back.informations || {}}, 
      front: {informations: template.front.informations || {}}
    }
  }

  async updateTemplate(
    templateId: number,
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<TemplateEntity> {
    const template = await this.findById(templateId);
    Object.assign(template, updateTemplateDto);
    template.updatedAt = new Date();
    return await this.templateRepository.save(template);
  }

  async deleteTemplate(id: number): Promise<void> {
    const template = await this.findById(id);
    await this.templateRepository.remove(template);
  }

  private async createLayout(layout: LayoutDto) {
    const newLayout = new LayoutEntity();
    Object.assign(newLayout, layout);
    return await this.layoutRepository.save(newLayout);
  }

  private setTemplateExpiration(template: TemplateEntity): void {
    const date = new Date();

    date.setFullYear(date.getFullYear() + 1);
    date.setMonth(DEFAULT_EXPIRATION_MONTH - 1);
    date.setDate(DEFAULT_EXPIRATION_DAY);

    template.expires = date;
  }

  buildTemplateResponse(template: TemplateEntity): TemplateResponseInterface {
    return {
      template: template,
    };
  }
}
