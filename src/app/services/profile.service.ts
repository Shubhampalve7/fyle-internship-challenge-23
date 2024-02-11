import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private username:string;
  private clientid = 'f3571d8e55e169540825';
  private clientsecret = 'a6c2b7d8f7c691e771b1908873e1322028e097c4';

  constructor(private httpClient:HttpClient) { 
  	console.log("service is now ready!");
  	this.username = 'kirandash';
  }

  getProfileInfo(){
  	return this.httpClient.get(`https://api.github.com/users/${this.username}`);
  	
  }

  getProfileRepos(){
  	return this.httpClient.get("https://api.github.com/users/" + this.username + "/repos?client_id=" + this.clientid + "&client_secret=" + this.clientsecret)
  	
  }

  updateProfile(username:string){
  	this.username = username;
  }

}