import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from '../datacommunication/datashare.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public gotUser:any;
  constructor(private share:DatashareService, private rout:Router) { 
    this.getUser();
  }

  ngOnInit(): void {
  }

  logOutfun(){
      this.rout.navigate(['login']);
  }

  onEdit(id:any, data:any){
    console.log(id);
    console.log(data);
    this.share.setIdData(id, data);
    this.rout.navigate(['update'])
  }
  getUser(){
    this.share.getIdData().subscribe(
      (res:any)=>{
        console.log(res);
        this.gotUser = res;
      })
  }
}
