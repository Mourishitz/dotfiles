import {
    IsNotEmpty,
    IsDate,
    IsOptional,
    IsHexColor,
    IsBase64,
    IsString,
    IsObject,
    IsDefined
  } from 'class-validator';
  
  export class TemplateDataDto {
  
    @IsNotEmpty()
    @IsDefined()
    @IsObject()
    readonly informations: object;
  
    @IsNotEmpty()
    @IsDefined()
    @IsBase64()
    readonly layout: string;
  
    @IsNotEmpty()
    @IsDefined()
    @IsHexColor()
    readonly fontColor: string;
  }
  