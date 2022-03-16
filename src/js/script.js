/*
function gamePlay(){
	function personSoot(){
		if(shoot == '10'){
			personAnimate(person1);
			clearInterval(personEnd);
		}else{
			alert("Game Over")
			clearInterval(personEnd);
		}
	}		
	var personEnd = setInterval(personSoot, 2000);
	closeDoor(elem1);

};

$(function(){
var elem1 = document.getElementById('sprite_1');
var elem2 = document.getElementById('sprite_2');
var elem3 = document.getElementById('sprite_3');
var person1 = document.getElementById('people_1');
openDoor(elem1);
personAnimate(person1);
closeDoor(elem1);
}); 
*/



window.onload = function() {
	var door = 'close';
	var elemsDoor;
	var gamecount = 0;
	var bankirLife = 3; 

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function openDoors() {

		var randomDoor = getRandomInt(1, 3);	

		switch(randomDoor) {
			case 1:
			openDoor(elem1);
			openDoor(elem1);
			elemsDoor = 'openelem1'; 
			break;

			case 2:
			openDoor(elem2);
			openDoor(elem2);
			elemsDoor = 'openelem2';
			break;	

			case 3:
			openDoor(elem3);
			openDoor(elem3);
			elemsDoor = 'openelem3';
			break;	
	
			case 4:
			openDoor(elem1);
			elemsDoor = 'openelem1';
			openDoor(elem2);
			elemsDoor = 'openelem2';
			break;

			case 5:
			openDoor(elem2);
			elemsDoor = 'openelem2';
			openDoor(elem3);
			elemsDoor = 'openelem3';
			break;

			case 6:
			openDoor(elem1);
			elemsDoor = 'openelem1';
			openDoor(elem3);
			elemsDoor = 'openelem3';
			break;				
		}

		gamecount++;
	}

	function people() {
		var people;
		var randomPeople = getRandomInt(1, 5);	

		switch(randomPeople) {
			case 1:
			people = 'bandit';

			people_1.classList.add('bandit');
			people_2.classList.add('bandit');
			people_3.classList.add('bandit');
			console.log('bandit');
			break;

			case 2:
			people = 'man';

			people_1.classList.add('man');
			people_2.classList.add('man');
			people_3.classList.add('man');
			console.log('man');
			break;	

			case 3:
			people = 'woman'; 

			people_1.classList.add('woman');
			people_2.classList.add('woman');
			people_3.classList.add('woman');
			console.log('woman');
			break;	
	
			case 4:
			people = 'sexBomBoy';

			people_1.classList.add('sexbomboy');
			people_2.classList.add('sexbomboy');
			people_3.classList.add('sexbomboy');
			console.log('sexBomBoy');
			break;

			default:
			people = 'manWithBandit';

			people_1.classList.add('sexbomboy');
			people_2.classList.add('sexbomboy');
			people_3.classList.add('sexbomboy');
			console.log('manWithBandit'); 
		}
	}

	// анимируем открытие двери
	function openDoor(elem){
		var y = 0;

		function frame(){
			y -= 186;
			elem.style.backgroundPositionY = y + 'px';
			if(y == -186*3){
				clearInterval(timer);
			}
		}
		var timer = setInterval(frame, 80);
	}

/*
	// пытаемся сделать универсальную функцию анимации
	function openDoor(elem){
		console.log(door);
		if (door !== 'open') {
			var y = 0;

			function frame(){
				y -= 186;
				elem.style.backgroundPositionY = y + 'px';
				if(y == -186*3){
					clearInterval(timer);
				}
			}
			var timer = setInterval(frame, 80);
			door = 'open';
			console.log(door);

		} else {
			function frame(){
				y += 186;
				elem.style.backgroundPositionY = y + 'px';
				if(y == 0){
					clearInterval(timer);
				}
			}
			var timer = setInterval(frame, 800);
			door = 'close';
			console.log(door);
		}
	}
*/
		// анимируем закрытие двери
		function closeDoor(elem){
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
 
	var elem1 = document.getElementById('sprite_1');
	var elem2 = document.getElementById('sprite_2');
	var elem3 = document.getElementById('sprite_3');

	var people_1 = document.getElementById('people_1');
	var people_2 = document.getElementById('people_2');
	var people_3 = document.getElementById('people_3');	

	function personAnimate(person){
		var x = 0;

		function frame(){
			x -= 114;
			person.style.backgroundPositionX = x + 'px';
			if(x == -228){
				clearInterval(timer);
			}
		}
		var timer = setInterval(frame, 350);
	}

	document.onkeydown = function(event) {
		console.log(event);
		if(event.keyCode == 49) {
			personAnimate(people_1);
			killPerson();
			console.log('Должен упасть первый');
		}
		else if(event.keyCode == 50) {
			personAnimate(people_2);
			killPerson();
			console.log('Должен упасть второй');
		}
		else if(event.keyCode == 51) {
			personAnimate(people_3);
			killPerson();
			console.log('Должен упасть третий');
		}
	}

	function gamePlay() {
		
		people();
		openDoors();

		setTimeout(function(){
			for(var g=1; g<3; g++){
				if(elemsDoor === 'openelem' + g) {
					console.log(elemsDoor);
					var elem = document.getElementById('sprite_' + g);
					closeDoor(elem);
					elemsDoor = 'closeelem' + g;
					console.log(elemsDoor);
				}
			}
		}, 2000);
	}
	
	setInterval(gamePlay, 3000);

	var sexBomBoy = {
		bomb : 2,
		money : 200
	}

	function killPerson() {
		var smech = 110;
		if (people == sexBomBoy) {
			var seek;
			seek = people_1.style.backgroundPositionY;
			people_1.style.backgroundPositionY = bomb + smech + 'px';
			people_2.style.backgroundPositionY = bomb + smech + 'px';
			people_3.style.backgroundPositionY = bomb + smech + 'px';
			console.log(seek);
		}

		if (people == man) {
			var seek;
			seek = people_1.style.backgroundPositionY;
			people_1.style.backgroundPositionY = bomb + smech + 'px';
			people_2.style.backgroundPositionY = bomb + smech + 'px';
			people_3.style.backgroundPositionY = bomb + smech + 'px';
			console.log(seek);
		}
	} 
}