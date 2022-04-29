import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from '../datacommunication/datashare.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public listData:any;
  public formData:any;
  public deletedData:any;

  constructor(private share:DatashareService, private rout:Router ) { 
    this.getAllDataFromBackend();
    this.postAllDataFromBackend();
  }

  ngOnInit(): void {
  }

  createFun(){
      this.rout.navigate(['signUp']);
  }

  onEdit(id:any, data:any){
    console.log(id);
    console.log(data);
    this.share.setIdData(id, data);
    this.rout.navigate(['update']);
  }

  onDelete(id:any){
      if(confirm('Are you sure to delete data..??')){
        this.share.deleteData(id).subscribe(
          (res:any)=>{
            console.log(res);

            this.share.getData().subscribe(
              (res:any)=>{
                console.log(res);
                this.deletedData = res;

                if(this.deletedData.length>0){
                  this.getAllDataFromBackend();
                }
              })
          },(err:any)=>{
            console.log(err);
          })
      }
  }

  getAllDataFromBackend(){
    this.share.getData().subscribe(
      (res:any)=>{
        console.log(res);
        this.listData=res;
      },(err:any)=>{
        console.log(err);
      })
  }

  postAllDataFromBackend(){
    this.share.postData(this.formData).subscribe(
      (res:any)=>{
        console.log(res);
      },(err:any)=>{
        console.log(err);
      })
  }
}
