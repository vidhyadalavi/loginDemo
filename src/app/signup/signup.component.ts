import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatashareService } from '../datacommunication/datashare.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpfrm:any;
  public isSubmitted:boolean=false;
  

  constructor(private fb:FormBuilder, private share:DatashareService, private rout:Router) { }

  ngOnInit(): void {
    this.signUpfrm = this.fb.group({
      fname:['',[Validators.required]],
      lname:['',[Validators.required]],
      username:['',[Validators.required]],
      pass:['',[Validators.required]],
      role:['',[Validators.required]]
    })
  }

  alreadyUser(){
    this.rout.navigate(['login'])
  }
  signUpFrmFun(){
    this.signUpfrm.value;
    console.log(this.signUpfrm.value);
    this.isSubmitted=true;
    this.rout.navigate(['login']);

    this.share.postData(this.signUpfrm.value).subscribe(
      (res:any)=>{
        console.log(res);
      },(err:any)=>{
        console.log(err);
      })
  }
  get f(){
    return this.signUpfrm.controls
  }
}
