function closeDoor(elem){
	var y = -372;

	function frame(){
		y += 186;
		elem.style.backgroundPositionY = y + 'px';
		if(y == 0){
			clearInterval(timer);
		}
	}
	var timer = setInterval(frame, 800);
}
 