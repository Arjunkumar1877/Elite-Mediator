export interface ErrorHandling {
    errorHandler(statusCode: number, message: string): any;
}