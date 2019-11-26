import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentShorten'
})
export class ContentShortenPipe implements PipeTransform {

  transform(value: any): any {
    if(value.length <= 470){
      return value;
    }
    return value.substr(0, 470) + '...';
  }


}
