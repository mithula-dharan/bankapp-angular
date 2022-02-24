import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  user: any
  acno=""
  lDate:any

  depositeForm = this.fb.group({
    acno: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    amount: ["", [Validators.required, Validators.pattern('[0-9]*')]]
  })
  withdrawForm = this.fb.group({
    acno1: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    amount1: ["", [Validators.required, Validators.pattern('[0-9]*')]]
  })

  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) {
    this.lDate=new Date()
    if (localStorage.getItem("currentuserName")) {
      this.user = JSON.parse(localStorage.getItem("currentuserName") || "")
    }
  }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("please login...!!!")
      this.router.navigateByUrl("")
    }
  }
  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentuserName")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
   
  }

  deposit(): void {
    var acno = this.depositeForm.value.acno
    var pswd = this.depositeForm.value.pswd
    var amt = this.depositeForm.value.amount
    let result = this.ds.deposite(acno, pswd, amt)
    if (this.depositeForm.valid) {
      this.ds.deposite(acno,pswd,amt)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
         
        } 
      },
      (result)=>{
        alert(result.error.message);
        
      })
      
  
  
    } else { alert("Invalide Form") }
  }

  withDraw() {
    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amt = this.withdrawForm.value.amount1
   
    if (this.withdrawForm.valid) {
      this.ds.withDraw(acno,pswd,amt)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
         
        } 
      },
      (result)=>{
        alert(result.error.message)
        
      })

      
    } else { alert("Invalide Form") }

  }
  deleteFromParent(){
     this.acno=JSON.parse(localStorage.getItem("currentAcno")||" ")

  }
  delete(event:any){
   
    this.ds.delete(event)
    .subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl("")
    },
    (result)=>{
      alert(result.error.message)

    })

  }

  cancel(){
    this.acno=""
  }

 
}
