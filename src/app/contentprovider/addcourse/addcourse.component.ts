import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SubcatergoryService } from 'src/app/services/subcatergory.service';
import { CatergoryService } from 'src/app/services/catergory.service';
import { CourseService } from 'src/app/services/course.service';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from "angularx-social-login";
import {  GoogleLoginProvider } from "angularx-social-login";
import { UserService } from 'src/app/services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  selectedFile: File = null;
  videoFile: File = null;
  pdfFile: File = null;

  loadedCatergory: any;
  loadedSubcatergory: any;
  catergory = '';
  fileName = 'Choose File';
  apiKey = 'AIzaSyARlqyYi6ockihl0Qi5MTYO3qjQVwmpfsI';

  contentForm: FormGroup;

  user: any;
  pass: any;
  loggedIn = false;

 imgName = "";

  constructor(private fb: FormBuilder,
              private subCatergoryService: SubcatergoryService,
              private catergoryService: CatergoryService,
              private courseService: CourseService,
              private userService: UserService,
              private http: HttpClient,
              private authService: AuthService,
              public toastr: ToastrManager)
              { }

i=0;
  ngOnInit() {

    // google login
    this.uploaded.push([false])
    this.uploadedbar.push([false])

      // for(this.i=0; this.i<5; this.i++ ){
      //   this.udp.push([false])
      // }
     // this.udp[2][0]=false
      console.log('2d array')
      console.log(this.vid)

    this.authService.authState.subscribe((user) => {
      console.log(user);
      localStorage.setItem('token',user.authToken);
      this.user = user;
      this.loggedIn = (user != null);
    });
    // load subcatergories
    this.subCatergoryService.getSubcatergory().subscribe(res =>{
      this.loadedSubcatergory = res;
      console.log(res);

    });
    // load catergories
    this.catergoryService.getCatergory().subscribe(res =>{
      this.loadedCatergory = res;
      console.log(res);
    });
    // content provider details
    this.pass = this.userService.loadToken();

    this.contentForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      author:['',Validators.required],
      authorId:['',Validators.required],
      catergory: ['',Validators.required],
      subCatergory: ['',Validators.required],
      type: ['',Validators.required],
      skillLevel: ['',Validators.required],
      duration: ['', Validators.required],
      firstVideoId:['',Validators.required],
      topics: this.fb.array([this.fb.group({
        topic:['', Validators.required],
        videos : this.fb.array([this.fb.group({
          videoName:['',Validators.required],
          video:['',Validators.required],
        })]),
        files: this.fb.array([new FormControl('', Validators.required)])
      })]),

    });

    //   this.contentForm = this.fb.group({
    //   name: ['', Validators.required],
    //   description: ['',Validators.required],
    //   catergory: ['',Validators.required],
    //   subCatergory: ['',Validators.required],
    //   type: ['',Validators.required],
    //   skillLevel: ['',Validators.required],
    //   duration: ['', Validators.required],
    //   topics: this.fb.array([this.fb.group({
    //     topic:['', Validators.required],
    //     videos : this.fb.array([new FormControl('',Validators.required)]),
    //     files: this.fb.array([new FormControl('', Validators.required)])
    //   })]),

    // });



  }


  get topic() {
    return this.contentForm.get('topics') as FormArray;

    }




  addVideos(i){

    const vid = this.topic.at(i).get('videos') as FormArray;
    const file = this.topic.at(i).get('files') as FormArray;
    vid.push(this.fb.group({
      videoName:['',Validators.required],
      video : ['',Validators.required]
    }));
    file.push(new FormControl('',Validators.required))

  }

  addFile(i){
    const file = this.topic.at(i).get('files') as FormArray;
    file.push(new FormControl('',Validators.required));
  }
  addTopic(){

    this.topic.push(this.fb.group({
      topic:['', Validators.required],
      videos : this.fb.array([this.fb.group({
        videoName:['',Validators.required],
        video:['',Validators.required],
      })]),
      files : new FormArray([new FormControl('',Validators.required)])
    })
    );
   this.uploaded.push([false])
   this.uploadedbar.push([false])
    // ((this.topic.controls[0] as FormGroup).get('videos') as FormArray).push(new FormControl('HELLO',Validators.required));

  }
  onDelete(i: number) {
    (this.contentForm.get('topics') as FormArray).removeAt(i);

  }
  onDeleteFile(i: number, k:number){
    (this.topic.at(i).get('files') as FormArray).removeAt(k);
  }
  onDeleteVideo(i: number, k: number){
    (this.topic.at(i).get('videos') as FormArray).removeAt(k);
    this.vid[i].splice(k,1)
    console.log(k)
    console.log(i)
  }

  // uploadVideo(i:number, k: number){
  //   console.log(i);
  //   (this.topic.at(i).get('videos') as FormArray).at(k).setValue(['d1234']);


  // }
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.imgName = this.selectedFile.name;

  }
  vid = [[],[]]
  onVideoSelected(event, i,m){
    this.vid.push([""])
    this.videoFile = <File>event.target.files[0];
    this.vid[i][m]=this.videoFile.name

  }

  onSubmit(){
    this.contentForm.get('author').setValue(this.pass.name);
    this.contentForm.get('authorId').setValue(this.pass.id);

    this.courseService.Addcourse(this.contentForm.value).subscribe(res =>{
      if(res.state){
        console.log('course upload')
        console.log(this.contentForm.value)
        console.log(res.course['_id'])
        this.courseService.courseImgUpload(this.selectedFile, res.course['_id']).subscribe(res => {
          if(res.state){
            console.log('success couse update with image');
            this.toastr.successToastr(res.msg, 'Success!');
            setTimeout(()=>{
              window.location.reload();
         }, 2000);

          }else{
            console.log('error img')
            this.toastr.errorToastr(res.msg, 'Success!');
          }
        });
      }else{
        this.toastr.errorToastr(res.msg, 'Success!');
        console.log('flase');

      }
    })

    console.log(this.contentForm.value);

  }

  // google login

  signInWithGoogle(): void {
    console.log('signin');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  uploaded = [[],[]]
  uploadedbar = [[],[]]
  uploadVideo(files, i: number, m: number) {
    this.uploadedbar[i][m]= true;
    console.log('upload')
    let headers = {
      headers: new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'))
    };
    let formData: FormData = new FormData();
    formData.append('file', files[0]);
    const url = 'https://www.googleapis.com/upload/youtube/v3/videos?key=' + this.apiKey + '&part=contentDetails,status';
    this.http.post(url, formData, headers).subscribe(res => {
      console.log(res);
      console.log(res['id']);
       this.uploaded[i][m]= true;
       this.uploadedbar[i][m]= false;
       this.toastr.successToastr('Upload Successfully', 'Success!');

      (this.topic.at(i).get('videos') as FormArray).at(m).get('video').setValue(res['id']);
      if(i === 0 && m === 0){
        this.contentForm.get('firstVideoId').setValue(res['id'])

      }
    //  (this.topic.at(i).get('videos') as FormArray).at(k).setValue([res['id']]);
    });




   // console.log(this.uploaded)

  }
 pdf = [[],[]]
 onPdfSelected(event, i,m){
    this.pdf.push([""])
    this.pdfFile = <File>event.target.files[0];
    this.pdf[i][m]=this.pdfFile.name

  }
  uploadPdf(){

  }

  // onUploaded(i,m){
  //   this.uploadedbar[i][m]= false;
  //   this.uploaded[i][m]= true;
  // }
  // j=1;
  // y=0;
  // testClicked(){
  //   console.log(this.j)
  //   this.uploaded[this.j][this.y]=false;
  //   this.j++;
  // }
  // onFileSelected(event){
  //   this.selectedFile = <File>event.target.files[0];
  //   this.userService.uploadImage(this.selectedFile,this.pass.id);
  // }

onClick(){
 console.log( this.vid)
}

}
