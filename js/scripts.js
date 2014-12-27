//Funcoes especificas do Phonegap
var celular_modelo = "";	
var celular_plataforma = "";
var celular_uuid = "";
var celular_versao = "";
var isPhoneGapReady = false;
var isConnected = false;
var isHighSpeed = false;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
	 
document.addEventListener("deviceready", onDeviceReady, false);
	 
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
	isPhoneGapReady = true;
	// detect for network access
	networkDetection();
	// attach events for online and offline detection
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
			
	var conteudo = "";
	conteudo = conteudo + 'Modelo: '    + device.model    + '<br />';
	conteudo = conteudo + 'Plataforma: ' + device.platform + '<br />';
	conteudo = conteudo + 'UUID: '     + device.uuid     + '<br />';
	conteudo = conteudo + 'Vers�o: '  + device.version  + '<br />';
	conteudo = conteudo + 'Bateria: '  + status_bateria  + '<br />';
			
	celular_modelo = device.model;
	celular_plataforma = device.platform;
	celular_uuid = device.uuid;
	celular_versao = device.version;
	$("#deviceproperties").append(conteudo);
	
}

function networkDetection() {
	if (isPhoneGapReady) {
		// as long as the connection type is not none,
		// the device should have Internet access
		if (navigator.network.connection.type != Connection.NONE) {
			isConnected = true;
		}
		// determine whether this connection is high-speed
		switch (navigator.network.connection.type) {
			case Connection.UNKNOWN:
			case Connection.CELL_2G:
				isHighSpeed = false;
				break;
			default:
				isHighSpeed = true;
				break;
		}
	}
}
		
function onOnline() {
	isConnected = true;
}

function onOffline() {
	isConnected = false;
}
		
	 
function clearCache() {
	    navigator.camera.cleanup();
}
	 
	var retries = 0;
	function onCapturePhoto(fileURI) {
	    var win = function (r) {
	        clearCache();
	        retries = 0;
	        alert('Concluido!');
			$.mobile.changePage("#main");
	    }
	 
	    var fail = function (error) {
	        if (retries == 0) {
	            retries ++
	            setTimeout(function() {
	                onCapturePhoto(fileURI)
	            }, 1000)
	        } else {
	            retries = 0;
	            clearCache();
	            alert('Ocorreu um problema!');
				$.mobile.changePage("#main");
	        }
	    }
	 
	    var options = new FileUploadOptions();
	    options.fileKey = "recFile";
	    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
	    options.mimeType = "image/jpeg";
	    options.params = {}; // if we need to send parameters to the server request
	    var ft = new FileTransfer();
	    ft.upload(fileURI, encodeURI("http://www.gotasdecidadania.com.br/novo/programado/upload_foto.php"), win, fail, options);
	}
	 
	function capturePhoto() {
	    navigator.camera.getPicture(onCapturePhoto, onFail, {
	        quality: 100,
	        destinationType: destinationType.FILE_URI
	    });
	}
	 
	function onFail(message) {
	    alert('Ocorreu o seguinte erro: ' + message);
	}
	
	
	$(document).on('pageshow', '#foto', function(){ 
		if (isPhoneGapReady){
			if (isConnected) {
				capturePhoto();
			} else {
				alert('N�o existe conex�o com a Internet');
				$.mobile.changePage("#main");
			}				
		} else {
			alert('O aplicativo n�o est� pronto!');
			$.mobile.changePage("#main");
		}
	});