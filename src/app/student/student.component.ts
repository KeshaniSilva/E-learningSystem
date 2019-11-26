import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
 userId:any
 disable: boolean = false;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')

    if(this.userId == null){
      this.disable = false;
    }else{
      this.disable = true;
    }
  }

}
