import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  //PRICES
  start = 0
  end = 0
  cab = 0
  hotel = 0
  hotelIds = []
  finalHotels = []
  noOfTravellers = 1

  //child data
  USERPrice = 0
  packagePrice = 0
  hotelPrice = 0
  totalHotelPrice = 0
  totalPrice = 0
  noOfRooms = 2
  neededRooms = 1
  neededCabs = 0

  travellersDetails = []
  travelDetails = {}
  cabDetails = ""
  whole = {}
  summary = {
    cab: {

    },
    selectedStartValue: {

    },
    selectedEndValue: {

    }
  }

	public packages = {}
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

  	let id = this.route.snapshot.paramMap.get('id')
  	console.log(id)
  	console.log("ok")

    this.http.get("assets/data/PackageDay.json").subscribe((data:any) => {
    console.log(data)
    let filtered = data.filter(pack => pack.id == id)
    console.log("f",filtered[0])
    this.packages = filtered[0];

  })

    this.http.get("assets/data/PackageHotel.json").subscribe((data:any) => {
    let filtered = data.filter((pack) => pack.id == id)
    console.log("f",filtered[0].hotels)
    filtered = filtered[0]
    for(let i = 0; i < filtered.hotels.length; i++)
      this.hotelIds.push(filtered.hotels[i].hotel)
    })

    this.http.get("assets/data/Hotel.json").subscribe((data:any) => {

      for(let j = 0;j < data.length;j++) {
        for(let k = 0;k < this.hotelIds.length; k++) {
          if(data[j].id == this.hotelIds[k]) {
            //this.finalHotels.push(data[j])
            this.hotelPrice += data[j].cost
          }
        }
      }
      //console.log(this.finalHotels)
      this.totalHotelPrice = this.hotelPrice
      this.updateCOSTprice()
    })

  }

  setTravellersDetails(data) {
    this.travellersDetails = data
    this.noOfTravellers = data.length
    this.neededRooms = Math.ceil(this.noOfTravellers/this.noOfRooms)
    //console.log("TTT", this.travellersDetails)
    console.log(this.hotelPrice, Math.ceil(this.noOfTravellers/this.noOfRooms))
    this.totalHotelPrice = (this.hotelPrice*Math.ceil(this.noOfTravellers/this.noOfRooms))
    this.updateCOSTprice()
  }

  setTravelDetails(data) {
    this.travelDetails = data
    if(!isNaN(data.selectedStartValue.fcost)) {
      this.start = data.selectedStartValue.fcost
    }
    
    if(!isNaN(data.selectedEndValue.fcost)) {
      this.end = data.selectedEndValue.fcost 
    }
    this.updateCost()
    this.updateCOSTprice()
    console.log(data.selectedStartValue.fcost, data.selectedEndValue.fcost)
  }

  setCabDetails(data) {
    console.log(data)
    this.cabDetails = data.cid
    console.log(this.cabDetails)
    if(!isNaN(data.cost)) {
      this.neededCabs = Math.ceil(this.noOfTravellers/data.seater)
      this.cab = this.neededCabs*data.cost
      console.log(this.cab, this.neededCabs)
    }
    this.updateCost()
    this.updateCOSTprice()

    this.http.get("assets/data/Car.json").subscribe((cabRes:any) => {
      console.log(this.cabDetails)
      let tempCabs = cabRes.filter(cab => cab.id == this.cabDetails)
      this.summary.cab = tempCabs[0]
      console.log("cabs", this.summary.cab)
      this.whole = {
      travellersDetails : this.travellersDetails,
      travelDetails : this.travelDetails,
      cabDetails : this.summary.cab
    }
    })
  }

  updateCost() {
    this.packagePrice = this.start + this.end
  }

  updateCOSTprice() {
    this.USERPrice = this.packagePrice*this.noOfTravellers + this.cab + this.totalHotelPrice
  }

}
