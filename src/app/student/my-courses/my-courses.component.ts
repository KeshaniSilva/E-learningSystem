import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  pass: any;
  courses: any;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.pass = this.userService.loadToken();
    this.userService.getRegisteredCourse(this.pass.id).subscribe(res =>{
      this.courses = res;
    console.log(res);
    });
  }

}
