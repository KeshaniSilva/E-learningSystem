import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, lessmonth: string, less3month: string, more3month: string): any {
    if(lessmonth == null && less3month == null && more3month == null){
      return value;
    }
    return value.filter(value => value.duration == lessmonth || value.duration == less3month || value.duration == more3month);
  }

}
