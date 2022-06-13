import { Component, OnDestroy, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import * as XLSX from 'xlsx';
type AOA = any[][];
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

 subject1 = webSocket('ws://192.168.1.212:1880/attendance');
 subject2 = webSocket('ws://192.168.1.212:1880/works');

 stockFileName: string = '';
 data: AOA = [[1, 2], [3, 4]];
 updateDate: string ='' ;


 constructor() {

}
  ngOnDestroy(): void {
    this.subject1.unsubscribe();
    this.subject2.unsubscribe();
  }




inputChanged(event: any): void {
  console.log(event.target.name );
  console.log(event.target.value);
  switch (event.target.name) {
    case 'all' :
      this.allPerson = parseInt(event.target.value);
      break ;
    case 'special' :
      this.special = parseInt(event.target.value);
      break ;
    case 'sick' :
      this.sick = parseInt(event.target.value);
      break ;
    case 'business' :
      this.business = parseInt(event.target.value);
      break ;
    default :
      break ;
  }

  this.real = this.allPerson - this.special - this.sick - this.business;
  console.log(this.real);

}


sendMsg(data:string) {

  this.subject1.subscribe();
  this.subject1.next(data);
  console.log(data);
  this.subject1.complete();
}

 sendData(data: any): void {

  this.real = this.allPerson - this.special - this.sick - this.business;
  let strMqtt = JSON.stringify({allPerson: this.allPerson, special: this.special, sick: this.sick, business: this.business, real: this.real});
  this.sendMsg(strMqtt);
  console.log(strMqtt);
 }



 chineseDay(day: number):string {

  switch (day) {
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    case 5:
      return '五';
    case 6:
      return '六';
    case 7:
      return '日';
    default:
      return 'error';

  }

 }


 onFileChange(evt: any) {
  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>(evt.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    /* read workbook */
    const bstr: string = e.target.result;
    this.stockFileName = evt.target.files[0].name ;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const res = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    this.updateDate = res[3].toString();
    this.data = [];
    const today =  new Date();
    const week = this.chineseDay(today.getDay());
    console.log("onload");
    res.map(item => {
      if(item[1] !== undefined && item[1] !== null  && item[1] !== "星期") {
        console.log(item[1]);
        if(item[1] === week ) {
          const resdata:string[] = [item[1], item[3],item[4],item[10]] ;
          this.data.push(resdata);
        }

      }
    })
    let updated = [] ;
    for (let i = 0; i < this.data.length; i += 1) {
      const value1 = this.data[i][0];
      const value2 = this.data[i][1];
      const value3 = this.data[i][2];
      const value4 = this.data[i][3];
      updated.push({ weekday : value1 , serialno : value2 , model : value3 , amount : value4 });
    }
    console.log(updated);
    var myJsonString = JSON.stringify(updated);
   // console.log(this.data);
    console.log(myJsonString);
    this.subject2.subscribe();
    this.subject2.next(myJsonString);
    this.subject2.complete();
  }
  reader.readAsBinaryString(target.files[0]);
}

}
