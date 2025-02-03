
//For Tetris (game).
Qualtrics.SurveyEngine.addOnload(function() {
  console.log("GameQ Onloaded.");
  //this.hideNextButton();
  debugger;
  var vidPlaying = false;
  this.disableNextButton();
  var that = this;
  const vidPlayer = videojs('my-player', {
	playbackRates: [1, 2, 4, 8, 10, 12, 16],
	controls: false,
    playsinline: true,
    preload: 'auto',
	userActions: {click: false, doubleClick: false, hotKeys: false}
  });
  const tetris_canvas = document.getElementById('tetris-canvas');
  const tetris_game = new ClassicTetris(tetris_canvas);
  document.getElementById('start-stop-btn').addEventListener('click', event => {
	if (! vidPlaying) {
	  that.hidePreviousButton();
      tetris_game.setStartLevel(5);
      tetris_game.togglePlayPause();
	  vidPlaying = true;
	}
  });

  vidPlayer.ready(function() {
	    playbackRate = Qualtrics.SurveyEngine.getEmbeddedData('playbackRate');
        vidPlayer.playbackRate(16);
  }); 
	
  vidPlayer.on('contextmenu', function(e) {
    e.preventDefault();
  });
	
  vidPlayer.on('ended', function() {
	var videoEndSec = Math.floor(Date.now() / 1000);
    Qualtrics.SurveyEngine.setEmbeddedData('videoEndSecond', videoEndSec);
	Qualtrics.SurveyEngine.setEmbeddedData('keyDownCount', tetris_game.keyDownCount);
	Qualtrics.SurveyEngine.setEmbeddedData('tetrisLineTotal', tetris_game.getLineTotal());
	Qualtrics.SurveyEngine.setEmbeddedData('tetrisScoreTotal', tetris_game.getScoreTotal());
	Qualtrics.SurveyEngine.setEmbeddedData('tetrisFinalLevel', tetris_game.getFinalLevel());
	Qualtrics.SurveyEngine.setEmbeddedData('videoStartSecond', tetris_game.getStartSecond());
	Qualtrics.SurveyEngine.setEmbeddedData('distractedSeconds', tetris_game.getDistractedSeconds());
	var screenWidth = window.screen.width * window.devicePixelRatio;
	Qualtrics.SurveyEngine.setEmbeddedData('screenWidth', screenWidth);
    var screenHeight = window.screen.height * window.devicePixelRatio;
	Qualtrics.SurveyEngine.setEmbeddedData('screenHeight', screenHeight);
	Qualtrics.SurveyEngine.setEmbeddedData('userAgent', navigator.userAgent);
	//that.enableNextButton();
	that.clickNextButton();
  });
});


