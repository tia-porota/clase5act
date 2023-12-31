const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorResponse = {
    error: {
      message: err.message || "Internal Server Error",
      code: err.status || "internal_error",
    },
  };
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
