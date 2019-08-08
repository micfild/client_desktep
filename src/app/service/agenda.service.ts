import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../../entity/event";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  listEvents : Array<Event>;
  constructor(private httpClient: HttpClient) {
    this.getEvents();
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
}
