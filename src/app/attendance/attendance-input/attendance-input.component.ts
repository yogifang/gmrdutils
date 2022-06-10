import { Component, OnDestroy, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';


@Component({
  selector: 'app-attendance-input',
  templateUrl: './attendance-input.component.html',
  styleUrls: ['./attendance-input.component.scss'],

})




export class AttendanceInputComponent implements OnDestroy {

 allPerson: number = 10 ;
 special: number = 0 ;
 sick: number = 0;
 business: number = 0 ;
 real: number = 0 ;


 subject = webSocket('ws://192.168.1.212:1880/attendance');
 title = 'socketrv';



 constructor() {

}
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }




inputChanged(event: any): void {
  console.log(event.target.name );
  console.log(event.target.value);
  switch (event.target.name) {
    case 'all' :
      this.allPerson = event.target.value;
      break ;
    case 'special' :
      this.special = event.target.value;
      break ;
    case 'sick' :
      this.sick = event.target.value;
      break ;
    case 'business' :
      this.business = event.target.value;
      break ;
    default :
      break ;
  }

  this.real = this.allPerson - this.special - this.sick - this.business;
  console.log(this.real);

}


sendMsg(data:string) {

  this.subject.subscribe();
  this.subject.next(data);
  console.log(data);
  this.subject.complete();
}

 sendData(data: any): void {

  this.real = this.allPerson - this.special - this.sick - this.business;
  let strMqtt = JSON.stringify({allPerson: this.allPerson, special: this.special, sick: this.sick, business: this.business, real: this.real});

  this.sendMsg(strMqtt);


 }

}
