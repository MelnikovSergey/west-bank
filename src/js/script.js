(function(id) {

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
	}

	// Variables
	var round = null;
	var clock = 2000;
	var bankWorkerCount = 3;
	var roundStatistics = 0;
	var selectDoorsNumber = null;

	// Doors
	var door1 = document.getElementById('sprite_1');
	var door2 = document.getElementById('sprite_2');
	var door3 = document.getElementById('sprite_3');

	var doorsArray = [ door1, door2, door3, [door1, door2], [door1, door3], [door2, door3], [door1, door2, door3] ];
	
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
		console.log('Round ' + roundStatistics + ' is done!');
	}

	output = function() {
		if(true) {
			// ...
			// ...
			closeSelectDoors(selectDoorsNumber);
			setTimeout(restartRound, clock);
		} else {
			bankWorkerWound();
			bankWorkerCount--;
		}
	}

	restartRound = function() { 
		startGame();
	}

	function bankWorkerWound() {
		alert('Bank worker wound!');
	}

	function gameOver() {
		alert('Game Over');
	}
	
	function startGame() {
		if(bankWorkerCount > 0 && roundStatistics < 12) {
			roundCustomersArray = new Array(3);
			startNewRound();
		} else {
			gameOver();
		}	
	}
	
	startButton.onclick = startGame;
	
}(document));