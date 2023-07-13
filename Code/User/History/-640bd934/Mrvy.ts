import {
  IsDate,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator-multi-lang';

import { Type } from 'class-transformer';
import { LayoutDto } from '@app/template/dto/layout.dto';

export class CreateTemplateDto {
  @IsNotEmpty()
  @Type(() => LayoutDto)
  @ValidateNested()
  readonly back: LayoutDto;

  @IsNotEmpty()
  @Type(() => LayoutDto)
  @ValidateNested()
  readonly front: LayoutDto;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsDate()
  readonly expires: Date;
}
