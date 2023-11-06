import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/admin/services/data.service';
import { homeClients } from 'src/app/interfaces/homeClients.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientPhotoArray:homeClients[]=[]
  
  constructor(private dataServ:DataService) {
    dataServ.getHomeClients().subscribe(data =>{
      for (const key in data) {
        this.clientPhotoArray.push(data[key])
      }
    })
  }

  ngOnInit(): void {
  }

}
