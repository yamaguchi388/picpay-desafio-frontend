import { HttpStatusCode } from "@angular/common/http";
import { IHttpError } from "../../interfaces";

export class HttpErrorFactory {
  static build401HttpError(messages: string[]): IHttpError {
    return {
      status: HttpStatusCode.Unauthorized,
      errors: [...messages],
    };
  }
}
