import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {

  serchCourse: any;
  constructor(private courseService: CourseService) {

   }

  ngOnInit() {

    this.courseService.sCourse.subscribe(res =>{
      this.serchCourse = res['arr'];
      console.log('hello')
      console.log(this.serchCourse);
      console.log('hello')
    })

  }



}
