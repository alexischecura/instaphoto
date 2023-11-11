enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

enum ErrorCode {
  GENERIC_ERROR = 'ERR_GENERIC',
  VALIDATION_ERROR = 'ERR_VALIDATION',
  AUTHENTICATION_ERROR = 'ERR_AUTHENTICATION',
  AUTHORIZATION_ERROR = 'ERR_AUTHORIZATION',
  INTERNAL_SERVER_ERROR = 'ERR_INTERNAL_SERVER',
  NOT_FOUND_ERROR = 'ERR_NOT_FOUND',
  RATE_LIMIT_ERROR = 'ERR_RATE_LIMIT',
  DATABASE_ERROR = 'ERR_DATABASE',
  CONFLICT_ERROR = 'ERR_CONFLICT',
}

export abstract class AppError extends Error {
  public readonly status: string;
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly description: string;
  public readonly fields: object[] | undefined;

  constructor(
    public readonly message: string,
    fields: object[] | undefined = undefined,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    code = ErrorCode.GENERIC_ERROR,
    description = 'An error occurred.'
  ) {
    super(message);
    this.fields = fields;
    this.statusCode = statusCode;
    this.code = code;
    this.description = description;
    this.status = statusCode >= 400 && statusCode <= 499 ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, fields: object[] | undefined = undefined) {
    const statusCode = HttpStatus.BAD_REQUEST;
    const code = ErrorCode.VALIDATION_ERROR;
    const description = 'Validation error.';

    super(message, fields, statusCode, code, description);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, errors: object[] | undefined = undefined) {
    const statusCode = HttpStatus.UNAUTHORIZED;
    const code = ErrorCode.AUTHENTICATION_ERROR;
    const description = 'Authentication failed.';

    super(message, errors, statusCode, code, description);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, errors: object[] | undefined = undefined) {
    const statusCode = HttpStatus.FORBIDDEN;
    const code = ErrorCode.AUTHORIZATION_ERROR;
    const description = 'Authorization failed.';

    super(message, errors, statusCode, code, description);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, errors: object[] | undefined = undefined) {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const code = ErrorCode.INTERNAL_SERVER_ERROR;
    const description = 'Internal server error.';

    super(message, errors, statusCode, code, description);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, errors: object[] | undefined = undefined) {
    const statusCode = HttpStatus.NOT_FOUND;
    const code = ErrorCode.NOT_FOUND_ERROR;
    const description = 'Resource not found.';

    super(message, errors, statusCode, code, description);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string, errors: object[] | undefined = undefined) {
    const statusCode = HttpStatus.TOO_MANY_REQUESTS;
    const code = ErrorCode.RATE_LIMIT_ERROR;
    const description = 'Rate limit exceeded.';

    super(message, errors, statusCode, code, description);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, errors: object[] | undefined = undefined) {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const code = ErrorCode.DATABASE_ERROR;
    const description = 'Database error.';

    super(message, errors, statusCode, code, description);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, errors: object[] | undefined = undefined) {
    const statusCode = HttpStatus.CONFLICT;
    const code = ErrorCode.CONFLICT_ERROR;
    const description = 'Conflict Error.';

    super(message, errors, statusCode, code, description);
  }
}
