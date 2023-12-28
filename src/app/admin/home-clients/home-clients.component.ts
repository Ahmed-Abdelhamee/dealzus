import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';  // we write this special code for upload img 
import { DataService } from '../services/data.service';
import { homeClients } from 'src/app/interfaces/homeClients.interface';

@Component({
  selector: 'app-home-clients',
  templateUrl: './home-clients.component.html',
  styleUrls: ['./home-clients.component.scss']
})
export class HomeClientsComponent implements OnInit {

  // variables for control view and data 
  uploadingImg:string="";
  mainControl:string="showData";
  // variables for data 
  clientPhoto=this.formBuilder.group({
    img:[""],
    id:[new Date().getTime()]
  })
  photoUrl:string="";
  listArray:homeClients[]=[];
  // item key in database
  globalKey:string="";
  globalObject:any;

  constructor(private formBuilder:FormBuilder , private fireStorage:AngularFireStorage,private dataServ:DataService) {
    this.dataServ.getdata("homeClients").subscribe(data =>{
      for (const key in data) {
        this.listArray.push(data[key])
      }
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
    this.listArray=[]
    this.dataServ.getdata("homeClients").subscribe(data =>{
      for (const key in data) {
        this.listArray.push(data[key])
      }
    })
  }
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
      this.dataServ.create(this.clientPhoto.value,"homeClients","",this.mainControl).subscribe(()=>{
        this.getData()
        this.mainControl="showData";
      })
    }else {
      this.clientPhoto.patchValue({
        id:this.globalObject.id
      })
      if(this.photoUrl==""){
        this.clientPhoto.patchValue({
          img:this.globalObject.img
        })
      }
      if(this.photoUrl!="")
      this.fireStorage.storage.refFromURL(this.globalObject.img!).delete()
      this.dataServ.create(this.clientPhoto.value,"homeClients",this.globalKey,this.mainControl).subscribe(()=>{
        this.getData()
        this.mainControl="showData";
      })
    }
  }
  //---------------------------------------------

  // -------- find item for Edit or Delete --------
  findItem(item:any , typeOfAction:string){
    this.photoUrl="" // to reset the link in the photourl when we want to edit an image
    this.dataServ.getdata("homeClients").subscribe((data):any =>{
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
    this.fireStorage.storage.refFromURL(this.globalObject.img!).delete()
    this.dataServ.delete("homeClients",this.globalKey).subscribe(()=>{
      this.getData()
      this.mainControl="showData";
    })
  }
  //---------------------------------------------


}
