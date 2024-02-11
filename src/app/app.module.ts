import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ProfileService } from './services/profile.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
// import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
