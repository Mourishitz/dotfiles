import { TemplateType } from '@app/template/types/template.type';

export interface TemplateListResponseInterface {
    // Omit<TemplateType, '|'>
  informations: {
    back: '',
    front: '',
  }
}
