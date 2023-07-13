import { TemplateType } from '@app/template/types/template.type';
import { LayoutType } from '@app/template/types/layout.type';

export interface TemplateListResponseInterface {
    // Omit<TemplateType, '|'>
  informations: {
    back: LayoutType,
    front: '',
  }
}
