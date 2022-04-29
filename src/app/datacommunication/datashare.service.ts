import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  public id = new BehaviorSubject('');
  public currentId = this.id.asObservable();

  public data = new BehaviorSubject('');
  public curruntData = this.data.asObservable();

  constructor(private http:HttpClient) { }

  setIdData(id:any, data:any){
    this.id.next(id);
    this.data.next(data);
  }

  getIdData(){
    return this.currentId, this.curruntData;
  }

  getData(){
    return this.http.get('http://localhost:3000/api/getAllregisters');
  }

  postData(data:any){
    return this.http.post('http://localhost:3000/api/insertregisters', data);
  }

  editData(id:any, data:any){
    return this.http.put('http://localhost:3000/api/updateregisters/'+id, data);
  }

  deleteData(id:any){
    return this.http.delete('http://localhost:3000/api/deleteregisters/'+id)
  }
}
