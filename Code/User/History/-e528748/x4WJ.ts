import { IsObject, IsHexColor, IsNotEmpty } from 'class-validator-multi-lang';

export class LayoutDto {
  @IsObject()
  @IsNotEmpty()
  readonly informations: Record<string, InformationsType>;

  // @IsBase64()
  @IsNotEmpty()
  readonly background: string;

  @IsHexColor()
  @IsNotEmpty()
  readonly fontColor: string;
}
