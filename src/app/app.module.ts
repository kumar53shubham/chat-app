import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getDatabase, provideDatabase } from '@angular/fire/database';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment.development';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChatDashboardComponent } from './pages/chat-dashboard/chat-dashboard.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, ChatDashboardComponent, VerifyEmailComponent, HomeComponent, UserListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // provideFirebaseApp(() =>
    //   initializeApp({
    //     projectId: 'chat-app-14980',
    //     appId: '1:840842682790:web:9348df694f79c402bd2f67',
    //     storageBucket: 'chat-app-14980.appspot.com',
    //     apiKey: 'AIzaSyC3VLeiOFMtPXjC9GW06T96NP8C_WLsCEo',
    //     authDomain: 'chat-app-14980.firebaseapp.com',
    //     messagingSenderId: '840842682790',
    //     measurementId: 'G-W65J3V889E',
    //   })
    // ),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar:true,
      progressAnimation:'decreasing' ,
      positionClass:'toast-top-right',
      closeButton:true,
      newestOnTop:true,
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
