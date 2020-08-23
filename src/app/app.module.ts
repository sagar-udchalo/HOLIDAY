import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms'

import { StepperComponent } from './stepper/stepper.component'

import { BookingService } from './booking.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DayPlanComponent } from './day-plan/day-plan.component';
import { HotelComponent } from './hotel/hotel.component';
import { CabComponent } from './cab/cab.component';
import { SummaryComponent } from './summary/summary.component';
import { TravelComponent } from './travel/travel.component';
import { AddTravellerComponent } from './add-traveller/add-traveller.component'

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    DayPlanComponent,
    HotelComponent,
    CabComponent,
    SummaryComponent,
    TravelComponent,
    AddTravellerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
