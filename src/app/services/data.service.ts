import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  currentuserName: any
  currentAcno: any


  users: any = {
    1000: { acno: 1000, uname: "Neer", password: "1000", balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "Laisha", password: "1001", balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "Vyom", password: "1002", balance: 5000, transaction: [] }
  }
  //dependancy injuction
  constructor(private http: HttpClient) {
    //this.getDetails()
  }

  //To store in local storage
  // saveDetails() {
  //   if (this.users) { localStorage.setItem("userDB", JSON.stringify(this.users)) }
  //   if (this.currentuserName) { localStorage.setItem("cUserName", JSON.stringify(this.currentuserName)) }
  //   if (this.currentAcno) { localStorage.setItem("currentAcnoLocal", JSON.stringify(this.currentAcno)) }
  // }


  //To get values in local storage
  // getDetails() {
  //   if (localStorage.getItem("userDB")) { this.users = JSON.parse(localStorage.getItem("userDB") || '') }
  //   if (localStorage.getItem("cUserName")) { this.currentuserName = JSON.parse(localStorage.getItem("cUserName") || '') }
  //   if (localStorage.getItem("currentAcnoLocal")) { this.currentAcno = JSON.parse(localStorage.getItem("currentAcnoLocal") || '') }
  // }
  getTransaction(acno:any) {
    const data={
      acno
    }
    return this.http.post(environment.apiUrl+'/getTransaction/'+acno,data,this.getOptions())
  }

  // -------------------register client--------------
  // register(acno: any, password: any, uname: any) {
  //   let db = this.users
  //   if (acno in db) {
  //     return false
  //   } else {
  //     db[acno] = {
  //       acno, uname, password, balance: 0,transaction:[]
  //     }
  //     console.log(db);
  //     this.saveDetails()
  //     return true
  //   }
  // }
  // -------------------register client--------------

  register(acno: any, password: any, uname: any) {
    const data = {
      acno,
      password,
      uname
    }
    //asynchronous
    return this.http.post(environment.apiUrl+'/register', data)
  }

  login(acno: any, password: any) {
    // let database = this.users
    // if (acno in database) {

    //   if (password == database[acno]["password"]) {
    //     this.currentuserName = database[acno]["uname"]
    //     this.currentAcno = acno
    //     // this.saveDetails()
    //     return true
    //   } else {
    //     alert("Incorrect Password")
    //     return false
    //   }
    // } else {
    //   alert("Invalide Account Number")
    //   return false
    // }

    const data = {
      acno,
      password,

    }
    return this.http.post(environment.apiUrl+'/login', data)
  }

  deposite(acno: any, password: any, amt: any) {
    // var amount = parseInt(amt)

    // let db = this.users
    // if (acno in db) {
    //   if (password == db[acno]["password"]) {
    //     db[acno]["balance"] = db[acno]["balance"] + amount
    //     db[acno].transaction.push({
    //       amount: amount,
    //       type: "CREDIT"
    //     })
    //     //this.saveDetails()
    //     return db[acno]["balance"]

    //   } else {
    //     alert("Incorrect Password")
    //     return false
    //   }
    // } else {
    //   alert("Invalide Account Number")
    //   return false
    // }

    const data = {
      acno,
      password,
      amt
    }


    //asynchronous
    return this.http.post(environment.apiUrl+'/deposite', data, this.getOptions())
  }

  //to add token to the req header
  getOptions() {

    const token = JSON.parse(localStorage.getItem("token") || '')
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("x-access-token", token)
      options.headers = headers
    }
    return options;
  }




  withDraw(acno: any, password: any, amt: any) {
    //   var amount = parseInt(amt)

    //   let db = this.users
    //   if (acno in db) {
    //     if (password == db[acno]["password"]) {

    //       if (db[acno]["balance"] >= amount) {
    //         db[acno]["balance"] = db[acno]["balance"] - amount
    //         db[acno].transaction.push({
    //           amount: amount,
    //           type: "DEBITED
    //         })
    //         //this.saveDetails()
    //         return db[acno]["balance"]
    //       }
    //       else {
    //         alert("Insufficent balance")
    //         return false
    //       }
    //     }
    //     else {
    //       alert("Incorrect Password")
    //       return false
    //     }
    //   }
    //   else {
    //     alert("Invalide Account Number ")
    //     return false
    //   }

    // }

    const data = {
      acno,
      password,
      amt
    }

    //asynchronous
    return this.http.post(environment.apiUrl+'/withDraw', data, this.getOptions())
  }
  delete(acno:any){
    const data= {
      acno
    }
    return this.http.delete(environment.apiUrl+'/deleteAcc/'+acno,this.getOptions())
  }
}
