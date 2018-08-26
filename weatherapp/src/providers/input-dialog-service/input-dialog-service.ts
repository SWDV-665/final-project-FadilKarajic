//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
//import{HomePage} from '../../pages/home/home';
//import { NavController} from 'ionic-angular';
/*
Needs work, need to figure out how to pass location object to local storage
*/

@Injectable()
export class InputDialogServiceProvider {
  city:string;
  country:string;
  constructor(public localStorage:Storage,public alertCtrl: AlertController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(location) {
    const prompt = this.alertCtrl.create({
      title:'Change Location',
      message:"Please enter location...",
      inputs: [
        {
          name: 'name',
          placeholder: 'City Name',
          value: location ? location.city : null
        },
        {
          name: 'location',
          placeholder: 'Country Name',
          value: location ? location.country : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: location => {
            console.log('Saved clicked', location);
            this.localStorage.set('location',JSON.stringify(location));
          }
        }
      ]
    });
    prompt.present();
  }
}
