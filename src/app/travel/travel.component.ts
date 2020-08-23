import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {

	from = "mumbai"
	to = "delhi"
	selectedStartValue = {}
	selectedEndValue = {}
	packages = {}
	selectedDate = new Date("2020-09-10")
	endDate = new Date("2020-09-10")

  @Output() eventEmitterTravel = new EventEmitter()

	availTrainsStart = {}
	availFlightsStart = {}

	availTrainsEnd = {}
	availFlightsEnd = {}

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
  	
  }

  ngOnInit(): void {
    //GET CURRENT PACKAGE
    let id = this.route.snapshot.paramMap.get('id')
    console.log(id)
    console.log("ok")

    this.http.get("assets/data/PackageDay.json").subscribe((data:any )=> {
    let filtered = data.filter(pack => pack.id == id)
    //console.log("f",filtered[0])
    this.packages = filtered[0];
    console.log("PACKAGE", this.packages)
    this.endDate.setDate(this.selectedDate.getDate() + (filtered[0].duration - 1))
    console.log(this.endDate)
    })

    //  GET START AVAILABLE FLIGHTS
    this.http.get("assets/data/Flight.json").subscribe((flightRes:any) => {
      let tempFlights = flightRes.filter((flight) => {
      //console.log(flight, "yr")
        return (flight.from == this.from && flight.to == this.to)
      })
      console.log(tempFlights)
      let d = new Date()
      let tempFlights1 = tempFlights.filter(flight => {
        d = new Date(flight.dateTime)
        console.log(d.toDateString(), this.selectedDate.toDateString())
        return d.toDateString() == this.selectedDate.toDateString()
      })
      this.availFlightsStart = tempFlights1[0]
      console.log("flights", this.availFlightsStart)
    
      let tempFlights4 = flightRes.filter(flight => flight.to == this.from && flight.from == this.to)
      
      let tempFlights2 = tempFlights4.filter(flight => {
        d = new Date(flight.dateTime)
        //console.log(d.toDateString() == this.endDate.toDateString())
        return d.toDateString() == this.endDate.toDateString()
      })
      this.availFlightsEnd = tempFlights2[0]
      
      console.log("flightsend", this.availFlightsEnd)
    })

    //  GET START AVAILABLE TRAINS
    this.http.get("assets/data/Train.json").subscribe((trainRes:any) => {
      let tempTrains = trainRes.filter(train => {
        return train.from == this.from && train.to == this.to
      })
      
      let d = new Date()
      let tempTrains1 = tempTrains.filter(train => {
        d = new Date(train.dateTime)
        return d.toDateString() == this.selectedDate.toDateString()
      })
      this.availTrainsStart = tempTrains1[0]
      console.log("trainsStart", this.availTrainsStart)

      let tempTrains4 = trainRes.filter(train => {
        return train.from == this.to && train.to == this.from
      })
      
      let tempTrains2 = tempTrains4.filter(train => {
        d = new Date(train.dateTime)
        return d.toDateString() == this.endDate.toDateString()
      })
      this.availTrainsEnd = tempTrains2[0]
      console.log("trainsEnd", this.availTrainsEnd)
    })

  }

	selectedStart(fid, fcost) {
		this.selectedStartValue = {
      fid: fid,
      fcost: fcost
    }
    //  EVENT EMIT
    this.eventEmitterTravel.emit({
      selectedStartValue: this.selectedStartValue,
      selectedEndValue: this.selectedEndValue
    })
		console.log(this.selectedStartValue, "sS")
	}

	selectedEnd(fid, fcost) {
		this.selectedEndValue = {
      fid: fid,
      fcost: fcost
    }
    //  EVENT EMIT
    this.eventEmitterTravel.emit({
      selectedStartValue: this.selectedStartValue,
      selectedEndValue: this.selectedEndValue
    })
		console.log(this.selectedEndValue, "sE")
	}

  saveTravelDetails() {
    this.eventEmitterTravel.emit({
      selectedStartValue: this.selectedStartValue,
      selectedEndValue: this.selectedEndValue
    })
  }

}