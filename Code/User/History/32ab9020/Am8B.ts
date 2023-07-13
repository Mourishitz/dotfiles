import { TemplateType } from '@app/template/types/template.type';
import { LayoutType } from '@app/template/types/layout.type';

export interface TemplateInformationsResponse {
    id: number
    name: string,
    back: Pick<LayoutType, 'informations'>,
    front: Pick<LayoutType, 'informations'>,
}
