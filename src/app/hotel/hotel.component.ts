import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

	rating = 5

	hotelIds = []
	finalHotels = []

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
  	
  }

  ngOnInit(): void {

  	let id = this.route.snapshot.paramMap.get('id')
    console.log(id)
    console.log("ok")

    this.http.get("assets/data/PackageHotel.json").subscribe((data:any) => {
    let filtered = data.filter((pack) => pack.id == id && pack.rating == this.rating)
    console.log("f",filtered[0].hotels)
    filtered = filtered[0]
    for(let i = 0; i < filtered.hotels.length; i++)
    	this.hotelIds.push(filtered.hotels[i].hotel)
    })

    this.http.get("assets/data/Hotel.json").subscribe((data:any) => {

    	for(let j = 0;j < data.length;j++) {
    		for(let k = 0;k < this.hotelIds.length; k++) {
    			if(data[j].id == this.hotelIds[k]) {
    				this.finalHotels.push(data[j])
    			}
    		}
    	}
    	console.log(this.finalHotels)
    })

  }

}
