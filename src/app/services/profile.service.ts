import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private username: string;
  private clientid = '';
  private clientsecret = '';

  constructor(private httpClient: HttpClient) {
    console.log('service is now ready!');
    this.username = '';
  }

  getProfileInfo() {
    return this.httpClient.get(`https://api.github.com/users/${this.username}`);
  }

  getProfileRepos() {
    return this.httpClient.get(
      'https://api.github.com/users/' + this.username + '/repos?'
    );
  }

  updateProfile(username: string) {
    this.username = username;
  }

  
}
