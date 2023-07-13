import {
  HttpStatus,
  Injectable,
  HttpException,
  PipeTransform,
  ValidationError,
  ArgumentMetadata,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator-multi-lang';

@Injectable()
export class BackendValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);

    console.log(errors)

    if (errors.length === 0) {
      return value;
    }

    throw new HttpException(
      { errors: this.formatErrors(errors) },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  formatErrors(errors: ValidationError[]) {
    return errors.reduce((acc, error) => {
      const nestedErrors = error.children;

      if (nestedErrors.length > 0) {
        acc[error.property] = this.validateNestedErrors(nestedErrors);
      } else {
        acc[error.property] = Object.values(error.constraints);
      }
      return acc;
    }, {});
  }

  validateNestedErrors(errors: ValidationError[]) {
    const mappedErrors = {};
    errors.map((error) => {
      mappedErrors[error.property] = Object.values(error.constraints);
    });
    return mappedErrors;
  }
}
