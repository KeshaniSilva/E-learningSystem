import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  size: number;
  role: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.role = this.activatedRoute.snapshot.data['role'];
    //console.log(this.role)
  }

  receiveSize($event) {
    this.size = $event;

  }
}
