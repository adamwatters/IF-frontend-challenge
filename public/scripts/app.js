
;(function(){

	var cardArray = []
	$.ajax({
		async: false,
		dataType: "json",
		url: "/data",
		success: function(cards) {
			cardArray = cards.data;
		}
	});

	var groupedData = cardArray.reduce(function(previousValue, currentValue, index){
		if(previousValue[Math.floor(index/3)]){
			previousValue[Math.floor(index/3)].push(currentValue)
			return previousValue;
		}
		previousValue[Math.floor(index/3)] = [];
		previousValue[Math.floor(index/3)].push(currentValue);
		return previousValue
	}, [])

	var app = angular.module('deckViewer',[]);

	app.factory('Data', function(){
		return {state: false, set: groupedData,setIndex: null, cardIndex: null};
	})

	app.controller('DeckController', function(Data){
		this.sets = Data.set;
		this.modalCard;
		this.showModal = false;

		this.modalClick = function(){
			this.showModal = false;
		}

		this.handleClick = function(topIndex, index, parentIndex){
			if(topIndex === index) {
				this.modalCard = this.sets[parentIndex][index]
				this.showModal = true;
			}	
		};


	});

	app.controller('SetController', function(Data){

		this.topIndex = 0;
		this.middleIndex = 1;
		this.bottomIndex = 2;

		this.getSetIndex = function(index){
			this.saveIndex = index;
		},

		this.handleClick = function(index){
			if(this.topIndex !== index) {
				this.makeTop(index);
			}
		};

		this.callModel = function(index, parentIndex){
			Data.cardIndex = index;
			Data.setIndex = parentIndex;
			Data.state = true;
		};

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




