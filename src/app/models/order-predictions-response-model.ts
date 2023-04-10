import { OrderDatePredictionModel } from "./order-date-prediction-model";
import { ResponseModel } from "./response-model";

export class OrderPredictionsResponseModel extends ResponseModel<OrderDatePredictionModel[]> {
  public pageNumber!: number;
  public pageSize!: number;
  public totalCount!: number;
}
