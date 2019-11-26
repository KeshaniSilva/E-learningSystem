import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  topCourse: any;
  upCommingCourse: any;
  topRateCourse: any;

  constructor(private courseService: CourseService) { }


  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    // this.courseService.getFullCourse().subscribe(res =>{
    //   this.topCourse = res;
    //   this.slides = this.chunk(res, 4);
    // });
    console.log(window.location.pathname);

    this.courseService.getNullPermissionCourse().subscribe(res =>{
      this.upCommingCourse = res;
      this.slides = this.chunk(res, 4);
      console.log(res);
    });
    this.courseService.getTopRate().subscribe(res =>{
      console.log('top rate')
      this.topCourse = res;
      console.log(res);
    });
  }
}


