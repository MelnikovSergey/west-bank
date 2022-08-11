(function(id) {

	// Open/close door func waiting for refactoring 
	function openDoor(elem){
		if(elem.length) {
		  for(var i = 0; i < elem.length; i++) {
		    make(elem[i]);
		  }
		} else {
		  make(elem);
		}

		function make(elem) {
			var y = 0;
	
			function frame(){
				y -= 186;
				elem.style.backgroundPositionY = y + 'px';
				if(y == -186*3){
					clearInterval(timer);
				}
			}
			var timer = setInterval(frame, 100);
		}
	}

	function closeDoor(elem){

		if(elem.length) {
		  for(var i = 0; i < elem.length; i++) {
		    make(elem[i]);
		  }
		} else {
		  make(elem);
		}

		function make(elem) {
			var y = -372;
		
			function frame(){
				y += 186;
				elem.style.backgroundPositionY = y + 'px';
				if(y == 0){
					clearInterval(timer);
				}
			}
			var timer = setInterval(frame, 100);
		}
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
 
	function selectRandomDoors() {
		selectDoorsNumber = getRandomInt(0, 6);
		return selectDoorsNumber;
	}

	function openSelectDoors(selectDoorsNumber) {
		openDoor(doorsArray[selectDoorsNumber]);
	}

	function closeSelectDoors(selectDoorsNumber) {
		closeDoor(doorsArray[selectDoorsNumber]);
	}

	function selectRandomCustomer() {
		var randomCustomer = getRandomInt(0, 6);
		return randomCustomer;	
	}

	function createCustomersArray() {
		for(var i = 0; i < 3; i++) {
			roundCustomersArray[i] = customersArray[selectRandomCustomer()];
			console.log(roundCustomersArray[i]);
		}
	}	

	function uploadCustomers() {
		createCustomersArray();

		customer1.className += " " + roundCustomersArray[0].cssClass;
		customer2.className += " " + roundCustomersArray[1].cssClass;
		customer3.className += " " + roundCustomersArray[2].cssClass;
	}

	function customerAnimate(person, personDoor, time, fps) {

		var frames = fps || 50; 
		var clock = time || 360; 
		var steps = clock / (1000 / frames);
   
		// ...
	  
		var timer = setInterval(function() {
			
			// ...
			person.style.backgroundPositionX = x + 'px';

			// ...
			steps--;
	    
			if(steps <= 0) {
				clearInterval(timer);
			}
		}, (1000 / fps));
	}

	document.onkeydown = function(event) {
		// 1, 2, 3 
		if(event.keyCode == 49) {
			customerAnimate(roundCustomersArray[0], customer1);
			console.log('Shoot in the first door');
		}
		else if(event.keyCode == 50) {
			customerAnimate(roundCustomersArray[1], customer2);
			console.log('Shoot in the second door');
		}
		else if(event.keyCode == 51) {
			customerAnimate(roundCustomersArray[2], customer3);
			console.log('Shoot in the third door');
		}
		// Left, right
		if(event.keyCode == 37) {
			selectDoors();
			console.log('Left door');
		}
		else if(event.keyCode == 39) {
			selectDoors();
			console.log('Right door');
		}
	}

	// Variables
	var round = null;
	var clock = 2000;
	var bankWorkerCount = 3;
	var roundStatistics = 0;
	var selectDoorsNumber = null;

	// Game Zone
	var bank = document.getElementById('container');

	// Doors
	var door1 = document.getElementById('sprite_1');
	var door2 = document.getElementById('sprite_2');
	var door3 = document.getElementById('sprite_3');

	var doorsArray = [ door1, door2, door3, [door1, door2], [door1, door3], [door2, door3], [door1, door2, door3] ];
	
	// Bank worker wound
	var bankWorkerArray = new Array(3);
	
	for(var i = 0; i < bankWorkerCount; i++) {
		bankWorkerArray[i] = document.getElementById(i + 1);
	}

	// Customers, Banditos, Crazy kid with bomb
	var customer1 = document.getElementById('people_1');
	var customer2 = document.getElementById('people_2');
	var customer3 = document.getElementById('people_3');	

	// Customers data: start position, step, final position
	var bandit = { 
		positionsData: [ 0, -114, -228  ],
		positionsDataLength: 3,
		cssClass: 'bandit' 
	};

	var woman = { 
		positionsData: [ -684, -114, -798 ],
		positionsDataLength: 3,
		cssClass: 'woman' 
	};

	var man = { 
		positionsData: [ -912, -114, -228 ],
		positionsDataLength: 3,
		cssClass: 'man' 
	};

	var bombBoyBoomer = { 
		positionsData: [ 0, -114, -912 ],
		positionsDataLength: 3, 
		cssClass: 'bombBoyBoomer' 
	};

	var dollarBoyBoomer = { 
		positionsData: [ 0, 114, 912 ],
		positionsDataLength: 3, 
		cssClass: 'dollarBoyBoomer' 
	};

	var renegade = { 
		positionsData: [ 0, 114, 228 ],
		positionsDataLength: 3, 
		cssClass: 'renegade' 
	};

	var customersArray = [ woman, man, bandit, bombBoyBoomer, dollarBoyBoomer, renegade ];
	var roundCustomersArray = new Array(3)

	// Button
	var startButton = document.getElementById('start');

	function startNewRound() {
		uploadCustomers();
		openSelectDoors(selectRandomDoors());
		setTimeout(output, clock);

		roundStatistics++;
	}

	output = function() {

		if(checkRoundResult() === true) {
			// adding money to the bank storage
		} else {
			bankWorkerWound(--bankWorkerCount);
		}

		closeSelectDoors(selectDoorsNumber);
		setTimeout(restartRound, clock);

		console.log('Round ' + roundStatistics + ' is done!');
	}

	restartRound = function() { 
		startGame();
	}
	  
	// Check the bank worker to cope with the renegades and all bandito
	function checkRoundResult() {
		var result = true;

		if(selectDoorsNumber <= 2) {
			if(check(selectDoorsNumber) === true ) result = false;
		} else {
			var indexArray = [ 0, 1, 2, [0, 1], [0, 2], [1, 2], [0, 1, 2] ];
			var checkArray = indexArray[selectDoorsNumber]; 
			
			for(var i = 0; i <= checkArray.length; i++) {
				if(check(i) === true) {
					result = false;
					break;
				}
			}
		}

		function check(index) {
			var result = Number(roundCustomersArray.indexOf(bandit, index)) > -1 ? true : false;
			return result;
		}
		
		return result;	
	}

	function bankWorkerWound(n) {
		bank.className = 'wound';
		bankWorkerArray[n].style.display = 'none';
		console.log('Bang-bang!!! Bank worker wound!!!');
	}

	function renegadeAppearances() {
		// ...
	}

	function dollarShootingFx() {
		// ...
	}

	function flashBombFx() {
		// ...
	}

	function selectDoors() {
		// Take a decision on the number of doors
	}

	function completedTransaction() {
		// ...
	}

	function gameOver() {
		alert('Game Over');
	}
	
	function startGame() {
		if(bankWorkerCount > 0) {
			bank.className = '';
			roundCustomersArray = new Array(3);
			startNewRound();
		} else {
			gameOver();
		}	
	}
	
	startButton.onclick = startGame;
	
}(document));