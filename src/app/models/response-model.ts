import { ResponseHeaderModel } from "./response-header-model";

export class ResponseModel<T>{
  header!: ResponseHeaderModel;
  data!: T;
}
