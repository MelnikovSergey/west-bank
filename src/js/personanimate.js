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