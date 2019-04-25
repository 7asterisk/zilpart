import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {


  // item properties
  sku = '';
  name = '';
  amount = 0;
  color = '';
  height = 0;
  weight = 0;
  imgUrl = '';
  aboutItem = '';




  constructor(public dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(n => {
      this.dataToAdd.cat = n.cat;

      // get all the item of particular cat

      this.dataService.getItems('items', this.dataToAdd.cat).subscribe(data => {
        this.data = data;
        console.log(data);
      });
    });
  }


  data;
  cat;
  editInit = false; // to know dataToAdd is in which mode . if(false) then mode = add_new else mode = edit_old;
  d; // just for getting the data 

  dataToAdd = {
    sku: this.sku,
    name: this.name,
    amount: this.amount,
    color: this.color,
    height: this.height,
    weight: this.weight,
    imgUrl: this.imgUrl,
    aboutItem: this.aboutItem,
    cat: this.cat
  };

  addItem() {
    this.dataService.addItem(this.dataToAdd, this.dataToAdd.sku);
    this.resetItem();
  }

  editItem(sku) {
    // console.log(sku);

    this.dataService.getxyz(sku).subscribe(data => {
      this.d = data;
      this.dataToAdd = this.d;
      console.log(data);
    });
  }
  deleteItem(sku) {
    this.resetItem();
    this.dataService.deleteItem(sku);
  }
  resetItem() {
    this.dataToAdd.sku = '';
    this.dataToAdd.name = '';
    this.dataToAdd.amount = 0;
    this.dataToAdd.color = '';
    this.dataToAdd.height = 0;
    this.dataToAdd.weight = 0;
    this.dataToAdd.imgUrl = '';
    this.dataToAdd.aboutItem = '';
  }
  ngOnInit() {
  }

}
