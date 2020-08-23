import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cab',
  templateUrl: './cab.component.html',
  styleUrls: ['./cab.component.scss']
})
export class CabComponent implements OnInit {

  from = "delhi"
	to = "kerala"
	selectedDate = new Date("2020-09-10")
	availCabs = []
	selectedCabValue = ""

  @Output() eventEmitterCabs = new EventEmitter()

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

  	//	GET AVAILABLE CABS
  	this.http.get("assets/data/Car.json").subscribe((cabRes:any) => {
    	let tempCabs = cabRes.filter(cab => cab.location == this.to)
    	this.availCabs = tempCabs
    	console.log("cabs", tempCabs)
    })

}

	selectedCab(cid, cost,seater) {
		this.selectedCabValue  = cid
    this.eventEmitterCabs.emit({
      cid: cid,
      cost:cost,
      seater: seater
    })
		console.log(this.selectedCabValue)
	}

  saveCabDetails() {
    this.eventEmitterCabs.emit(this.selectedCabValue)
  }

}
