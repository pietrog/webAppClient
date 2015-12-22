(function(){
    'use strict';

    angular.module('parap')
	.factory('InfoBarFactory', InfoBar);
    
    function InfoBar($rootScope){
	var infobar = {
	    startOffset: 0,
	    maxSize: 5,
	    messageArray: [],
	    addWarning: addWarn,
	    addDanger: addDanger,
	    addSuccess: addSuccess,
	    clearMessages: clearAll
	};


	function addWarn(message){
	    pushMessage("alert alert-warning", message);
	};

	function addDanger(message){
	    pushMessage("alert alert-danger", message);
	};

	function addSuccess(message){
	    pushMessage("alert alert-success", message);
	};

	function pushMessage(format, message){
	    if (infobar.length < infobar.maxSize){
		infobar.messageArray.push({ class: format, event: message });
	    }
	    else{
		var pos = ((infobar.startOffset + infobar.maxSize) % infobar.maxSize);
		infobar.startOffset += 1;
		infobar.messageArray[pos] = { class: format, event: message };
	    }
	    
	};

	function clearAll(){
	    infobar.messageArray = [];
	    infobar.startOffset = 0;
	}

	return infobar;
    };

})();
