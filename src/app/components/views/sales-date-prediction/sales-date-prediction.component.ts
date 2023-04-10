import { Component, OnInit} from '@angular/core';
import { OrderDatePredictionModel } from 'src/app/models/order-date-prediction-model';
import { OrderPredictionsRequestModel } from 'src/app/models/order-predictions-request-model';
import { SalesDatePredictionService } from 'src/app/services/sales-date-prediction.service';


@Component({
  selector: 'app-sales-date-prediction',
  templateUrl: './sales-date-prediction.component.html',
  styleUrls: ['./sales-date-prediction.component.scss']
})
export class SalesDatePredictionComponent implements OnInit {

  public orderPredictionsRequest!: OrderPredictionsRequestModel;
  public customerOrderPredictions!: OrderDatePredictionModel[];
  public pageNumber: number;
  public pageSize: number;
  public pages: number;
  public totalCount: number;
  public orderingDirection: number;
  public pageSizeOptions: number[];
  public sortColumn: number;
  public searchedName: string;
  public selectedCustomerId!: number;
  public showDialog: boolean;
  public modalTitle!: string;

  constructor(private salesDatePredictionService: SalesDatePredictionService){
    this.orderPredictionsRequest = new OrderPredictionsRequestModel();
    this.pageNumber = 1;
    this.pageSize = 10;
    this.pages = 1;
    this.totalCount = 0;
    this.orderingDirection = 0;
    this.pageSizeOptions = [10, 25, 50, 100]
    this.sortColumn = 0;
    this.searchedName = '';
    this.showDialog = false;
  }

  ngOnInit(): void {
    this.salesDatePredictionService.getOrderDatePredictions(this.orderPredictionsRequest)
      .subscribe(response => {
        this.customerOrderPredictions = response.data
        this.pages = Math.ceil(response.totalCount / this.pageSize);
        this.totalCount = response.totalCount;
      });
  }

  public onPageChange(pageNumber: number){
    if(pageNumber <= 0 || pageNumber > this.pages)
      return;

    this.pageNumber = pageNumber;
    this.orderPredictionsRequest.pageNumber = pageNumber;
    this.salesDatePredictionService.getOrderDatePredictions(this.orderPredictionsRequest)
       .subscribe(response => {
        this.customerOrderPredictions = response.data
      });
  }

  public generatePages(maxPages: number) : number[] {
    const pages: number[] = [];
    for (let i = 0; i < maxPages; i++)
      pages.push(i)

    return pages;
  }

  public onOrderChange(column: number){
    this.orderingDirection = this.sortColumn == column ? (this.orderingDirection + 1) % 2 : 0;
    this.sortColumn = column;
    this.orderPredictionsRequest.sortColumn = column;
    this.orderPredictionsRequest.orderingDirection = this.orderingDirection;
    this.salesDatePredictionService.getOrderDatePredictions(this.orderPredictionsRequest)
       .subscribe(response => {
        this.customerOrderPredictions = response.data
      });
  }

  public onPageSizeChange(){
    this.pageNumber = 1;
    this.orderPredictionsRequest.pageSize = this.pageSize;
    this.orderPredictionsRequest.pageNumber = 1;
    this.salesDatePredictionService.getOrderDatePredictions(this.orderPredictionsRequest)
       .subscribe(response => {
        this.customerOrderPredictions = response.data;
        this.pages = Math.ceil(response.totalCount / this.pageSize);
      });
  }

  public onSearchName(){
    this.pageNumber = 1;
    this.orderPredictionsRequest.pageNumber = 1;
    this.orderPredictionsRequest.customerName = this.searchedName;
    this.salesDatePredictionService.getOrderDatePredictions(this.orderPredictionsRequest)
       .subscribe(response => {
        this.customerOrderPredictions = response.data;
        this.pages = Math.ceil(response.totalCount / this.pageSize);
        this.totalCount = response.totalCount;
      });
  }

  public onViewOrdersButtonClick(order: OrderDatePredictionModel){
    this.selectedCustomerId = order.customerId;
    this.modalTitle = order.customerName;
    this.showDialog = true;
  }

  public closeModal() {
    this.showDialog = false;
  }
}
