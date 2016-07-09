import Ember from 'ember';

const { computed, Controller, RSVP, run } = Ember;

export default Controller.extend({
   items: Ember.computed(function() {
		let arr = [];
		for (let i = 0; i < 1000; i++) {
			arr.push(i);
		}
		return Ember.A(arr);
   }),
   items2: [],

   loadedPages: {},
   PAGE_SIZE: 50,
   length: 50000,
   actions: {
   	getAtIndex(index) {
   		let pageNumber = Math.floor(index / this.PAGE_SIZE);
   		let page = this.loadedPages[pageNumber];
   		if (page) {
   			return new RSVP.Promise((resolve,reject) => resolve(page[index % this.PAGE_SIZE]));
   		} else if (page !== null) {
   			return this.fetchPage(pageNumber,index)
   		} else {
   			return new RSVP.Promise((resolve,reject) => {
   				run.later(this,function() {
   					let pageOffset = pageNumber * this.PAGE_SIZE;
   					console.log(this.loadedPages[pageNumber][index - pageOffset]);
   					resolve(this.loadedPages[pageNumber][index - pageOffset]);
   				},300);
   			});
   		}
   		
   	}
   },
   fetchPage(pageNumber,index) {
   	this.loadedPages[pageNumber] = null;
   	return new RSVP.Promise((resolve,reject) => {
   		run.later(this,function() {
	   		this.loadedPages[pageNumber] = [];
	   		let pageOffset = pageNumber * this.PAGE_SIZE;
	   		for (let i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
	   			this.loadedPages[pageNumber].push(i);
	   		}
	   		console.log(this.loadedPages[pageNumber][index]);
	   		resolve(this.loadedPages[pageNumber][index-pageOffset]);
   		},300);
   	});
   }
})