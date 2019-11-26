import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent implements OnInit {


  courseId: string;
  course: any;

  pass: any;
  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private userService: UserService,
              private router: Router,
              public toastr: ToastrManager) { }

  ngOnInit() {
      // get activate route in course
      this.courseId = this.activatedRoute.snapshot.paramMap.get('id')
      this.pass = this.userService.loadToken();
      // course
      this.courseService.displaycourse(this.courseId).subscribe(res => {
        this.course = res;
        console.log(res);
      });
  }

  get userLoggedIn(){
    return this.userService.loggedIn();
  }

  onRegisterCourse(){
    const course ={
      userId: this.pass.id,
      courseId: this.courseId
    }
    console.log('success');
    console.log(course);
    this.courseService.registerUserToCourse(course,this.courseId).subscribe(res =>{
      console.log(res)
      if(res.state){
       console.log('succefully register to course');
       this.router.navigateByUrl('/'+this.courseId+'/coursevideo')
       this.toastr.successToastr(res.msg, 'Success!');

     }else{
       console.log(res.msg)
       console.log('register faild');
       this.router.navigateByUrl('/'+this.courseId+'/coursevideo')
       this.toastr.warningToastr(res.msg, 'Alert!');
     }


    }
   )

  }



}
