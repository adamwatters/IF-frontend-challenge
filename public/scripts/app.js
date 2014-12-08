
;(function(){

	var cardArray = []
	$.ajax({
		async: false,
		dataType: "json",
		url: "/data",
		success: function(cards) {
			cardArray = cards.data;
		},
		error: function() {
			console.log("error on card data request");
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

	console.log(groupedData);

	var app = angular.module('deckViewer',[]);

	app.factory('Data', function(){
		return {state: false, set: groupedData,setIndex: null, cardIndex: null};
	})

	app.controller('DeckController', function(Data){
		this.sets = Data.set;
	});

	app.controller('ModalController', function(Data){

		this.test = function() {
			console.log(Data.state, Data.setIndex, Data.cardIndex);
		}

	})

	app.controller('SetController', function(Data){

		this.topIndex = 0;
		this.middleIndex = 1;
		this.bottomIndex = 2;

		this.getSetIndex = function(index){
			this.saveIndex = index;
		},

		this.handleClick = function(index, parentIndex){
			if(this.topIndex === index) {
				this.callModel(index, parentIndex);
			} else {
				this.makeTop(index);
			}
		};

		this.callModel = function(index, parentIndex){
			Data.cardIndex = index;
			Data.setIndex = parentIndex;
			console.log('call model');
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




