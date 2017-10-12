(function () {
	var dealBtn = document.getElementById('deal');
	var hitBtn = document.getElementById('hit');
	var standBtn = document.getElementById('stand');
	var playAgainBtn = document.getElementById('playAgainBtn');

	var playerCards = document.getElementById('playerCards');
	var dealerCards = document.getElementById('dealerCards');
	
	var scores = document.getElementById('scores');
	var dealerScore = document.getElementById('dealerScore');
	var playerScore = document.getElementById('playerScore');
	
	var playerText = document.getElementById('playertext');
	var dealerText = document.getElementById('dealertext');
	
	

	let dealer = [];
	let player = [];
	
	let dealerTotal = 0;
	let playerTotal = 0;
	let bankValue = 100;
	let playerBet = 0;
	//=================Betting========================
	document.getElementById('bank').innerHTML = bankValue;
	

	//==================DEAL BUTTON====================

	dealBtn.addEventListener('click', function(){
			deck = shuffle();
		console.log(deck);
		playerBet= document.getElementById('bet').valueAsNumber;
		bankValue -= playerBet;
		document.getElementById('bank').innerHTML = bankValue;

			player.push(deck.shift());
			dealer.push(deck.shift());
			player.push(deck.shift());
			dealer.push(deck.shift());
		console.log('player: ', player);


			showCardsOnTable(player[0], playerCards, true);
			showCardsOnTable(player[1], playerCards, true)
			showCardsOnTable(dealer[0], dealerCards, true);
			showCardsOnTable(dealer[1], dealerCards, false);

			var dealerTotal = getHandValue(dealer);
			var playerTotal = getHandValue(player);
			document.getElementById('dealerScore').innerHTML = 'Dealer: ' + getCardValue(dealer[0]);
			document.getElementById('playerScore').innerHTML = 'Player: ' + playerTotal;
			console.log('player: ', playerTotal);
			console.log('dealer: ', dealerTotal);

			dealBtn.classList.add('hidden');
			hitBtn.classList.remove('hidden');
			standBtn.classList.remove('hidden');
			dealerText.classList.remove('hidden');
			playerText.classList.remove('hidden');

			if (dealerTotal === 21 || playerTotal === 21){
				
				document.getElementById('dealerCards').innerHTML='';
				showCardsOnTable(dealer[0], dealerCards, true);
				showCardsOnTable(dealer[1], dealerCards, true);
				dealerTotal = getHandValue(dealer);
				document.getElementById('dealerScore').innerHTML = 'Dealer: ' + dealerTotal;
				showWinner();
			}
			
	})	
			
	//======================SHOW CARDS ON TABLE===================
	
	function showCardsOnTable(card, cardsDiv, isFaceUp){
				
		var cardImage = document.createElement('img');
		cardImage.classList.add('card');
				
				
		if(isFaceUp){
			cardImage.src = 'img/' + card +'.png';
		}
		else{
			cardImage.src ='img/back.png';}		

		cardsDiv.appendChild(cardImage);
		}

//=================GET CARD VALUE=====================

	function getCardValue(card){
		switch (card[0]){
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
					return parseInt(card[0]);
			case '1':
			case 'J':
			case 'Q':
			case 'K':
				return 10;
			default:
				return 11;
				

		}
	} 
	
	
//==================GET HAND VALUE=================

	function getAce(card){
		
		if (card[0] == 'A'){
			return card;
		}
	}

	function getHandValue(hand){
		var i = 0
		var aces = hand.filter(getAce)
		console.log(aces);
		var handValue = 0;

		hand.forEach(function(card){
			return handValue += getCardValue(card); });

		if (aces.length !== 0){
			aces.forEach(function(){
				if (handValue > 21){
					return handValue -= 10;
				}
			});
		}
		return handValue;
	}	



	
	//=====================HIT BUTTON====================
	
	hitBtn.addEventListener('click', function(){
		
		player.push(deck.shift());
		var lastIndex = player.length - 1;
		showCardsOnTable(player[lastIndex], playerCards, true);
		

		console.log('player ', player)
		playerTotal = getHandValue(player);
		document.getElementById('dealerScore').innerHTML = 'Dealer: ' + getCardValue(dealer[0]);
		document.getElementById('playerScore').innerHTML = 'Player: ' + playerTotal;
		console.log(playerTotal);
		if(playerTotal >= 21){
			showWinner();
			
			document.getElementById('dealerCards').innerHTML='';
			showCardsOnTable(dealer[0], dealerCards, true);
			showCardsOnTable(dealer[1], dealerCards, true);
		}
	})
	
	//=====================STAND BUTTON=========================
	standBtn.addEventListener('click', function(){
		hitBtn.classList.add('hidden');
		standBtn.classList.add('hidden');
				//=======show dealer cards========
		document.getElementById('dealerCards').innerHTML='';
		showCardsOnTable(dealer[0], dealerCards, true);
		showCardsOnTable(dealer[1], dealerCards, true);
		
		dealerTotal = getHandValue(dealer);
		 

		while(dealerTotal <= 16){
			dealer.push(deck.shift());
			var lastIndex = dealer.length -1;
			showCardsOnTable(dealer[lastIndex], dealerCards, true)
			dealerTotal = getHandValue(dealer);
			document.getElementById('dealerScore').innerHTML = 'Dealer: ' + dealerTotal;
		}
		
		
		showWinner();

	})
//========================SHOW WINNER=======================
	function showWinner(){
		playAgainBtn.classList.remove('hidden');
		hitBtn.classList.add('hidden');
		standBtn.classList.add('hidden');
		scores.classList.remove('hidden');
		dealerTotal = getHandValue(dealer);
		playerTotal = getHandValue(player);
		document.getElementById('dealerScore').innerHTML = 'Dealer: ' + dealerTotal;
		var isWinner;

		if(dealerTotal === playerTotal){
			scores.innerHTML= "It's A Push!";
			bankValue += playerBet
		}

		else if(dealerTotal > playerTotal){
			if(dealerTotal === 21){
				scores.innerHTML= ("Dealer got 21, you lose");
				isWinner = false;
			}				
			else if(dealerTotal > 21){
				scores.innerHTML= ("Dealer Busted, You Win");
				isWinner = true;
			}			
			else{
				scores.innerHTML= ("Dealer Won");
				isWinner = false;
			}
		}

		else {
			if(playerTotal === 21){
				scores.innerHTML= ("You got 21, you won!");
				isWinner = true;
			}
			else if(playerTotal >  21 ){
				scores.innerHTML= ("You Busted, Dealer Won");
				isWinner = false;
			}
			else{
				scores.innerHTML= ("You Won!");
				isWinner = true;
			}
		}
		if(isWinner){
			bankValue += (playerBet * 2);
		}
		if(!isWinner){
				bankValue 
		}
		
		document.getElementById('bank').innerHTML = bankValue
		document.getElementById('dealerScore').innerHTML = 'Dealer: ' + dealerTotal;
		document.getElementById('playerScore').innerHTML = 'Player: ' + playerTotal;
	}

	

//=======================PLAY AGAIN======================
	playAgainBtn.addEventListener('click', function(){
		document.getElementById('scores').innerHTML = '';
		scores.classList.add('hidden');
		player.length = 0;
		dealer.length = 0;
		playerTotal = 0;
		dealerTotal = 0;
		//================clearCards==========
		document.getElementById('playerCards').innerHTML='';
		document.getElementById('dealerCards').innerHTML='';
		//=============clearScoreBoard============
		document.getElementById('dealerScore').innerHTML='Dealer: ' + dealerTotal;
		document.getElementById('playerScore').innerHTML='Player: ' + playerTotal;

		playerBet= document.getElementById('bet').valueAsNumber;
		bankValue -= playerBet;
		document.getElementById('bank').innerHTML =  bankValue;


		deck = shuffle();
		console.log(deck);

			player.push(deck.shift());
			dealer.push(deck.shift());
			player.push(deck.shift());
			dealer.push(deck.shift());
		console.log('player: ', player);


			showCardsOnTable(player[0], playerCards, true);
			showCardsOnTable(player[1], playerCards, true);
			showCardsOnTable(dealer[0], dealerCards, true);
			showCardsOnTable(dealer[1], dealerCards, false);

			var dealerTotal = getHandValue(dealer);
			var playerTotal = getHandValue(player);
			document.getElementById('dealerScore').innerHTML = 'Dealer: ' + getCardValue(dealer[0]);
			document.getElementById('playerScore').innerHTML = 'Player: ' + playerTotal;
			console.log('player: ', playerTotal);
			console.log('dealer: ', dealerTotal);

			playAgainBtn.classList.add('hidden');
			hitBtn.classList.remove('hidden');
			standBtn.classList.remove('hidden');
			scores.classList.remove('alert-danger');
			scores.classList.remove('alert-success');
			scores.classList.remove('alert-warning');

			if (dealerTotal === 21 || playerTotal === 21){
				
				document.getElementById('dealerCards').innerHTML='';
				showCardsOnTable(dealer[0], dealerCards, true);
				showCardsOnTable(dealer[1], dealerCards, true);
				dealerTotal = getHandValue(dealer);
				document.getElementById('dealerScore').innerHTML = 'Dealer: ' + dealerTotal;
				showWinner();

			}
			
			
			

			
			


	})


	
	
	
// SHUFFLE FUNCTION====================================================
	function shuffle() {
		let array = [
			'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
			'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
			'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
			'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
		];
		// Fisher–Yates Shuffle		
		// Source: https://bost.ocks.org/mike/shuffle/

		var m = array.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

})();