//Funcoes especificas do Phonegap
var isPhoneGapReady = false;
var isConnected = false;
var isHighSpeed = false;
	 
document.addEventListener("deviceready", onDeviceReady, false);
	 
function onDeviceReady() {
	isPhoneGapReady = true;
	// detect for network access
	networkDetection();
	// attach events for online and offline detection
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
		
}

function networkDetection() {
	if (isPhoneGapReady) {
		
		
		var states = {};
		states[navigator.connection.UNKNOWN]  = 'Unknown connection';
		states[navigator.connection.ETHERNET] = 'Ethernet connection';
		states[navigator.connection.WIFI]     = 'WiFi connection';
		states[navigator.connection.CELL_2G]  = 'Cell 2G connection';
		states[navigator.connection.CELL_3G]  = 'Cell 3G connection';
		states[navigator.connection.CELL_4G]  = 'Cell 4G connection';
		states[navigator.connection.NONE]     = 'No network connection';
		var tipo_conexao = states[navigator.connection.type];
		
		if (tipo_conexao != 'No network connection') {
			isConnected = true;
		}
		
	}	
}
		
function onOnline() {
	isConnected = true;
}

function onOffline() {
	isConnected = false;
}
