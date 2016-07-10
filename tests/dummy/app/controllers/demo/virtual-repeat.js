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
   items3: Ember.computed(function() {
   	let selectedYear = 0;
    let years = [];
    let items = [];
    var currentYear = new Date().getFullYear();
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    // Build a list of months over 20 years
    for (var y = currentYear; y >= (currentYear-20); y--) {
      years.push(y);
      items.push({year: y, text: y, header: true});
      for (var m = 11; m >= 0; m--) {
        items.push({year: y, month: m, text: monthNames[m]});
      }
    }
    this.set('years',years);
    return Ember.Object.create({items: items, years: Ember.A(years)});
   }),
   infiniteItems: Ember.A([]),
   loadedPages: {},
   PAGE_SIZE: 50,
   scrollIndex: 0,
   yearIndex: 0,
   length: 50000,
   actions: {
    fetchMore() {
      let arr = this.get('infiniteItems');
     
      let length = arr.get('length');
      for (let i = length; i < length + 50; i++) {
        arr.pushObject(i);
      }
      
      //arr.push(arr1[arr.length]);
    },
   	scrollTo(selected) {
   		this.set('selected',selected);
   		
   		this.set('scrollIndex',this.get('years').indexOf(selected) * 13);
   		
   	},
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