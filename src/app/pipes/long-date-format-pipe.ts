import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'longDateFormat'
})
export class LongDateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'dd/MM/yyyy, hh:mm:ss a'): any {
    const datePipe = new DatePipe('en-US');
    value = new Date(value);
    return datePipe.transform(value, format);
  }

}
