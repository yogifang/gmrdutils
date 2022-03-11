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

  clickSearch(event:any) {
    this.bSearchParts = true;
     console.log(event);
  }

}
