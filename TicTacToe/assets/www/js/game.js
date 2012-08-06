/*
 * 	@author Nick Italiano
 * 	This script contains all single player elements, 
 * 	page swaping, and phonegap code.
 */

document.addEventListener("deviceready", function(){
$(document).ready(function(){

/********************************************* 
                Page swaping
 *********************************************/
	
	// #multi-content code
	$("#btnMultiPlayer").click(function(){
		$('#start-menu-wrapper').css('display','none');
		$('#multi-content').css('display','block');
	});

	// #start-menu-wrapper code
	$("#btnSinglePlayer").click(function(){
		$('#start-menu-wrapper').css('display','none');
		$('#content').css('display','block');
	});

/**********************************************
	      Single player and AI
 **********************************************/

	// #content code
	var board = new Array(3);
			
	for(i=0;i<3;i++){
		board[i] = new Array(3);
		for(n=0;n<3;n++)
			board[i][n] = 0;
	}

	// cells of the board		
	$(".cell").click(function(){

		startWatch();
		
		if(isValidMove(this.id)){
			$("#"+this.id).html("X");
			$("#whos-turn #whos-turn-img").css("background-image","url('img/cpu.png')");
			$("#whos-turn").css("left","45%");
			isWin();
						
			// cpu move is right after our move
			// setTimeout() adds a delay
			if(!isFull()){
				setTimeout(function(){
					var id = cpuMove();
					$("#"+id).html("O");
					$("#whos-turn #whos-turn-img").css("background-image","url('img/you.png')");
					$("#whos-turn").css("left","45%");
					isWin();
					
				},1000);

			} else { timeout(); }	
	
		} else {
				alert("Invalid move");
		}
	});

	// reset board
	function resetBoard(){
		for(i=0;i<3;i++)
			for(n=0;n<3;n++)
				board[i][n] = 0;
	}

	// marks 3 for human move
	function isValidMove(id){
		for(i=0;i<3;i++){
			for(n=0;n<3;n++){
				if(id === String(i+""+n) && board[i][n] != 0){
					return false;
				} 
				else if(id === String(i+""+n) && board[i][n] == 0){
					board[i][n] = 3;
					return true;
				}
			}
		}
		return false;
	}

	// marks 2 for cpu move
	function cpuMove(){

		// help prevent diag winners
		if(board[0][0] == 0 && board[1][1] == board[2][2] && board[1][1] == 3){
			board[0][0] = 2;
			return "00";
		}
		if(board[0][2] == 0 && board[1][1] == board[2][0] && board[1][1] == 3){
			board[0][2] = 2;
			return "02";
		}
		if(board[2][0] == 0 && board[1][1] == board[2][0] && board[1][1] == 3){
			board[2][0] = 2;
			return "20";
		}
		if(board[2][2] == 0 && board[1][1] == board[0][0] && board[1][1] == 3){
			board[2][2] = 2;
			return "22";
		}


		// help prevent row winners with open spot on left
		if(board[0][0] == 0 && board[0][1] == board[0][2] && board[0][1] == 3){
			board[0][0] = 2;
			return "00";
		}
		if(board[1][0] == 0 && board[1][1] == board[1][2] && board[1][1] == 3){
			board[1][0] = 2;
			return "10";
		}
		if(board[2][0] == 0 && board[2][1] == board[2][2] && board[2][1] == 3){
			board[2][0] = 2;
			return "20";
		}

		// help prevent row winners with open spot on right
		if(board[0][2] == 0 && board[0][1] == board[0][0] && board[0][1] == 3){
			board[0][2] = 2;
			return "02";
		}
		if(board[1][2] == 0 && board[1][1] == board[1][0] && board[1][1] == 3){
			board[1][2] = 2;
			return "12";
		}
		if(board[2][2] == 0 && board[2][1] == board[2][0] && board[2][1] == 3){
			board[2][2] = 2;
			return "22";
		}

		// help prevent middle row diag and col winners
		if(board[1][1] == 0 && board[0][1] == board[2][1] && board[0][1] == 3){
			board[1][1] = 2;
			return "11";
		}
		if(board[1][1] == 0 && board[1][0] == board[1][2] && board[1][0] == 3){
			board[1][1] = 2;
			return "11";
		}
		if(board[1][0] == 0 && board[0][0] == board[2][0] && board[0][0] == 3){
			board[1][0] = 2;
			return "10";
		}
		if(board[1][2] == 0 && board[0][2] == board[2][2] && board[0][2] == 3){
			board[1][2] = 2;
			return "12";
		}
		if(board[1][1] == 0 && board[0][0] == board[2][2] && board[0][0] == 3){
			board[1][1] = 2;
			return "11";
		}
		if(board[1][1] == 0 && board[0][2] == board[2][0] && board[0][2] == 3){
			board[1][1] = 2;
			return "11";
		}
		if(board[0][1] == 0 && board[0][0] == board[0][2] && board[0][0] == 3){
			board[0][1] = 2;
			return "01";
		}
		if(board[2][1] == 0 && board[2][0] == board[2][2] && board[2][0] == 3){
			board[2][1] = 2;
			return "21";
		}

		// corner moves
		if(board[2][2] == 0){
			board[2][2] = 2;
			return "22";
		}
		if(board[0][0] == 0){
			board[0][0] = 2;
			return "00";
		}
		if(board[0][2] == 0){
			board[0][2] = 2;
			return "02";
		}
		if(board[2][0] == 0){
			board[2][0] = 2;
			return "20";
		}

		// finds any remaining moves
		for(i=0;i<3;i++){
			for(n=0;n<3;n++){
				if(board[i][n] == 0){
					board[i][n] = 2;
					return String(i+""+n);
				}
			}
		}
	}

	// returns true if board is full
	function isFull(){
		for(i=0;i<3;i++){
			for(n=0;n<3;n++){
				if(board[i][n] == 0){
					return false;
				}
			}
		}
		return true;
	}

	// if winner is found page will reload
	function isWin(){

	// winners by row
	if( board[0][0] == board[0][1] && board[0][0] == board[0][2] && board[0][0] != 0){
		if(board[0][0] == 2){
			$("#whos-turn #whos-turn-img").css("background-image","url('img/lose.png')");
		} else{
			$("#whos-turn #whos-turn-img").css("background-image","url('img/win.png')");
		}
		timeout();
	}
	if( board[1][0] == board[1][1] && board[1][0] == board[1][2] && board[1][0] != 0){
		if(board[1][0] == 2){
			$("#whos-turn #whos-turn-img").css("background-image","url('img/lose.png')");
		} else{
			$("#whos-turn #whos-turn-img").css("background-image","url('img/win.png')");
		}
		timeout();
	}
	if( board[2][0] == board[2][1] && board[2][0] == board[2][2] && board[2][0] != 0){
		if(board[2][0] == 2){
			$("#whos-turn #whos-turn-img").css("background-image","url('img/lose.png')");
		} else{
			$("#whos-turn #whos-turn-img").css("background-image","url('img/win.png')");					
		}
		timeout();
	}
			
	// winners by col
	if( board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] != 0){
		if(board[0][0] == 2){
			$("#whos-turn #whos-turn-img").css("background-image","url('img/lose.png')");
	        } else{
			$("#whos-turn #whos-turn-img").css("background-image","url('img/win.png')");
		}
		timeout();
	}
	if( board[0][1] == board[1][1] && board[0][1] == board[2][1] && board[0][1] != 0){
		if(board[0][1] == 2){
			$("#whos-turn #whos-turn-img").css("background-image","url('img/lose.png')");
		} else{
			$("#whos-turn #whos-turn-img").css("background-image","url('img/win.png')");
		}
		timeout();
	}
	if( board[0][2] == board[1][2] && board[0][2] == board[2][2] && board[0][2] != 0){
		if(board[0][2] == 2){
			$("#whos-turn #whos-turn-img").css("background-image","url('img/lose.png')");
		} else{
			$("#whos-turn #whos-turn-img").css("background-image","url('img/win.png')");
		}
		timeout();
	}
		
	// winners by diag
	if( board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != 0){
		if(board[0][0] == 2){
			$("#whos-turn #whos-turn-img").css("background-image","url('img/lose.png')");
		} else{
			$("#whos-turn #whos-turn-img").css("background-image","url('img/win.png')");
		}
		timeout();
	}
	if( board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] != 0){
		if(board[0][2] == 2){
			$("#whos-turn #whos-turn-img").css("background-image","url('img/lose.png')");
		} else{
			$("#whos-turn #whos-turn-img").css("background-image","url('img/win.png')");
		}
		timeout();
	 }
	}

	function timeout(){
		setTimeout(function(){
			$(".cell").html("");
			$("#whos-turn #whos-turn-img").css("background-image","url('')");
			resetBoard(); 
		 },800);
	}

/****************************************** 
		 Phonegap
 ******************************************/

	// init
	document.addEventListener("pause", onPause, false);
	
	// pause
	function onPause(){
	}

	//geolocation
	var geo_opts = { frequency : 3000 };
	var geoLocationId = navigator.geolocation.getCurrentPosition(onSuccessLocation, geoError, geo_opts);

	function onSuccessLocation(position){
		$("#txtLat").html(""+position.coords.latitude);
		$("#txtLong").html(""+position.coords.longitude);
	}

	function geoError(){
	}	

	//detects shake event

	var watchId = null;
	
	var preReading = {
			x : 0,
			y : 0,
			z : 0
	};

	function startWatch(){

	var opts = { frequency : 2000 };

	navigator.accelerometer.watchAcceleration(onSuccess, onError, opts);
	
	}

	function stopWatch(){
		if(watchId){
			navigator.accelerometer.clearWatch(watchId);
			watchId = null;
		}
	}

	function onSuccess(curReading) {

			var delta = {
				x : 0,
				y : 0,
				z : 0
			};

			var limit = 1.0;

			if(preReading.x !== 0){
				delta.x = Math.abs(preReading.x - curReading.x);
                      		delta.y = Math.abs(preReading.y - curReading.y);
				delta.z = Math.abs(preReading.z - curReading.z);
			}

			if(delta.x > limit && delta.y > limit && delta.z > limit){
				stopWatch();
				timeout();
				return;
			}
					
			preReading = {
				x : curReading.x,
				y : curReading.y,
				z : curReading.z
			};
	}

	function onError(){
		// error code
	}
});
},false);
