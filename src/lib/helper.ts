export function errorHandler(message: string, status: number = 500) {
  const error: any = new Error();
  error.message = message;
  error.status = status;
  throw error;
}

export function responseHandler(res: any, data: any, status: number = 200) {
  return res.status(status).json(data);
}
