import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { AuthRouteGuard } from './guards/auth-route.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedRouteGuard } from './guards/unauth-route.guard';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import {
  AlbumComponent,
  AlbumPhotosDialog,
} from './components/album/album.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AlbumComponent,
    AlbumPhotosDialog,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule,
  ],
  providers: [AuthRouteGuard, UnauthorizedRouteGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
