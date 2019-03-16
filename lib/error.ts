export const parseGraphQlValidationError = (
  error: any
): { [key: string]: string } | null => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const errors: { [key: string]: string } = {};
    const validationErrors =
      error.graphQLErrors[0].extensions.exception.validationErrors;
    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      validationErrors.forEach((validationError: any) => {
        Object.values(validationError.constraints).forEach((message: any) => {
          errors[validationError.property] = message;
        });
      });
      return errors;
    }
  }
  return null;
};

export const parseGraphQlError = (errors: any): { [key: string]: string } => {
  var message = '',
    stack = '';
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i],
      exception = error.extensions.exception;
    message += `(${i + 1}) ${error.message}\n`;
    stack += `(${i + 1}) ${exception.stacktrace.join('\n')}\n`;
  }
  return { message, stack };
};
