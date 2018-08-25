import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{WeatherProvider} from '../../providers/weather/weather';
import { CompileStylesheetMetadata } from '../../../node_modules/@angular/compiler';
import{Storage} from '@ionic/storage';
import{SocialSharing} from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { StatisticsProvider } from '../../providers/statistics/statistics';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})


export class HomePage {
  weather:any;
  statistics:any;
  location:{
    city:string,
    country:string
  }
  constructor(public navCtrl: NavController,public weatherProvider: WeatherProvider,private storage:Storage,private socialSharing:SocialSharing,
    private toastCtrl:ToastController, public statisticsProvider :StatisticsProvider) {

  }
  //If there is no location set then set the location city and country
  ionViewWillEnter(){
    this.storage.get('location').then((val)=>{
      if (val !=null){
        this.location=JSON.parse(val);
      }else{
        this.location={
          city:'Chicago',
          country:'US'
        }
      }
      this.weatherProvider.getWeather(this.location.city,this.location.country)
      .subscribe(weather=> {
        console.log(weather);
        this.weather=weather;
      });
      
    });
    }
  ionViewDidEnter(){
    this.storage.get('location').then((val)=>{
      if (val !=null){
        this.location=JSON.parse(val);
      }
      
    this.statisticsProvider.getStatistics(this.location.city,this.location.country)
      .subscribe(statistics=> {
        console.log(statistics);
        this.statistics=statistics;
      });
    });
}
    //Share the weather
    shareItem(weather) {
      console.log("Sharing Item - ", weather);
      const toast = this.toastCtrl.create({
        message: 'Sharing Weather - ' + weather + " ...",
        duration: 3000
      });
  
      toast.present();
  
      let message = "Weather: " + weather;
      let subject = "Shared via Weather app";
  
      this.socialSharing.share(message, subject).then(() => {
        // Sharing via email is possible
        console.log("Shared successfully!");
      }).catch((error) => {
        console.error("Error while sharing ", error);
      });    
  
    }
    
}
