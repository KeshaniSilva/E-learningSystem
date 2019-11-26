import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content-provider',
  templateUrl: './content-provider.component.html',
  styleUrls: ['./content-provider.component.scss']
})
export class ContentProviderComponent implements OnInit {
  contentProvider: any;
  pass: any;
  token: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('hello')

    this.userService.getContentProvider().subscribe(res => {
      this.contentProvider = res;
      console.log(res);
    })
    this.token = this.userService.loadUserToken()
    console.log(this.token)
  }

  onDelete(id: string){
    this.userService.deleteCP(id).subscribe((res:any) =>{
      if(res.state){
        console.log('delete')
        window.location.reload();
      }else{
        console.log('error delete')
      }

    })


  }

}
