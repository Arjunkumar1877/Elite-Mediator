import { ErrorHandling } from "./IError";


export class Errors implements ErrorHandling{
  async errorHandler(statusCode: number, message: string) {
            const error: any = new Error();
            error.statusCode = statusCode;
            error.message = message;
            return error
   }
}