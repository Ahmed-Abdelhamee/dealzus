import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { homeClients } from 'src/app/interfaces/homeClients.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  // variables for control view and data 
  uploadingImg:string="";
  mainControl:string="showData";
  // variables for data 
  clientPhoto=this.formBuilder.group({
    img:[""],
    id:[new Date().getTime()]
  })
  photoUrl:string="";
  clientPhotoArray:homeClients[]=[]; // for showing the data
  // item key in database
  globalKey:string="";
  globalObject:any;

  constructor(private formBuilder:FormBuilder , private fireStorage:AngularFireStorage,private dataServ:DataService) {
    dataServ.getAllClients().subscribe(data =>{
      for (const key in data) {
        this.clientPhotoArray.push(data[key])
      }
    })
   }

  ngOnInit(): void {
  }

  // ------------- control the show ---------------
  viewControl(mainControl:string){
    this.mainControl=mainControl;
  }
  //----------------------------------------------
  
  // ------------- uploading File ---------------
  async uploadingFile(event:any){
    this.uploadingImg="uploadingImg";
    const file=event.target.files[0];
    if(file){
      const path=`DEALZUS/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.fireStorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.photoUrl=url;
    }
    this.uploadingImg="imgUploaded";
    this.clientPhoto.patchValue({
      img:this.photoUrl
    })
  }
  //----------------------------------------------

  // --------------- submit form -----------------
  submit(){
    if(this.mainControl=="add"){
      this.dataServ.create(this.clientPhoto.value,"allClients","",this.mainControl).subscribe(()=>{
        setTimeout(()=> location.reload() , 600)
      })
    }else {
      this.clientPhoto.patchValue({
        id:this.globalObject.id
      })
      this.dataServ.create(this.clientPhoto.value,"allClients",this.globalKey,this.mainControl).subscribe(()=>{
        setTimeout(()=> location.reload() , 600)
      })
    }
  }
  //---------------------------------------------

  // -------- find item for Edit or Delete --------
  findItem(item:any , typeOfAction:string){
    this.dataServ.getAllClients().subscribe((data):any =>{
      for (const key in data) {
        if(item.id==data[key].id){
          this.globalObject=data[key];
          this.globalKey=key;
          this.viewControl(typeOfAction);
          break;
        }
      }
      console.log(this.globalObject.img)
    })
  }
  //---------------------------------------------

  // --------- to impelement the deletion ---------
  deleteTheItem(){
    // this.dataServ.delete("allClients",this.globalKey).subscribe(()=>{
    //   setTimeout(()=> location.reload() , 600)
    // })
     this.fireStorage.storage.refFromURL(this.globalObject.img).delete()

  }
  //---------------------------------------------


}
