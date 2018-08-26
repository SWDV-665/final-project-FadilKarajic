import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import{HomePage} from '../../pages/home/home';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {
  city:string;
  country:string;
  constructor(public alertCtrl: AlertController,private storage:Storage) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(location) {
    const prompt = this.alertCtrl.create({
      title: location ? 'Edit Location' : 'Change Location',
      message: location ? "Please edit location..." : "Please enter location...",
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
          handler: location => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: location => {
            console.log('Saved clicked', location);
            this.storage.get('location').then((val)=>{
              if (val !=null){
                let location={
                  city: this.city,
                  country: this.country
                }
              }else{
                this.city='Chicago';
                this.country='US';
              }
            });

          }
        }
      ]
    });
    prompt.present();
  }
}
