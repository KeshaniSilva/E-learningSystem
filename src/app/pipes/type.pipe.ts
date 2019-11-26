import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: any, paid: string, free: string): any {
    if(paid == null && free == null){
      return value;
    }
    return value.filter(value => value.type == paid || value.type == free);

  }


}
