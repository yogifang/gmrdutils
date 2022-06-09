import { Component, OnDestroy, OnInit } from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-attendance-input',
  templateUrl: './attendance-input.component.html',
  styleUrls: ['./attendance-input.component.scss']
})




export class AttendanceInputComponent implements OnDestroy {

 allPerson: number = 0 ;
 special: number = 0 ;
 sick: number = 0;
 business: number = 0 ;
 real: number = 0 ;

 private subscription: Subscription;
 public message!: string;

 constructor(private _mqttService: MqttService) {
  this.subscription = this._mqttService.observe('Attendance').subscribe((message: IMqttMessage) => {
    this.message = message.payload.toString();
  });
}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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


public unsafePublish(topic: string, message: string): void {
  this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
}


 sendData(data: any): void {


  var strMqtt:string = JSON.stringify({allPerson: this.allPerson, special: this.special, sick: this.sick, business: this.business, real: this.real});
  this.unsafePublish('Attendance', "strMqtt");
  console.log(strMqtt);

 }

}
