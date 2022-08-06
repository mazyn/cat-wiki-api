import { HttpException, HttpStatus } from '@nestjs/common';

export const handleAxiosError = (e: any) => {
  if (e.response) throw new HttpException(e.response.data, e.response.status);
  throw new HttpException(
    e.request ?? e.message,
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
