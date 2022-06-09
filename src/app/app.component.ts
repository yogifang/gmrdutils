import { Component , OnInit } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = '金戰神';

  bSearchParts: boolean = false;
  bBuildBom:boolean = false;
  bAttendance: boolean = false;

OnInit() {
  const firebaseConfig = {
    apiKey: "AIzaSyD927snLjyxnj6CwIr_p5JFmq_6_vI99Ec",
    authDomain: "gmrdutils.firebaseapp.com",
    projectId: "gmrdutils",
    storageBucket: "gmrdutils.appspot.com",
    messagingSenderId: "208859251358",
    appId: "1:208859251358:web:1240c0bec762ee55e0718f",
    measurementId: "G-PJZ0VW7S1H"
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
}

  clearAllButtons () {
    this.bSearchParts = false;
    this.bBuildBom = false;
    this.bAttendance = false;
  }
  clickSearch(event:any) {
    this.clearAllButtons();
    this.bSearchParts = true;
     console.log(event);
  }

  clickBuildBom(event: any) {
    this.clearAllButtons();
    this.bBuildBom = true;
    console.log(this.bBuildBom);
  }

  clickAttendanceInput(event: any) {
    this.clearAllButtons();
    this.bAttendance = true;
    console.log(event);
  }

}
