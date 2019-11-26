import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith, retry} from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // login
  email: string;
  password: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgetPasswordForm: FormGroup;
  pass: any;
  user: any;
  user2:string;
  role: string;

  fullCourse: any;
  loadedCourses: any;
  loadedSubCourses: any;
  loadedCourseVideo: any;
// ----------------------------------------------------
// forget password
newPassword: any;

// search
searchCourse:any;
searchArr =[];
myControl = new FormControl();
unique = [];


// error msg
msg:string;
filteredOptions: Observable<string[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              public toastr: ToastrManager) { }

  ngOnInit() {
 // login
    this.loginForm = this.fb.group({
      email: ['',Validators.email],
      password: ['',Validators.required],
      role:['',Validators.required]
    });
 // register
    this.registerForm = this.fb.group({
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      email: ['',Validators.email],
      password: ['',Validators.required],
      role: ['',Validators.required]
    });

    //forgerPassword
    this.forgetPasswordForm = this.fb.group({
       email: ['', Validators.required]

     });

    this.courseService.getFullCourse().subscribe(response =>{
      this.fullCourse = response;
      console.log(this.fullCourse.name)
      this.search();
    });

    // search

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.courseService.getCourses()
    .subscribe(response => {
      this.loadedCourses=response;
    });
    // get user image

    this.userDetails();


  }
  // subcatergory update
   onSelect(courseName: string){
    this.courseService. getSubcourses(courseName).subscribe(response => {
      this.loadedSubCourses=response;
      this.courseService.courseUpdate.emit(this.loadedSubCourses);


    });
    // main catergory video update
    this.courseService.getCourseVideos(courseName).subscribe(response =>{
      this.loadedCourseVideo=response;
      this.courseService.courseVideoUpdate.emit(this.loadedCourseVideo);
      console.log(response);
    });
   }
   // set login role
   onSetRoleStuent(){
    //this.role = 'student';
    this.loginForm.get('role').setValue('student');
   }

   onSetRoleContentprovider(){
   // this.role = 'contentprovider';
   this.loginForm.get('role').setValue('contentProvider');
  }

  onLogin(){
    this.userService.authenticateUser(this.loginForm.value).subscribe(data => {
        if (data.success) {
           this.userService.storeUserData(data.token,data.user);


           // this.userDetails();

           this.pass = this.userService.loadToken();
           this.userService.getUser(this.pass.id).subscribe(response => {
            this.user = response;
            console.log('user')
            console.log(this.user.role)

            // if(this.user.role === this.role){

            //   console.log('succussful login')
            //    this.router.navigateByUrl('/'+this.role);
            // }else{
            //   console.log('error login');
            //   this.onLogout()
            // }

           });
           console.log('login success')
           this.router.navigateByUrl('/' + this.loginForm.get('role').value);
           this.toastr.successToastr('login succeffuly.', 'Success!');




        } else {
          console.log('error login');
          this.msg = data.msg

        }
      });

  }


 //  login validation
 get emailValidate(){
   return this.loginForm.get('email');
 }

 get passwordValidate(){
  return this.loginForm.get('password');
}
// regiset validatiion


  onRegister(){
    this.userService.registerUser(this.registerForm.value).subscribe((data) => {
      if(data.state){

       console.log('registered');
       //this.router.navigateByUrl('/login');
      }else{
        console.log('failed register');
        this.msg = data.msg;
       //this.router.navigateByUrl('/register');
      }
  });
  }

  get emailValidateReg(){
    return this.registerForm.get('email');
  }

  get passwordValidateReg(){
   return this.registerForm.get('password');
  }
  onLogout(){
    this.userService.logout();
    this.user = null;
  }

  userDetails(){
    this.pass = this.userService.loadToken();
    this.userService.getUser(this.pass.id).subscribe(response => {
    this.user = response;
    });
  }

 get userLoggedIn(){
   return this.userService.loggedIn();
 }

 onForgetPassword() {
  this.userService.forgetPassword(this.forgetPasswordForm.value.email).subscribe(res =>{
    this.newPassword = res;
    console.log(res)
  })


 }

 onSearch(option){
   this.courseService.searchCourse(option).subscribe(res=> {
     console.log(option)
     this.courseService.sCourse.emit(res);
    });
   this.router.navigateByUrl('/searchcourses')
 }

 search(){
   this.fullCourse.forEach(element => {
    this.searchArr.push(element.name);

   });
   this.unique = [...new Set(this.searchArr)];
   console.log(this.searchArr);
   console.log(this.unique);
 }


 private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.unique.filter(option => option.toLowerCase().includes(filterValue));
}

}
