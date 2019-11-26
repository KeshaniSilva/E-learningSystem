import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SubcatergoryService } from 'src/app/services/subcatergory.service';
import { CatergoryService } from 'src/app/services/catergory.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrls: ['./updatecourse.component.scss']
})
export class UpdatecourseComponent implements OnInit {

  updateForm: FormGroup;
  loadedSubcatergory: any;
  loadedCatergory: any;
  //catergory = '';
  courseId: any;

  name:string;
  description:string;
  maincatergory:string;
  subcatergory:string;
  type:string;
  skillLevel:string;
  duration:string;

  constructor(private fb: FormBuilder,
              private subCatergoryService: SubcatergoryService,
              private catergoryService: CatergoryService,
              private activatedRoute: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {
    this.courseId = {
      id: this.activatedRoute.snapshot.paramMap.get('id')
    };
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.courseId.id = params['id'];
      }
    );

    this.courseService.displaycourse(this.courseId.id).subscribe(res => {
      console.log(res);
      this.name = res['name'];
      this.description = res['description'];
      this.maincatergory = res['catergory'];
      this.subcatergory = res['subCatergory'];
      this.type = res['type'];
      this.skillLevel = res['skillLevel'];
      this.duration = res['duration'];

      console.log(this.name)
      console.log(this.subcatergory)
      console.log(this.maincatergory)


    })

    // this.updateForm = this.fb.group({
    //   name: [this.name,Validators.required],
    //   description: [this.description,Validators.required],
    //   catergory: [this.maincatergory,Validators.required],
    //   subCatergory: [this.subcatergory,Validators.required],
    //   type: [this.type,Validators.required],
    //   skillLevel: [this.skillLevel,Validators.required],
    //   duration: [this.duration, Validators.required],
    // });





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
  }


  onUpdate(){
      const course = {
        name: this.name,
        description: this.description,
        catergory : this.maincatergory,
        subCatergory: this.subcatergory,
        type: this.type,
        skillLevel: this.skillLevel,
        duration: this.duration
      }

      this.courseService.updateCourse(course,this.courseId.id).subscribe(res => {
      if(res.state){
        console.log('updated')
        window.location.reload();
      }else{
        console.log('update failed')
      }
    })



  }

}
