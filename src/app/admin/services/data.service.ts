import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { homeClients } from 'src/app/interfaces/homeClients.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  databaseURL:any="";

  constructor(private http:HttpClient , private database:Database) { 
    this.databaseURL=database.app.options.databaseURL;
  }

  getdata(position:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/${position}.json`)
  }

  // ---------------------------- create data ----------------------------
  create(data:any,position:string,key:string,typeOfAction:string){
    if(typeOfAction=="add"){
      return this.http.post(`${this.databaseURL}/${position}.json`,data)
    }else{
      return this.http.put(`${this.databaseURL}/${position}/${key}.json`,data)
    }
  }

  // ---------------------------- delete data ----------------------------
  delete(position:string,key:string){
    return this.http.delete(`${this.databaseURL}/${position}/${key}.json`)
  }
  

}
