import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { UserService } from '../services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.scss']
})
export class CourseVideoComponent implements OnInit {
  videos = [];
  course: any;
  courseId: {id: string }
  url: any;
  name: string;
  vidName:string;
  pass: any;

  constructor(private a: DomSanitizer,
              private courseService: CourseService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              public  toastr: ToastrManager) { }

  ngOnInit() {
   //  this.videos.push(this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+'Hnh0NtGtSuM'+'?enablejsapi=1'));
   //  this.url = this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+'Hnh0NtGtSuM'+'?enablejsapi=1');
   this.courseId = {
    id: this.activatedRoute.snapshot.paramMap.get('id')
  };
   this.activatedRoute.params.subscribe(
    (params: Params) => {
      this.courseId.id = params['id'];
    }
  );
   this.courseService.displaycourse(this.courseId.id).subscribe(res =>{
      this.course = res;
      console.log(res);
      console.log(res['firstVideoId'])
      this.url = this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+ res['firstVideoId'] +'?enablejsapi=1');
    })

   this.pass = this.userService.loadToken();

  }

  setVideo(id,name,vidname){
    this.url = this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+ id +'?enablejsapi=1');
    console.log(this.url);
    this.name = name;
    this.vidName = vidname;

  }
  val

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    const rate = {
      courseId: this.courseId.id,
      star:  $event.newValue,
      userId: this.pass.id
    }

    console.log(this.val)

    this.courseService.rateCourse(rate).subscribe((res:any) =>{
       if(res.state){
         console.log('success')
         this.toastr.successToastr(res.msg, 'Success!');
         console.log(res)

       }else{
        console.log(res)
        this.toastr.warningToastr(res.msg, 'Alert!');
         console.log('failed rate')
       }
    })
    // alert(`Old Value:${$event.oldValue},

    //   New Value: ${$event.newValue},
    //   Checked Color: ${$event.starRating.checkedcolor},
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }


}
