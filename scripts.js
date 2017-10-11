$(document).ready(()=>{

	const freshDeck = createDeck();
	// console.log(freshDeck);
	var theDeck = [];
	var playersHand = [];
	var dealersHand = [];
	var handInProgress = true;

	
	$('.deal-button').click(()=>{
		$('.hit-button').prop('diabled',false);
		playersHand = [];
		dealersHand = [];
		var newDeck = freshDeck.slice();
		theDeck = shuffleDeck(newDeck);
		// console.log('user clicked deal')
		var topCard = theDeck.shift();
		playersHand.push(topCard);

		topCard = theDeck.shift();
		dealersHand.push(topCard);

		topCard = theDeck.shift();
		playersHand.push(topCard);

		topCard = theDeck.shift();
		dealersHand.push(topCard);

		placeCard('player',1, playersHand[0])
		placeCard('dealer',1, dealersHand[0])
		placeCard('player',2, playersHand[1])
		// placeCard('dealer',2, dealersHand[1])

		calculateTotal(playersHand,'player');
		// calculateTotal(dealersHand,'dealer');
	});
	$('.hit-button').click(()=>{
		if(calculateTotal(playersHand,'player') < 21){
			var topCard = theDeck.shift();

			playersHand.push(topCard);
			placeCard('player',playersHand.length,topCard);
			calculateTotal(playersHand,'player');
			// console.log('user clicked hit')
		}
	});
	$('.stand-button').click(()=>{
		// console.log('user clicked stand')
		placeCard('dealer',2,dealersHand[1])
		$('.hit-button').prop('disabled',true);
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal < 17){
			var topCard = theDeck.shift();
			dealersHand.push(topCard);
			placeCard('dealer',dealersHand.length,topCard);
			dealerTotal = calculateTotal(dealersHand,'dealer');
		}

	});
	function calculateTotal(hand,who){
		var handTotal = 0;
		var thisCardTotal = 0;
		var hasAce = false;
		var totalAces = 0;
		for(let i = 0; i < hand.length; i++){
			thisCardTotal = Number(hand[i].slice(0,-1));

			if(thisCardTotal == 1){
				// this is an Ace!!!
				hasAce = true;
				thisCardTotal = 11;
				totalAces++;
			}else if (thisCardTotal > 10){
				// you have a facecard... reset value to 10
				thisCardTotal = 10;
			}

			handTotal += thisCardTotal;
		}

		for(let i = 0; i < totalAces; i++){
			if(handTotal > 21){
				handTotal -= 10;
			}
		}

		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;
	}
	function placeCard(who,where,card){
		var classSelector = `.${who}-cards .card-${where}`;
		$(classSelector).html(`<img src="cards/${card}.png"/>`)
	}
	
	function createDeck(){
		var newDeck = [];
		const suits = ['h', 's', 'd', 'c']
		for(let s = 0; s < suits.length; s++){
			for(let c = 1; c <= 13; c++){
				newDeck.push(c+suits[s])
			}
		}
		return newDeck;
	}
	function shuffleDeck(arrayToBeShuffled){
		for(let i = 0; i < 500000; i++){
			var rand1 = Math.floor(Math.random() * arrayToBeShuffled.length);
			var rand2 = Math.floor(Math.random() * arrayToBeShuffled.length);
			var saveValueOfCard1 = arrayToBeShuffled[rand1];
			arrayToBeShuffled[rand1] = arrayToBeShuffled[rand2];
			arrayToBeShuffled[rand2] = saveValueOfCard1

		}
		return arrayToBeShuffled;
	}
	$("#reset").click(function() {
    	document.location.reload();

	});
	// if(playersHand > 22){
	// 	document.getElementById('message1').html,"Ravenclaw loses house points!!"
	// }
})
