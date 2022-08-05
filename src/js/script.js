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

		customer1.className += " " + roundCustomersArray[1];
		customer2.className += " " + roundCustomersArray[2];
		customer3.className += " " + roundCustomersArray[3];
	}

	function customerAnimate(person, personDoor){

		var x = person[0];

		function frame(){
			x -= person[1];
			personDoor.style.backgroundPositionX = x + 'px';
			if(x == person[2]){
				clearInterval(timer);
			}
		}

		var timer = setInterval(frame, 350);
	}

	document.onkeydown = function(event) {
		if(event.keyCode == 49) {
			customerAnimate(eval(roundCustomersArray[0]), customer1);
			console.log('Shoot in the first door');
		}
		else if(event.keyCode == 50) {
			customerAnimate(eval(roundCustomersArray[1]), customer2);
			console.log('Shoot in the second door');
		}
		else if(event.keyCode == 51) {
			customerAnimate(eval(roundCustomersArray[2]), customer3);
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

	var customersArray = [ 'woman', 'man', 'bandit', 'bombBoyBoomer', 'dollarBoyBoomer', 'renegade' ];
	var roundCustomersArray = new Array(3);

	// Customers data: start position, step, final position, container
	var woman = [684, 114, 798];
	var man = [912, 114, 228];
	var bandit = [0, 114, 228];
	var bombBoyBoomer = [0, 114, 912];
	var dollarBoyBoomer = [0, 114, 912];
	var renegade = [0, 114, 228];

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
			closeSelectDoors(selectDoorsNumber);
			setTimeout(restartRound, clock);
		} else {
			// ...
			bankWorkerCount--;
		}
	}

	restartRound = function() { 
		startGame();
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