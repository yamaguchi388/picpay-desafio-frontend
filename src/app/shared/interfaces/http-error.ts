import { HttpStatusCode } from "@angular/common/http";

export interface IHttpError {
  status: HttpStatusCode;
  errors: string[];
}
