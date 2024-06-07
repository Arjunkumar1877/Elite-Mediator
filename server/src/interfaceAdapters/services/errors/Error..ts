import { ErrorHandling } from "../../../entities/utils/error";


class Errors implements ErrorHandling{
    errorHandler(statusCode: number, message: string): any {
        const error: any = new Error();
        error.statusCode = statusCode;
        error.message = message;
        return error
    }
}