import { TemplateType } from '@app/template/types/template.type';
import { LayoutType } from '@app/template/types/layout.type';

export interface TemplateInformationsResponse {
  informations: {
    back: Pick<LayoutType, 'informations'>,
    front: Pick<LayoutType, 'informations'>,
  }
}
