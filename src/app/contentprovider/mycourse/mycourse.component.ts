import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.scss']
})
export class MycourseComponent implements OnInit {
  pass: any;
  pending: any;
  accepted: any;
  rejected: any;
  admin:boolean;
  userId: {id: string }
  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('my course')
    this.pass = this.userService.loadToken();
    console.log(this.pass.role)


    if(this.pass.role === 'superAdmin'){
        this.admin = true;

        this.userId = {
          id: this.activatedRoute.snapshot.paramMap.get('id')
        };
        this.activatedRoute.params.subscribe(
          (params: Params) => {
            this.userId.id = params['id'];
          }
        );
      }else{
        this.admin = false;
        this.userId = {
          id: this.pass.id
        }

    }

    this.userService.getCPApprovedCourse(this.userId.id).subscribe(res =>{
      this.accepted = res;
      console.log(res);
    });
    this.userService.getCPPendingCourse(this.userId.id).subscribe(res =>{
      this.pending = res;
      console.log(res);
    });
    this.userService.getCPRejectCourse(this.userId.id).subscribe(res =>{
      this.rejected = res;
      console.log(res);
    });
  }



  onDelete(id: string){
    this.courseService.removeCourse(id).subscribe(res => {
      if(res.state){
        console.log('delete')
      }else{
        console.log('delete failed')
      }
    })

  }




}
