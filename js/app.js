

// global vars
var remoteXHR = 'http://micahj.com/code/displayit/request.php';
    MACaddress = false,
    displayit_id = false;

// reload every minute
setTimeout("window.location.reload();",60000);

// set up "device ready"
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    if(!displayit_id)
    {
    	window.MacAddress.getMacAddress(
    		function(macAddress) {
    			$("#status").html("Fetching Account info").fadeIn(0);
    			$("#mac").html("MAC Address: "+macAddress);
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
} // end "on Device Ready"

function loadContent()
{
    $("#status").html('checking...').fadeIn(0);
    $.get(remoteXHR,{action:'getContent',id:displayit_id},function(data){
        var current_display = $("#pagebody").html();
        if(data != current_display)
        {
            $("#pagebody").html(data);            
        }
        $("#status").fadeOut('fast');
    });
}