//For essay (write).
Qualtrics.SurveyEngine.addOnload(function() {
  console.log("WriteQ Onloading.");
  //this.hideNextButton();
  //this.disablePreviousButton();
  this.hideNextButton();
  var that = this;
  var vidRolling = false;
  var keyDownCount = 0;
  var keyDownMap = new Map();
  var videoStartSec = 0;
  const essayBox = document.getElementById('essayBox');

  debugger;
  const vidPlayer = videojs('my-player', {
	playbackRates: [1, 2, 4, 8, 10, 12, 16],
	controls: false,
    playsinline: true,
    preload: 'auto',
	userActions: {click: false, doubleClick: false, hotKeys: false}
  });

  document.getElementById('start-btn').addEventListener('click', event => {
	if (! vidRolling) {
	  that.hidePreviousButton();
      videoStartSec = Math.floor(Date.now() / 1000);
	  vidPlayer.play();
	  vidRolling = true;
	  Qualtrics.SurveyEngine.setEmbeddedData('videoStartSecond', videoStartSec);
	  console.log("Video started at UNIX second " + videoStartSec + ".");
	  
	  essayBox.value = "";
	  essayBox.disabled = false;
	  essayBox.focus();
	}
  });
	
  essayBox.addEventListener('keypress', function(event) {
	if (vidRolling) {
	  keyDownCount++;
      const epoch = Math.floor(Date.now() / 1000);
      keyDownMap.set(epoch, 1);
	}
  });
	
  vidPlayer.ready(function() {
	playbackSpeed = Qualtrics.SurveyEngine.getEmbeddedData('playbackSpeed');
    vidPlayer.playbackRate(playbackSpeed);
  }); 
	
  vidPlayer.on('contextmenu', function(e) {
    e.preventDefault();
  });
														
  vidPlayer.on('ended', function() {
	Qualtrics.SurveyEngine.setEmbeddedData('keyDownCount', keyDownCount);
	Qualtrics.SurveyEngine.setEmbeddedData('essayStr', essayBox.value);
	  
	const videoEndSec = Math.floor(Date.now() / 1000);
	Qualtrics.SurveyEngine.setEmbeddedData('videoEndSecond', videoEndSec);
	  
	var keys = Array.from(keyDownMap.keys());
    var offsetKeys = keys.map(number => number - videoStartSec);
    var secStr = offsetKeys.join(",");
	Qualtrics.SurveyEngine.setEmbeddedData('distractedSeconds', secStr);
	  
	var screenWidth = window.screen.width * window.devicePixelRatio;
	Qualtrics.SurveyEngine.setEmbeddedData('screenWidth', screenWidth);
    var screenHeight = window.screen.height * window.devicePixelRatio;
	Qualtrics.SurveyEngine.setEmbeddedData('screenHeight', screenHeight);
	  
	Qualtrics.SurveyEngine.setEmbeddedData('userAgent', navigator.userAgent);
	  
	that.clickNextButton();
  });
});

Qualtrics.SurveyEngine.addOnReady(function() {
});

Qualtrics.SurveyEngine.addOnUnload(function() {
});


// For no distractions (focus).
Qualtrics.SurveyEngine.addOnload(function() {
  var vidRolling = false;
  const that = this;
  debugger;
  const vidPlayer = videojs('my-player', {
	playbackRates: [1, 2, 4, 8, 10, 12, 16],
	controls: false,
    playsinline: true,
    preload: 'auto',
	userActions: {click: false, doubleClick: false, hotKeys: false}
  });
	
  document.getElementById('start-btn').addEventListener('click', event => {
    if (! vidRolling) {
	  that.hidePreviousButton();
      videoStartSec = Math.floor(Date.now() / 1000);
	  vidPlayer.play();
	  vidRolling = true;
	  Qualtrics.SurveyEngine.setEmbeddedData('videoStartSecond', videoStartSec);
	  console.log("Video started at UNIX second " + videoStartSec + ".");
    }
  });
	
  vidPlayer.ready(function() {
	playbackSpeed = Qualtrics.SurveyEngine.getEmbeddedData('playbackSpeed');
    vidPlayer.playbackRate(playbackSpeed);
  }); 

  vidPlayer.on('contextmenu', function(e) {
    e.preventDefault();
  });
	
  vidPlayer.on('ended', function() {
	const videoEndSec = Math.floor(Date.now() / 1000);
	Qualtrics.SurveyEngine.setEmbeddedData('videoEndSecond', videoEndSec);
	console.log("Video ended at UNIX second " + videoEndSec + ".");
	  
	var screenWidth = window.screen.width * window.devicePixelRatio;
	Qualtrics.SurveyEngine.setEmbeddedData('screenWidth', screenWidth);
    var screenHeight = window.screen.height * window.devicePixelRatio;
	Qualtrics.SurveyEngine.setEmbeddedData('screenHeight', screenHeight);
	  
	Qualtrics.SurveyEngine.setEmbeddedData('userAgent', navigator.userAgent);
	  
	that.clickNextButton();
  });
});

Qualtrics.SurveyEngine.addOnReady(function() {
});

Qualtrics.SurveyEngine.addOnUnload(function() {
});
