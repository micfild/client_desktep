import { Component } from '@angular/core';
import {AgendaService} from "./service/agenda.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-desktop';

  constructor(public agendaService: AgendaService) {}
}
