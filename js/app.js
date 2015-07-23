

// global vars
var remoteXHR = 'http://micahj.com/code/displayit/request.php';
    MACaddress = false,
    displayit_id = false;


// set up "device ready"
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    if(!displayit_id)
    {
    	// reload every 30 seconds while we wait
        setTimeout("window.location.reload();", 30000);
    	
    	window.MacAddress.getMacAddress(
    		function(macAddress) {
    			$("#status").html("Fetching Account info").fadeIn(0);
    			$("#mac").html("MAC Address: "+macAddress).fadeIn('fast');
                $.getJSON(remoteXHR,{action:'checkDevice',mac:macAddress},function(data){
                    if(!data)
                    {
                        $("#pagebody").load('views/register.html');
                        $("#status").fadeOut('fast');
                    }
                    else
                    {
                        displayit_id = data;
                        $("#mac").fadeOut('fast');
                        loadContent();
                    }
                });
    		},	
    		function(failed) {
    			alert(failed);
    		}
    	);        
    }
    else
    {
        loadContent();
    }
	// turn on "auto start" for this device on load.
	cordova.plugins.autoStart.enable();
	
	// keep awake (so screen doesn't dim while content is static)
	window.plugins.insomnia.keepAwake(function(){ alert("I'm keeping you awake now")});
	
} // end "on Device Ready"

function loadContent()
{
    $("#status").html('checking...').fadeIn(0);
    $.get(remoteXHR,{action:'getContent',id: displayit_id },function(data){
        var current_display = $("#pagebody").html();
        if(data != current_display)
        {
            $("#pagebody").html(data);            
        }
        $("#status").fadeOut('fast');
        setTimeout("loadContent",60000); // reload this function in a minute
    });
}