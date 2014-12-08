
;(function(){

	// Get JSON data from the server
	// TODO: This can be done with Angular $http
	var cardArray = []
	$.ajax({
		async: false,
		dataType: "json",
		url: "/bubbles.json",
		success: function(cards) {
			cardArray = cards.data;
		}
	});

	// Reduce card data (1D Array) to a 2D array with inner arrays of length 3
	var groupedData = cardArray.reduce(function(previousValue, currentValue, index){
		if(previousValue[Math.floor(index/3)]){
			previousValue[Math.floor(index/3)].push(currentValue)
			return previousValue;
		}
		previousValue[Math.floor(index/3)] = [];
		previousValue[Math.floor(index/3)].push(currentValue);
		return previousValue
	}, [])

	// Define angular app
	var app = angular.module('deckViewer',[]);

	// DeckController accepts groupedData (fetched and reduced above) as sets
	// and manages Modal
	// TODO: Find a more logical place to manage Modal
	app.controller('DeckController', function(){
		this.sets = groupedData;
		this.modalCard;
		this.showModal = false;

		// called when open modal is clicked
		this.closeModal = function(){
			this.showModal = false;
		};

		// called on all card clicks, opens modal if clicked card is top
		this.handleClick = function(topIndex, index, parentIndex){
			if(topIndex === index) {
				this.modalCard = this.sets[parentIndex][index]
				this.showModal = true;
			}	
		};
	});

	// SetController manages display order of cards in sets of 3 by reference
	// to their indexs in DeckController.set
	app.controller('SetController', function(){

		// initializes card order in stack
		this.topIndex = 0;
		this.middleIndex = 1;
		this.bottomIndex = 2;

		// called on all card clicks, recieves index (via Angular $index) of clicked card,
		// if index matches current topIndex, call makeTop
		this.handleClick = function(index){
			if(this.topIndex !== index) {
				this.makeTop(index);
			}
		};

		// called by handleClick, swaps index at topIndex with index from card click
		this.makeTop = function(index){
			var helper = this.topIndex;
			this.topIndex = index;
			if (this.topIndex === this.middleIndex) {
				this.middleIndex = helper;
			} else if (this.topIndex === this.bottomIndex) {
				this.bottomIndex = helper;
			}
		};
	});
})();




