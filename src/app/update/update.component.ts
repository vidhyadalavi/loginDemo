import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatashareService } from '../datacommunication/datashare.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public updatefrm:any;
  public isSubmitted:boolean=false;
  public dataPoint:any;
  constructor(private share:DatashareService, private fb:FormBuilder, private rout:Router) { 
    this.share.getIdData().subscribe(
      (res:any)=>{
        console.log(res);
        this.dataPoint=res;
        console.log(this.dataPoint.fname);
      })
  }

  ngOnInit(): void {
    this.updatefrm = this.fb.group({
      fname:[this.dataPoint.fname],
      lname:[this.dataPoint.lname],
      username:[this.dataPoint.username],
      pass:[this.dataPoint.pass],
      role:[this.dataPoint.role]
    })
  }

  updateFrmFun(){
    this.updatefrm.value;
    console.log(this.updatefrm.value);
    this.isSubmitted=true;
    this.rout.navigate(['login']);

    this.share.editData(this.dataPoint.id, this.updatefrm.value).subscribe(
      (res:any)=>{
        console.log(res);
      })

      if(this.dataPoint.role === this.updatefrm.value.role  ){
        this.rout.navigate(['login'])
      }
  }
  get f(){
    return this.updatefrm.controls;
  }
}
