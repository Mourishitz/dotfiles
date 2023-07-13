import {
    IsNotEmpty,
    IsDate,
    IsOptional,
    IsHexColor,
    IsBase64,
    IsString,
    IsObject
  } from 'class-validator';
  
  export class CreateTemplateDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsObject()
    readonly informations: object;
  
    @IsNotEmpty()
    @IsBase64()
    readonly layout: string;
  
    @IsOptional()
    @IsDate()
    readonly expires: string;
  
    @IsNotEmpty()
    @IsHexColor()
    readonly fontColor: string;
  }
  