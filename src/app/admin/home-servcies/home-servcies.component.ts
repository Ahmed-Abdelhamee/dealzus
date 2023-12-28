import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { homeClients } from 'src/app/interfaces/homeClients.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home-servcies',
  templateUrl: './home-servcies.component.html',
  styleUrls: ['./home-servcies.component.scss']
})
export class HomeServciesComponent implements OnInit {
  // variables for control view and data 
  uploadingImg:string="";
  mainControl:string="add";
  // variables for data 
  homeServicePhoto=this.formBuilder.group({
    img:[""],
    id:[new Date().getTime()]
  })
  photoUrl:any="";
  listArray:homeClients[]=[]; // for showing the data
  // item key in database
  globalKey:string="";
  globalObject:any;

  constructor(private formBuilder:FormBuilder , private fireStorage:AngularFireStorage,private dataServ:DataService) {
    dataServ.getdata("homeServicesPhotoo").subscribe(data =>{
      for (const key in data) {
        this.listArray.push(data[key])
      }
      console.log(this.listArray)
    })
   }

  ngOnInit(): void {
  }

  // ------------- control the show ---------------
  viewControl(mainControl:string){
    this.mainControl=mainControl;
    this.photoUrl=""
  }
  //----------------------------------------------
  getData(){
    this.listArray=[];
    this.dataServ.getdata("homeServicesPhotoo").subscribe(data =>{
      for (const key in data) {
        this.listArray.push(data[key])
      }
    })
  }
  
  // ------------- uploading File ---------------
  uploadingFile(event:any){
    // this.uploadingImg="uploadingImg";
    // const file=event.target.files[0];
    // if(file){
    //   const path=`DEALZUS/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
    //   const uploadTask = await this.fireStorage.upload(path,file)
    //   const url =await uploadTask.ref.getDownloadURL()
    //   this.photoUrl=url;
    // }
    // this.uploadingImg="imgUploaded";
    // this.homeServicePhoto.patchValue({
    //   img:this.photoUrl
    // })
    this.uploadingImg="uploadingImg" ; // waiting untill get the link
    let loader=new FileReader();
    loader.readAsDataURL(event.target.files[0])
    loader.onload=(event)=>{
      this.photoUrl= event.target?.result;
    }
    this.uploadingImg="imgUploaded"; // waiting untill get the link
  }
  //----------------------------------------------

  // --------------- submit form -----------------
  submit(){
    this.homeServicePhoto.patchValue({
      img:this.photoUrl
    })
    console.log(this.homeServicePhoto.value)
    this.dataServ.create(this.homeServicePhoto.value,"homeServicesPhotoo","",this.mainControl).subscribe(()=>{
      this.getData()
      this.mainControl="showData";
    })
    // if(this.mainControl=="change-home-photo"){
    //   this.dataServ.create(this.homeServicePhoto.value,"homeServicesPhotoo","",this.mainControl).subscribe(()=>{
    //     this.getData()
    //     this.mainControl="showData";
    //   })
    // }else {
    //   this.homeServicePhoto.patchValue({
    //     id:this.globalObject.id
    //   })
    //   if(this.photoUrl==""){
    //     this.homeServicePhoto.patchValue({
    //       img:this.globalObject.img
    //     })
    //   }
    //   if(this.photoUrl!="")
    //     this.fireStorage.storage.refFromURL(this.globalObject.img!).delete()
    //     this.dataServ.create(this.homeServicePhoto.value,"homeServicesPhotoo",this.globalKey,this.mainControl).subscribe(()=>{
    //       this.getData()
    //       this.mainControl="showData";
    //     })
    //   }
  }
  //---------------------------------------------

  // -------- find item for Edit or Delete --------
  findItem(item:any , typeOfAction:string){
    this.dataServ.getdata("homeServicesPhotoo").subscribe((data):any =>{
      for (const key in data) {
        if(item.id==data[key].id){
          this.globalObject=data[key];
          this.globalKey=key;
          this.viewControl(typeOfAction);
          break;
        }
      }
    })
  }
  //---------------------------------------------

  // --------- to impelement the deletion ---------
  deleteTheItem(){
     this.dataServ.delete("homeServicesPhotoo",this.globalKey).subscribe(()=>{
      this.getData()
      this.mainControl="showData";
      this.fireStorage.storage.refFromURL(this.globalObject.img).delete()
    })

  }
  //---------------------------------------------


}
