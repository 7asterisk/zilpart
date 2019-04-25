import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  needCatAdd = false;
  catList = []; // sare catogaries ka list.
  newCat; // new cat ki id.
  itemsCollection: any;
  items: any;
  constructor(private dataService: DataService) {
    this.dataService.getCat('cats').subscribe(data => {
      console.log(data);
      this.catList = data;
    });
  }


  // to add catogories
  addDoc(event, docId) {
    if (event.key === 'Enter') {
      
      this.catList.push(docId);
      console.log(docId);
      // this.newCat = docId;
      this.needCatAdd = false;
      this.dataService.addCat({ name: docId }, 'cats');
    }
  }
  ngOnInit() {
  }

}
