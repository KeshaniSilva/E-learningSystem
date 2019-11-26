import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topRateShorten'
})
export class TopRateShortenPipe implements PipeTransform {

  transform(value: any, ): any {
    if(value.length <= 20){
      return value;
    }
    return value.substr(0, 20) + '...';
  }

}
