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
import { TemplateDataDto } from './templateData.dto';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ValidateNested()
  @IsNotEmpty()
  readonly back: TemplateDataDto

  @IsOptional()
  @IsDate()
  readonly expires: string;
}
