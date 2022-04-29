import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatashareService } from '../datacommunication/datashare.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isSubmitted:boolean=false;
  public loginfrm:any;
  public user1:any;
  
  constructor(private fb:FormBuilder, private share:DatashareService, private rout:Router) { }

  ngOnInit(): void {
    this.loginfrm = this.fb.group({
      username:['', [Validators.required]],
      pass:['', [Validators.required]]
    })
  }

  newUser(){
    this.rout.navigate(['signUp']);
  }
  loginFrmFun(){
    this.loginfrm.value;
    console.log(this.loginfrm.value);
    this.isSubmitted=true;
    console.log(this.loginfrm.value.username);
    console.log(this.loginfrm.value.pass);    

    this.share.getData().subscribe(
      (res:any)=>{
        console.log(res);
        this.user1 = res.find((x:any)=>{
          return x.username === this.loginfrm.value.username && x.pass === this.loginfrm.value.pass
        });
        if(this.user1){
          console.log('user found');
          alert('Successfully Login..!!');
          if(this.user1.role == 'user'){
              //setvalue
              this.share.setIdData(this.user1.id, this.user1);
            this.rout.navigate(['user']);
          }
          else{
              //setvalue
              this.share.setIdData(this.user1.id, this.user1);
            this.rout.navigate(['admin'])
          }
          
        }else{
          console.log('user not found');
          alert('User Not Found..!!')
        }
      },(err:any)=>{
        console.log(err);
      })
  }
  get f(){
    return this.loginfrm.controls
  }
}
