import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse,HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-day-plan',
  templateUrl: './day-plan.component.html',
  styleUrls: ['./day-plan.component.scss']
})
export class DayPlanComponent implements OnInit {

	public dayPlanData = {}

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

  	let id = this.route.snapshot.paramMap.get('id')
  	console.log(id)
  	console.log("ok")

    this.http.get("assets/data/PackageDay.json").subscribe((data:any) => {
    let filtered = data.filter(pack => pack.id == id)
    this.dayPlanData = filtered[0];
    console.log(this.dayPlanData)

  })
  }

}
