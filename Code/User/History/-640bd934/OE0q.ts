import {
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsHexColor,
  IsBase64,
  IsString,
  IsObject,
  ValidateNested
} from 'class-validator';
import { TemplateDataDto } from '@app/template/dto/templateData.dto';
import { Type } from 'class-transformer';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ValidateNested()
  @Type(() => TemplateDataDto)
  @IsNotEmpty()
  readonly back: object;

  @IsOptional()
  @IsDate()
  readonly expires: string;
}
