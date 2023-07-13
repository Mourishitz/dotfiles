import { TemplateType } from '@app/template/types/template.type';
import { LayoutType } from '@app/template/types/layout.type';

export interface TemplateInformationsResponse {
    back: Pick<LayoutType, 'informations'>,
    front: Pick<LayoutType, 'informations'>,
}
