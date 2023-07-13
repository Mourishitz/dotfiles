import { IsObject, IsHexColor, IsNotEmpty, ValidateNested } from 'class-validator-multi-lang';
import { InformationsType } from '@app/template/types/informations.type';
import { Type } from 'class-transformer';

export class LayoutDto {
  @IsObject()
  @IsNotEmpty()
  @Type(() => Informations)
  readonly informations: Record<string, Informations>;

  // @IsBase64()
  @IsNotEmpty()
  readonly background: string;

  @IsHexColor()
  @IsNotEmpty()
  readonly fontColor: string;
}

class Informations {
  @ValidateNested()
  @IsNotEmpty()
  readonly position: string
}