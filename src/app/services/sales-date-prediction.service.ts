import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerOrdersRequestModel } from '../models/customer-orders-request-model';
import { CustomerOrdersResponseModel } from '../models/customer-orders-response-model';
import { OrderDatePredictionModel } from '../models/order-date-prediction-model';
import { OrderPredictionsRequestModel } from '../models/order-predictions-request-model';
import { OrderPredictionsResponseModel } from '../models/order-predictions-response-model';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SalesDatePredictionService {

  private getOrderPredictions : string = 'customers/orderpredictions';
  private getEmployees : string = 'employees/all';
  private addOrder : string = 'orders/add';
  private getOrdersByCustomer : string = 'orders/customer/';
  private getProducts : string = 'products/all';
  private getShippers : string = 'shippers/all';

  constructor(private httpClient : HttpClientService) { }

  public getOrderDatePredictions(orderPredictionsRequest: OrderPredictionsRequestModel) : Observable<OrderPredictionsResponseModel>{
    return this.httpClient.sendGetRequest(this.getOrderPredictions, undefined, orderPredictionsRequest);
  }

  public getCustomerOrders(customerId: number, customerOrdersRequestModel: CustomerOrdersRequestModel) : Observable<CustomerOrdersResponseModel>{
    return this.httpClient.sendGetRequest(this.getOrdersByCustomer + customerId , undefined, customerOrdersRequestModel);
  }
}
