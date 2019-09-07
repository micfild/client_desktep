import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../../entity/event";
import {Free} from "../../entity/free";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  listEvents : Array<Event>;
  listFreeTime : Array<Free>;
  listEventEmitter = new EventEmitter<Array<Event>>();

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
          // console.log(this.listEvents);
          this.listEventEmitter.emit(this.listEvents);
      })
  }

  //http://127.0.0.1:8000/api/event/free?start=2019-08-27&end=2019-08-29

  getFreeTime(): void {
    this.listFreeTime = [];
    this.httpClient.get('http://127.0.0.1:8000/api/event/free?start=2019-09-05&end=2019-09-07')
      .subscribe((result : any) =>{
        for(let free of JSON.parse(result)){
          this.listFreeTime.push(Object.assign(new Free(), free));
          console.log(Object.assign(new Free(), free));
        }
        console.log(this.listFreeTime);

      })
  }

  setNewEvent(event): void {
    console.log("setevent");
    console.log(event);
    const jsonEvent = {
      "summary": event.title ,
      "start": {
        "dateTime": this.ISODateString(event.start._d)
      },
      "end": {
        "dateTime": this.ISODateString(event.end._d)
      },
      "recurence": {
        "__initializer__": null,
        "__cloner__": null,
        "__isInitialized__": true
      },
      "attendees": [],
      "reminder": {
        "overrides": []

      },
      "user": "\/api\/users\/2"
    }


    console.log(jsonEvent)
    this.httpClient.post('http://localhost:8000/api/events', jsonEvent )
      .subscribe((result) => {
        console.log(result);
      });
  }

  ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())}
}
