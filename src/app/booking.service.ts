import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  	constructor(private http: HttpClient) { }

  	getPackage(id) {
  		console.log(id)
  		return this.http.get('/assets/data/Package-day.json')

  	}
}
