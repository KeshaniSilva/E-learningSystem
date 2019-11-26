import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-displaycourses',
  templateUrl: './displaycourses.component.html',
  styleUrls: ['./displaycourses.component.scss']
})
export class DisplaycoursesComponent implements OnInit {

  loadedSubCourses: any;
  loadedCourseVideosub: any;
  mainCourse: { id: string };
  subCourse: {id: string};

  // filter type
  paid: string;
  free: string;

  checkedpaid = false;
  checkedfree = false;


  // filter skill

  beginner: string;
  intermediate: string;
  advance: string;

  checkedbeginner = false;
  checkedintermediate = false;
  checkedadvance = false;

// filter duration

  lessmonth: string;
  less3month: string;
  more3month: string;

  checkedlessmonth = false;
  checkedless3month = false;
  checkedmore3month = false;




  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {
    // get activated route main course
    this.mainCourse = {
      id: this.activatedRoute.snapshot.paramMap.get('catergory')
    };
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.mainCourse.id = params['catergory'];
      }
    );

     // get activated route subcourse
    this.subCourse = {
      id: this.activatedRoute.snapshot.paramMap.get('subCatergory')
    };
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.subCourse.id = params['subCatergory'];
      }
    );

         // display sub courses
    this.courseService. getSubcourses(this.mainCourse.id).subscribe(res => {
      this.loadedSubCourses=res;
      console.log(res);
    });

    this.courseService.courseUpdate.subscribe(
      (course: string)=>{
      this.loadedSubCourses=course;
      console.log(this.loadedSubCourses);
      }

    );


    //display videos according to sub catergories

    this.courseService.getCourseVideossub(this.mainCourse.id,this.subCourse.id).subscribe(response =>{
      this.loadedCourseVideosub = response;
      console.log(response);
    });

  }


   // display videos according to sub catergories
   onSubCourse(mCourse: string, sCourse: string){
    this.courseService.getCourseVideossub(mCourse,sCourse).subscribe(response =>{
      this.loadedCourseVideosub = response;
      console.log(this.subCourse.id);
      console.log(response);
    });
  }

  // filter type
  onPaid() {
    if (this.checkedpaid) {
      this.paid = null;
    } else {
      this.paid = 'paid';
    }
  }

    onFree() {
      if (this.checkedfree) {
        this.free = null;
      } else {
        this.free = 'free';
      }
    }

  // filter skill level

  onBeginner() {
    if (this.checkedbeginner) {
      this.beginner = null;
    } else {
      this.beginner = 'beginner';
    }
  }

  onIntermediate() {
    if (this.checkedintermediate) {

      this.intermediate = null;
    } else {
      this.intermediate = 'intermediate';
    }
  }
  onAdvance() {
    if (this.checkedadvance) {

      this.advance = null;
    } else {
      this.advance = 'advance';
    }
  }

  // filter duration

  onLessMonth() {
    if (this.checkedlessmonth) {
      this.lessmonth = null;
    } else {
      this.lessmonth = 'lessmonth';

    }
  }

  onLess3Month() {
    if (this.checkedless3month) {
      this.less3month = null;
    } else {
      this.less3month = '1-3month';
    }
  }
  onMore3Month() {
    if (this.checkedmore3month) {
      this.more3month = null;
    } else {
      this.more3month = '3+month';
    }
    }
    //rating
    onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
      alert(`Old Value:${$event.oldValue},
        New Value: ${$event.newValue},
        Checked Color: ${$event.starRating.checkedcolor},
        Unchecked Color: ${$event.starRating.uncheckedcolor}`);
    }
}
