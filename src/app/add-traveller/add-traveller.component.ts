import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-traveller',
  templateUrl: './add-traveller.component.html',
  styleUrls: ['./add-traveller.component.scss']
})
export class AddTravellerComponent implements OnInit {

	travellers = []
	userFullName = ""
	contact:number
	age:number
	@Output() eventEmitterT = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  addUser() {
  	let user = {
  		userFullName: this.userFullName,
  		contact: this.contact,
  		age: this.age
  	}
  	if(this.userFullName != "" && this.age >-1) {
  		this.travellers.push(user)
  	}
  	console.log(this.travellers)
  	this.userFullName = ""
  	this.age = null
  	this.contact = null
  }

  deleteUser(userFN) {
  	console.log(userFN)
  	this.travellers = this.travellers.filter((user) => user.userFullName != userFN)
  }

  saveTravellersToParent() {
  	this.eventEmitterT.emit(this.travellers)
  }

}
