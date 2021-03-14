// 5 parts 

//anonymous function 
window.onload = function() {
	//1. Initial states 
	var num;
	var box;
	var ctx;
	var turn = 0;
	var cleared;
	var symbol;
	var flagged;
	var max = 4;
	var character;
	var gameOver = false;
	var flagSymbol = 'F';
	var field;

	var nbr1 = Math.floor(Math.random() * max*max);
	var nbr2 = Math.floor(Math.random() * max*max);
	var nbr3 = Math.floor(Math.random() * max*max);

	cleared = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
	flagged = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

	//2. NewGame - event + function 
	//Create a new game click event
	var n = document.getElementById("new");
	n.addEventListener("click", newGame);
	
	// fill up symbols
	//alert("getSymbols()");
	symbol = getSymbols();

	//newGame function
	function newGame() {
		document.location.reload();
	}
	
	//3. Canvas click + retrieving the box's number 
	//canvas click event 
	document.getElementById("nine").addEventListener("mousedown", function(e) {
		boxClick(e.target.id, e);
	});
	
	// mousedown function
	function boxClick(numId, e) {
		box = document.getElementById(numId);
		ctx = box.getContext("2d");
		
		num = getBoxNumber(numId);

		//Drawing the shapes on the canvases 
		if(gameOver == false) {
			if(cleared[num-1] == false) {
			
				//alert("Character " + symbol[num-1]);
				character = symbol[num-1];

				// draw value
				drawValue(numId, e, ctx);

				// clear the cell clicked
				cleared[num-1] = true;

				// increment turn
				turn++;

				// check for mines
				if (character == '9') {
					document.getElementById("result").innerText = "Nine clicked.  Game over.  Please try again.";
					gameOver = true;
					revealAll();					
				}
		
				// see if the mines have been cleared.
				if (getMinesCleared() == true) {
					document.getElementById("result").innerText = "Congratulations!  You successfully cleared the mines.";
					gameOver = true;
				} 

			
			} else {
				if (flagged[num-1] == flagSymbol && gameOver == false) {
					flagged[num-1] = '';
					unFlagBox(numId);
				} else {
					alert("This box has been cleared.  Click a new box.");
				}
			}
		} else {
				alert("Game over. Please click on the New Game button to start again.");
		}
		
	}

	// see if the mines have been cleared
	function getMinesCleared() {
		var bool = true;
		for (k = 0; k < cleared.length; k++) {
			//for (j = 0; j < max; j++) {
				if (cleared[k] == false) {
					bool = false;
				} else if (flagged[k] == flagSymbol && symbol[k] != '9') {
					bool = false;
				}
			//}
		}
		
		return bool;
	}

	// function to unflag a box
	function unFlagBox(numId) {

		var num = getBoxNumber(numId);
		character = '';
		ctx.clearRect(0, 0, 100, 100);

		// reset cleared
		cleared[num-1] = false;

	}

	// function to reveal all boxes
	function revealAll() {

		for (k=0; k<field.length; k++) {
			var id = "canvas"+(k+1);
			var b = document.getElementById(id);
			var context = b.getContext("2d");
	
			//var ndx = getBoxNumber(id);
			var s = symbol[k];

			// reset
			context.clearRect(0, 0, 100, 100);
	
			// draw character
			context.font = "30px Arial";
			context.fillText(s, 10, 50);
			context.strokeStyle = "dodgerblue";					
		}

	}

		
	// function to set up the symbals and nines
	function getSymbols() {

		var cnt = 0;

		//var field = [['0','0','0'], ['0', '0', '0'], ['0', '0', '0']];
		field = get2DArray();
		
		//alert("Field " + field);
		
		for (k = 0; k < field.length; k++) {			
			cnt = 0;
			//alert('field ' + field[k] + " k " + k);
			if (field[k] != '9') {
				if (k < field.length && field[[k+1]] == '9' && k%max < max-1) {
					cnt++;
				}
				if (k > 0 && field[k-1] == '9' && k%max > 0) {
					cnt++;
				}
				if (k >= max && field[k-max] == '9') {
					cnt++;
				}
				if (k > max-1 && field[k-max-1] == '9' && k%max > 0) {
					cnt++;
				}
				if (k >= max && field[k-max+1] == '9' && k%max <= max-1) {
					cnt++;
				}
				if (k <= field.length+max && field[k+max] == '9') {
					cnt++;
				}
				if (k < field.length+max-1 && field[k+max-1] == '9' && k%max > 0) {
					cnt++;
				}
				if (k <= field.length+max+1 && field[k+max+1] == '9' && k%max < max-1) {
					cnt++;
				}

				//alert('field ' + field[k][j] + " cnt " + cnt);
				field[k] = cnt;
			}				
		}

		return field;
	}

	// function to create array
	function create2DArray(rows) {
		var arr = [];
	  
		for (var i=0;i<rows;i++) {
		   arr[i] = [];
		}
	  
		return arr;
	}

	// function to build array
	function get2DArray() {
		//alert("get array....");
		var arr1 = create2DArray(max*max);
		var v;

		//alert("set values....");
		for (var i=0;i<arr1.length;i++) {
			for (var k=0;k<arr1.length;k++) {				
				arr1[[i][k]] = getValue(i, k);
			}
		}

		//alert (arr1);

		return arr1;
	}

	// function to get init value and add mines to field
	function getValue(i, k) {		
		//alert("nbr1 = " + nbr1);
		if (i == nbr1 || i == nbr2 || i == nbr3) {
		//if (i == 1 || i == 6 || i == 9) {	
			return '9';
		}
		return '0';
	}

	// function to get box number
	function getBoxNumber(numId) {
		var num = 1;
		switch(numId) {
			case "canvas1": num = 1;
						    break;
			case "canvas2": num = 2;
							break;
			case "canvas3": num = 3;
							break;
			case "canvas4": num = 4;
							break;
			case "canvas5": num = 5;
							break;
			case "canvas6": num = 6;
							break;
			case "canvas7": num = 7;
							break;
			case "canvas8": num = 8;
							break;
			case "canvas9": num = 9;
							break;
			case "canvas10": num = 10;
							break;
			case "canvas11": num = 11;
							break;
			case "canvas12": num = 12;
							break;
			case "canvas13": num = 13;
							break;
			case "canvas14": num = 14;
							break;
			case "canvas15": num = 15;
							break;
			case "canvas16": num = 16;
							break;

		}
		return num;
	}

	// function to draw the character
	function drawValue(numId, e, ctx) {

		var evt = e || window.event;
		var btnCode;

		var num = getBoxNumber(numId);

		character = '';

		// if left click, draw symbol.  If right click, flag.
		if ('object' === typeof evt) {
			btnCode = evt.button;

			switch (btnCode) {
				case 0:
					// left button
					character = symbol[num-1];					
				break;

				case 1:
					//middle button
				break;

				case 2:
					//right button
					character = 'F';
					flagged[num-1] = 'F';
				break;

				default:
					alert('Unexpected code: ' + btnCode);
			}
		}

		// draw character
		ctx.font = "30px Arial";
		ctx.fillText(character, 10, 50);
		ctx.strokeStyle = "dodgerblue";					

	}
}
