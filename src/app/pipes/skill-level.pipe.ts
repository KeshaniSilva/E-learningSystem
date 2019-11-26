import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillLevel'
})
export class SkillLevelPipe implements PipeTransform {

  transform(value: any, beginner: string,  advance: string,intermediate: string,): any {

    if(beginner == null && intermediate == null && advance == null){
      return value;
    }
    return value.filter( value => value.skillLevel == beginner || value.skillLevel == advance || value.skillLevel == intermediate);

  }

}
