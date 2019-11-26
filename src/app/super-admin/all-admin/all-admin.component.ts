import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-admin',
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.scss']
})
export class AllAdminComponent implements OnInit {
  allAdmins: any;
  allSuperAdmins: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllSuperAdmin().subscribe(res =>{
      this.allSuperAdmins = res;
      console.log(res);
    });
    this.userService.getAllAdmin().subscribe(res =>{
      this.allAdmins = res;
      console.log(res);
    });
  }


  onDelete(id: string){
    this.userService.deleteCP(id).subscribe((res:any) =>{
      if(res.state){
        console.log('delete')
        window.location.reload();
      }else{
        console.log('error delete')
      }

    });


  }

}
