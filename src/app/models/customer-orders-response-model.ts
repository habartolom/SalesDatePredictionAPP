import { CustomerOrderModel } from "./customer-order-model";
import { ResponseModel } from "./response-model";

export class CustomerOrdersResponseModel extends ResponseModel<CustomerOrderModel[]> {
  public pageNumber!: number;
  public pageSize!: number;
  public totalCount!: number;
}
