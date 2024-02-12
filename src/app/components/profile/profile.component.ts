import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile:any| undefined;
  repos: any| undefined;
  username:any | undefined;
  post:any;
  page:number=1;
  count:number=0;
  tablesize:number=10;
  tablesizes:any=[5,10,15,20];


  constructor(private profileService: ProfileService) { 

  }
  // postlist(){
  //   this.profileService.getProfileInfo().subscribe((response)=>this.post=response);
  //   console.log(this.post);
    
  // }
  onTableDataChange(event:any){
    this.page=event
this.findProfile()
  }
  onTableSizeChange(event:any){
this.tablesize=event.target.value;
this.page=1;
this.findProfile()
  }
  findProfile(){
  	this.profileService.updateProfile(this.username);
  	this.profileService.getProfileInfo().subscribe(profile => {
  		console.log(profile);
  		this.profile = profile;
  	});

  	this.profileService.getProfileRepos().subscribe(repos => {
  		console.log(repos);
  		this.repos = repos;
  	})  	
  }

  ngOnInit() {
    this.findProfile();
  }

}