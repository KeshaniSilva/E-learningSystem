import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {

  size: number;
  constructor() { }

  ngOnInit() {
  }

  receiveSize($event) {
    this.size = $event;

  }

}
