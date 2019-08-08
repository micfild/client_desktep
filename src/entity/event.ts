import {Start} from "./start";
import {End} from "./end";
import {Recurence} from "./recurence";
import {Reminder} from "./reminder";

export class Event {
  id : number;
  summary:	string;
  location:	string;
  description:	string;
  start:	Start;
  end:	End;
  recurence:	Recurence;
  attendees: Array<string>;
  reminder:	Reminder;
  googleId:	string;
  user: string;

  public constructor() {
    this.start = new Start();
    this.end = new End();
    this.recurence = new Recurence();
    this.reminder = new Reminder();
  }
}
