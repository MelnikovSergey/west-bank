function openDoor(elem){
	var y = 0;

	function frame(){
		y -= 186;
		elem.style.backgroundPositionY = y + 'px';
		if(y == -372){
			clearInterval(timer);
		}
	}
	var timer = setInterval(frame, 80);
}
 