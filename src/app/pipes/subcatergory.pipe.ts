import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcatergory'
})
export class SubcatergoryPipe implements PipeTransform {

  transform(value: any, catergory: string): any {

    if(!value){
      return;
    }
    return value.filter(value => value.catergoryName == catergory);
    }


}
