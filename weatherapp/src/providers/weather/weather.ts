
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';


/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  APIKEY='36efd94c3d17f17ee29ab770c1d9948c';
  url;
 

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    //Uses "weather" call to pull the information about weather
    this.url='http://api.openweathermap.org/data/2.5/weather?q=';
  
  }
 

  getWeatherInfo(city,country){
    return this.http.get(this.url + city +','+country+'&units=imperial'+'&appid='+this.APIKEY)
    
    .map(res=>res.json());
  } 
} 


  

