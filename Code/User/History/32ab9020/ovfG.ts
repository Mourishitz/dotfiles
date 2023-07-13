import { LayoutType } from '@app/template/types/layout.type';

export interface TemplateInformationsResponse {
  id: number;
  name: string;
  back: LayoutType;
  front: LayoutType;
}
