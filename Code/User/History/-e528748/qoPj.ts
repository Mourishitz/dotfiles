import {
  IsObject,
  IsHexColor,
  IsNotEmpty,
} from 'class-validator-multi-lang';

export class LayoutDto {
  @IsObject()
  @IsNotEmpty()
  readonly informations: object;

  // @IsBase64()
  @IsNotEmpty()
  readonly background: string;

  @IsHexColor()
  @IsNotEmpty()
  readonly fontColor: string;
}
