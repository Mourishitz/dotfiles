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

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ValidateNested({context: TemplateDataDto})
  @IsNotEmpty()
  readonly back: TemplateDataDto

  @IsOptional()
  @IsDate()
  readonly expires: string;
}
