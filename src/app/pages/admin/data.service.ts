import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = {
    title: '',
    content: ''
  };

  private i = new BehaviorSubject(0);
  main = this.i.asObservable();
  private j = new BehaviorSubject(0);
  manu = this.j.asObservable();

  private itemsCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  feedback: Observable<any[]>;
  constructor(public db: AngularFirestore, public afs: AngularFirestore, private http: HttpClient) {
  }


  sendMail(txt, nameV, emailV, pnoV, companyV, countryV, servicesV) {
    const body = {
      txt: txt, nameV: nameV, emailV: emailV, pnoV: pnoV, companyV: companyV, countryV: countryV, servicesV: servicesV
    };
    const url = `https://us-central1-frootdashboard.cloudfunctions.net/sendMail`;
    const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };

    return this.http.post(url, body, headers)
      .toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

  }


  getCat(main): Observable<any[]> {
    this.itemsCollection = this.db.collection<any>(main);
    // console.log(this.itemsCollection.valueChanges());
    return this.itemsCollection.valueChanges();
  }
  getItems(main, cat): Observable<any[]> {
    this.itemsCollection = this.db.collection<any>(main, ref => ref.where('cat', '==', cat));
    // console.log(this.itemsCollection.valueChanges());
    return this.itemsCollection.valueChanges();
  }
  getxyz(sku): Observable<any[]> {
    this.itemDoc = this.afs.doc('items/' + sku);
    // this.item = this.itemDoc.valueChanges();
    return this.itemDoc.valueChanges();
  }

  addCat(data, main) {
    this.itemsCollection = this.db.collection<any>(main);
    this.itemsCollection.add(data);
  }

  addItem(data, suk) {
    console.log(data);
    console.log(suk);

    this.itemDoc = this.afs.doc('items' + '/' + suk);
    this.itemDoc.set(data);
  }
  update(data, sku) {
    this.itemDoc = this.afs.doc('items' + '/' + sku);
    this.itemDoc.update(data);
  }
  deleteItem(sku) {
    this.itemDoc = this.afs.doc('items' + '/' + sku);
    this.itemDoc.delete();
  }
  getDocId() {
    this.itemsCollection = this.db.collection<any>('items/mens/sku');
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        console.log(actions);

        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
