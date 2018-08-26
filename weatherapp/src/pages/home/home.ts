import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{WeatherProvider} from '../../providers/weather/weather';
import{Storage} from '@ionic/storage';
import{SocialSharing} from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { StatisticsProvider } from '../../providers/statistics/statistics';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})


export class HomePage {
  currentWeather:any;
  locationInfo:any;
  
  location:{
    city:string,
    country:string
  }
  constructor(public navCtrl: NavController,public weatherProvider: WeatherProvider,private localStorage:Storage,private socialSharing:SocialSharing,
    private toastCtrl:ToastController, public statisticsProvider :StatisticsProvider,public inputDialogService: InputDialogServiceProvider) {

  }
  //Get the location otherwise set the location to default location
  //Uses weather provider
  ionViewWillEnter(){
    this.localStorage.get('location').then((val)=>{
      if (val !=null){
        this.location=JSON.parse(val);
      }else{
        this.location={
          city:'Chicago',
          country:'US'
        }
      }
      this.weatherProvider.getWeatherInfo(this.location.city,this.location.country)
      .subscribe(currentWeather=> {
        console.log(currentWeather);
        this.currentWeather=currentWeather;
      });
      
    });
    }

    //Check location if not null pull info about the location
    //Uses statistics provider - pulls forecast instead of weather
  ionViewDidEnter(){
    this.localStorage.get('location').then((val)=>{
      if (val !=null){
        this.location=JSON.parse(val);
      }
    this.statisticsProvider.getLocationInfo(this.location.city,this.location.country)
      .subscribe(locationInfo=> {
        console.log(locationInfo);
        this.locationInfo=locationInfo;
      });
    });
}
    //Sharing the weather, main temperature, max and min temperatures
    shareWeather(currentWeather) {
      console.log("Sharing Item - ", currentWeather.main.temp+','+currentWeather.main.temp_max+','+currentWeather.main.temp_min);
      const toast = this.toastCtrl.create({
        message: 'Sharing Weather - ' + currentWeather.main.temp + " ...",
        duration: 3000
      });
  
      toast.present();
  
      let message = "Weather: " + currentWeather.main.temp+','+currentWeather.main.temp_max+','+currentWeather.main.temp_min;
      let subject = "Shared via Weather app";
  
      this.socialSharing.share(message, subject).then(() => {
        console.log("Shared successfully!");
      }).catch((error) => {
        console.error("Error while sharing ", error);
      });    
  
    }
    //Not functional
    changeLocation() {
      console.log("Changing location");
      this.inputDialogService.showPrompt(location);
    }
}
