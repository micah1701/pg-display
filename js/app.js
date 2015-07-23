

// global vars
var remoteXHR = 'http://micahj.com/code/displayit/request.php';
    MACaddress = false,
    displayit_id = false;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    if(!displayit_id)
    {
    	window.MacAddress.getMacAddress(
    		function(macAddress) {
    			$("#pagebody").html("Fetching Account infor");
    			$("#mac").html("MAC Address: "+macAddress);
                $.getJSON(remoteXHR,{mac:macAddress},function(){
                    if(!data)
                    {
                        $("#pagebody").load('views/register.html');
                    }
                    else
                    {
                        alert("great, we know who you are.  here's some contetn");
                    }
                })
    		},	
    		function(failed) {
    			alert(failed);
    		}
    	);        
    }


	
	// turn on "auto start" for this device on load.
	cordova.plugins.autoStart.enable();

}