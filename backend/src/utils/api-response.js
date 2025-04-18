const successResponse = (statusCode, message, data) => ({
  success: true,
  statusCode,
  message,
  data,
});

const errorResponse = (
  statusCode = 500,
  message = "Internal Server Error"
) => ({
  success: false,
  statusCode,
  message,
});

export { successResponse, errorResponse };
