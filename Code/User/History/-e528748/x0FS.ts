import { IsObject, IsHexColor, IsNotEmpty } from 'class-validator-multi-lang';
import { InformationsType } from '@app/template/types/informations.type';

export class LayoutDto {

  @IsNotEmpty()
  readonly informations: Record<string, InformationsType>;

  // @IsBase64()
  @IsNotEmpty()
  readonly background: string;

  @IsHexColor()
  @IsNotEmpty()
  readonly fontColor: string;
}
