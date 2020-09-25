import {
  ValidationError,
  NotFoundError,
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} from 'objection'

function errorHandler(err) {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        return {
          message: err.message,
          type: err.type,
          data: err.data,
        }
        break
      case 'RelationExpression':
        return {
          message: err.message,
          type: 'RelationExpression',
          data: {},
        }
        break
      case 'UnallowedRelation':
        return {
          message: err.message,
          type: err.type,
          data: {},
        }
        break
      case 'InvalidGraph':
        return {
          message: err.message,
          type: err.type,
          data: {},
        }
        break
      default:
        return {
          message: err.message,
          type: 'UnknownValidationError',
          data: {},
        }
        break
    }
  } else if (err instanceof NotFoundError) {
    return {
      message: err.message,
      type: 'NotFound',
      data: {},
    }
  } else if (err instanceof UniqueViolationError) {
    return {
      message: err.message,
      type: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint,
      },
    }
  } else if (err instanceof NotNullViolationError) {
    return {
      message: err.message,
      type: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table,
      },
    }
  } else if (err instanceof ForeignKeyViolationError) {
    return {
      message: err.message,
      type: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    }
  } else if (err instanceof CheckViolationError) {
    return {
      message: err.message,
      type: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    }
  } else if (err instanceof DataError) {
    return {
      message: err.message,
      type: 'InvalidData',
      data: {},
    }
  } else if (err instanceof DBError) {
    return {
      message: err.message,
      type: 'UnknownDatabaseError',
      data: {},
    }
  } else {
    return {
      message: err.message,
      type: 'UnknownError',
      data: {},
    }
  }
}

export default errorHandler
