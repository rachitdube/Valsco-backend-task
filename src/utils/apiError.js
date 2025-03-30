class ApiError extends Error {
  constructor(
    statusCode,
    message = "internal server error",
    error = [],
    stack = ""
  ) {
    super(message); //super(message) this call invokes the parent constructor i.e (Error), basically used for initializing error object
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
