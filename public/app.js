
var app = angular.module('deckViewer',[]);

app.factory('Data', function(){
	return {sets:[['one','two','three'],['one','two','three']]}
});

app.controller('DeckController', ['Data', function(Data){
	this.sets = Data.sets;
}]);

app.controller('SetController', function(){
	this.topIndex = 0;
	this.middleIndex = 1;
	this.bottomIndex = 2;

	this.handleClick = function(index){
		if(this.topIndex === index) {
			this.callModel(index);
		} else {
			this.makeTop(index);
		}
	};

	this.callModel = function(){
		console.log('top-clicked')
	}

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

app.controller('CardController', function(){

});