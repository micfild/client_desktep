import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../../entity/event";
import {Free} from "../../entity/free";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  listEvents : Array<Event>;
  listFreeTime : Array<Free>;
  constructor(private httpClient: HttpClient) {
    this.getEvents();
    this.getFreeTime();
  }


  getEvents(): void {
    this.listEvents = [];
    this.httpClient.get('http://localhost:8000/api/events/')
      .subscribe((result : object) =>{

        for(let event of result['hydra:member']){
          this.listEvents.push(Object.assign(new Event(), event));
        }
        console.log(this.listEvents);
      })
  }

  //http://127.0.0.1:8000/api/event/free?start=2019-08-27&end=2019-08-29

  getFreeTime(): void {
    this.listFreeTime = [];
    this.httpClient.get('http://127.0.0.1:8000/api/event/free?start=2019-08-27&end=2019-08-29')
      .subscribe((result : any) =>{
        for(let free of JSON.parse(result)){
          this.listFreeTime.push(Object.assign(new Free(), free));
          console.log(Object.assign(new Free(), free));
        }
        console.log(this.listFreeTime);

      })
  }
}
