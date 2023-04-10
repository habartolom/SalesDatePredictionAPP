import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from './services/http-client.service';
import { NewOrderComponent } from './components/views/new-order/new-order.component';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersComponent } from './components/views/orders/orders.component';
import { SalesDatePredictionComponent } from './components/views/sales-date-prediction/sales-date-prediction.component';
import { SalesDatePredictionService } from './services/sales-date-prediction.service';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from './pipes/date-format-pipe';
import { LongDateFormatPipe } from './pipes/long-date-format-pipe';

@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    LongDateFormatPipe,
    NewOrderComponent,
    OrdersComponent,
    SalesDatePredictionComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    HttpClientService,
    SalesDatePredictionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
