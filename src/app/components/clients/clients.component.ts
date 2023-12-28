import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/admin/services/data.service';
import { homeClients } from 'src/app/interfaces/homeClients.interface';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  
  showImage:boolean=false;

  image_Show_Link:any="";

  clientsList:homeClients[]=[]
  
  constructor(private dataServ:DataService) {
    dataServ.getdata("allClients").subscribe(data =>{
      for (const key in data) {
        this.clientsList.push(data[key])
      }
    })
  }
  
  ngOnInit(): void {
  }


  show(item:homeClients){
    this.showImage=true;
    this.image_Show_Link=item;
  }

  close(){
    this.showImage=false;
  }

  left(item:homeClients){
    if( this.clientsList.indexOf(item) < this.clientsList.length - 1 ){
      this.image_Show_Link = this.clientsList[this.clientsList.indexOf(item) + 1] ;
    }
    else
      this.image_Show_Link = this.clientsList[0]
  }

  right(item:homeClients){
    if( this.clientsList.indexOf(item) == 0 ){
      this.image_Show_Link = this.clientsList[this.clientsList.length-1] ;
    }else{
      this.image_Show_Link = this.clientsList[this.clientsList.indexOf(item) - 1] ;
    }
  }
  
}
