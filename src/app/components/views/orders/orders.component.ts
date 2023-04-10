import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerOrderModel } from 'src/app/models/customer-order-model';
import { CustomerOrdersRequestModel } from 'src/app/models/customer-orders-request-model';
import { SalesDatePredictionService } from 'src/app/services/sales-date-prediction.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  @Input() public title!: string;
  @Input() public customerId!: number;
  @Output() close = new EventEmitter<void>();

  public customerOrdersRequest!: CustomerOrdersRequestModel;
  public customerOrders!: CustomerOrderModel[];
  public pageNumber: number;
  public pageSize: number;
  public pages: number;
  public totalCount: number;
  public orderingDirection: number;
  public pageSizeOptions: number[];
  public sortColumn: number;


  constructor(private salesDatePredictionService: SalesDatePredictionService){
    this.customerOrdersRequest = new CustomerOrdersRequestModel();
    this.pageNumber = 1;
    this.pageSize = 10;
    this.pages = 1;
    this.totalCount = 0;
    this.orderingDirection = 0;
    this.pageSizeOptions = [10, 25, 50, 100]
    this.sortColumn = 0;
  }

  ngOnInit(): void {
    this.salesDatePredictionService.getCustomerOrders(this.customerId, this.customerOrdersRequest)
      .subscribe(response => {
        this.customerOrders = response.data
        this.pages = Math.ceil(response.totalCount / this.pageSize);
        this.totalCount = response.totalCount;
      });
  }

  public onPageChange(pageNumber: number){
    if(pageNumber <= 0 || pageNumber > this.pages)
      return;

    this.pageNumber = pageNumber;
    this.customerOrdersRequest.pageNumber = pageNumber;
    this.salesDatePredictionService.getCustomerOrders(this.customerId, this.customerOrdersRequest)
      .subscribe(response => {
          this.customerOrders = response.data
      });
  }

  public onOrderChange(column: number){
    this.orderingDirection = this.sortColumn == column ? (this.orderingDirection + 1) % 2 : 0;
    this.sortColumn = column;
    this.customerOrdersRequest.sortColumn = column;
    this.customerOrdersRequest.orderingDirection = this.orderingDirection;
    this.salesDatePredictionService.getCustomerOrders(this.customerId, this.customerOrdersRequest)
       .subscribe(response => {
        this.customerOrders = response.data
      });
  }

  public onPageSizeChange(){
    this.pageNumber = 1;
    this.customerOrdersRequest.pageSize = this.pageSize;
    this.customerOrdersRequest.pageNumber = 1;
    this.salesDatePredictionService.getCustomerOrders(this.customerId, this.customerOrdersRequest)
       .subscribe(response => {
        this.customerOrders = response.data;
        this.pages = Math.ceil(response.totalCount / this.pageSize);
      });
  }

  public onClose() {
    this.close.emit();
  }

  public onModalClick(event: Event) {
    event.stopPropagation();
  }

}
