import {
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsHexColor,
  IsBase64,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { TemplateDataDto } from '@app/template/dto/templateData.dto';
import { Type } from 'class-transformer';
import { LayoutEntity } from '../layout.entity';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // @ValidateNested()
  // @Type(()=> TemplateDataDto)
  // readonly back: TemplateDataDto;

  @IsOptional()
  @IsDate()
  readonly expires: string;
}
