import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import{HomePage} from '../home/home';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city:string;
  country:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {
    //If location not null set new location else the location will be defaul location
    this.storage.get('location').then((val)=>{
      if (val !=null){
        let location=JSON.parse(val);
        this.city=location.city;
        this.country=location.country;
      }else{
        this.city='Chicago';
        this.country='US';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  //Save user input and save it to storage
  saveForm(){
    let location={
      city: this.city,
      country: this.country
    }
    this.storage.set('location',JSON.stringify(location));
    this.navCtrl.push(HomePage);
  }
}
