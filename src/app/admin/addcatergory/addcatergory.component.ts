import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';

import { CatergoryService } from 'src/app/services/catergory.service';
import { SubcatergoryService } from 'src/app/services/subcatergory.service';

@Component({
  selector: 'app-addcatergory',
  templateUrl: './addcatergory.component.html',
  styleUrls: ['./addcatergory.component.scss']
})
export class AddcatergoryComponent implements OnInit {

  loadedCatergory: any;
  loadedSubcatergory: any;

  catergory: string;
  changeCatergory: string;
  subCatergory: any;
  catsize: number;
  objectKeys = Object.keys;
  whenClicked = [];
  whensub = [[],[]];
  constructor(private catergoryService: CatergoryService,
              private subCatergoryService: SubcatergoryService,
              private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.catergoryService.getCatergory().subscribe(res =>{
      this.loadedCatergory = res;
      this.catsize = this.objectKeys(res).length;
      for(let i=0; i<this.catsize; i++){


        this.whensub.push([false]);

        }
      console.log(this.loadedCatergory);
    });

    this.subCatergoryService.getSubcatergory().subscribe(res =>{
      this.loadedSubcatergory = res;
      console.log(res);
    });
  }



  addCatergory() {
    const catergory = {
      catergoryName: this.catergory
    }
    this.catergoryService.addCatergory(catergory).subscribe(res => {
      if (res.state) {
        console.log('added successfully');
        this.onFlash('Catergory Added Succefully', 'success');
      } else {
        console.log('failed');
        this.onFlash('Adding Failed', 'danger');
      }
    });
    console.log(this.catergory);
  }

  addSubcatergory() {
    const subCatergory = {
      catergoryName: this.catergory,
      subCatergoryName: this.subCatergory
    };
    this.subCatergoryService.addSubcatergory(subCatergory).subscribe(res =>{
      if (res.state) {

        console.log('successfully add subcatergory');
        this.onFlash('Sub-Catergory Added Succefully', 'success');
        window.location.reload();
      } else {
        console.log('failed');
        this.onFlash('Adding Failed', 'danger');

      }
    });
    // console.log(this.subcatergoryForm.get('name').value);

  }

  deleteSubcatergory(subCatergory: string) {
    this.subCatergoryService.deleteSubcatergory(subCatergory).subscribe((res: any) => {
      if (res.state) {
        console.log('delete Ok');
        this.onFlash('Successfully Delete', 'success');
        window.location.reload();
      } else {
        console.log('delete failed');
        this.onFlash('Delete Failed', 'danger');
      }
    });

  }

  deleteCatergory(catergory: string) {
    this.catergoryService.deleteCatergory(catergory).subscribe((res: any) => {
      if (res.state) {
        console.log('delete Ok');
        this.onFlash('Successfully Delete', 'success');
        window.location.reload();
      } else {
        console.log('delete failed');
        this.onFlash('Delete Failed', 'danger');
      }
    });

  }

  updateCatergory(id: string) {
    const catergory = {
      catergoryName: this.changeCatergory
    };
    this.catergoryService.updateCatergory(catergory, id).subscribe(res =>{
      if (res.state) {
        console.log('update ok');
        this.onFlash('Successfully Update Catergory Name', 'success');
        window.location.reload();
      } else {
        console.log('update failed');
        this.onFlash('Update Failed', 'danger');
      }
    });

  }

  onFlash(messages: string, msgType: string){
    this.ngFlashMessageService.showFlashMessage({
      messages: [messages],
      dismissible: true,
      timeout: 1500,
      type: msgType
    });
  }



}
