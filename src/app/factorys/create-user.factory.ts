import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IUser } from "../interfaces/IUser";

@Injectable()
export class CreateUserFactory {
  create() {
    return {
      email: new FormControl(""),
      password: new FormControl(""),
      passwordConfirmation: new FormControl(""),
      nome: new FormControl(""),
    };
  }

  signin() {
    return {
      email: new FormControl(""),
      password: new FormControl(""),
    };
  }

  profile(user: IUser) {
    return {
      id: new FormControl(user.id),
      nome: new FormControl(user.nome),
      email: new FormControl(user.email),
      password: new FormControl(),
      passwordConfirmation: new FormControl(),
    };
  }
}
