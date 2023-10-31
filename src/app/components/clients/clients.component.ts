import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showImage:boolean=false;

  image_Show_Link:string="";

  clientsList:string[]=["assets/1.webp","assets/2.webp","assets/3.webp","assets/4.webp","assets/1.webp","assets/2.webp","assets/3.webp","assets/4.webp"]

  show(item:string){
    this.showImage=true;
    this.image_Show_Link=item;
  }

  close(){
    this.showImage=false;
  }

  left(item:string){
    if( this.clientsList.indexOf(item) < this.clientsList.length - 1 ){
      this.image_Show_Link = this.clientsList[this.clientsList.indexOf(item) + 1] ;
    }
    else
      this.image_Show_Link = this.clientsList[0]
  }

  right(item:string){
    if( this.clientsList.indexOf(item) == 0 ){
      this.image_Show_Link = this.clientsList[this.clientsList.length-1] ;
    }else{
      this.image_Show_Link = this.clientsList[this.clientsList.indexOf(item) - 1] ;
    }
  }
  
}
