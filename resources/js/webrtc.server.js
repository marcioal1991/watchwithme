//Initializing a peer connection
var caller = new RTCPeerConnection();
var remoteCaller = new RTCPeerConnection();
var dataChannel = caller.createDataChannel('myChannel');
var remoteDataChannel;
var sendMessage = document.getElementById("self");
var remoteUserMessage = document.getElementById("remoteUser");

dataChannel.binaryType = 'arraybuffer';

caller.ondatachannel = function (channel) {
    remoteDataChannel = channel.channel;
    remoteDataChannel.binaryType = 'arraybuffer';
};
dataChannel.onopen = function () {
    console.log("Channel Opened");
};

dataChannel.onclose = function () {
    console.log("Channel Closed");
};

dataChannel.onmessage = function (event) {
    remoteUserMessage.value = event.data;
};

dataChannel.onerror = function () {

};

sendMessage.addEventListener("keyup", function (evt) {

    remoteDataChannel.send(sendMessage.value);
});
//Listen for ICE Candidates and send them to remote peers
caller.onicecandidate = function (evt) {
    if (!evt.candidate) { 
        return;
    } 

    console.log("onicecandidate called");
    onIceCandidate(caller, evt);
};

//onaddstream handler to receive remote feed and show in remoteview video element


//Create and send offer to remote peer on button click
document.getElementById("makeCall").addEventListener("click", function () {
    caller.createOffer().then(function (desc) {
        caller.setLocalDescription(new RTCSessionDescription(desc));
        socket.emit("sdp", JSON.stringify({ "sdp": desc }));
    });
});

//Send the ICE Candidate to the remote peer
function onIceCandidate(peer, evt) {
    console.log(peer, evt)
    if (evt.candidate) {
        socket.emit("candidate", JSON.stringify({ "candidate": evt.candidate }));
    }
}

//Communications with the remote peer through signaling server
socket.on("connect", function (client) {
    //Connection established with the signaling server
    console.log("connected!");

    //Listening for the candidate message from a peer sent from onicecandidate handler
    socket.on("candidate", function (msg) {
        console.log("candidate received");
        caller.addIceCandidate(new RTCIceCandidate(JSON.parse(msg).candidate));

    });

    //Listening for Session Description Protocol message with session details from remote peer
    socket.on("sdp", function (msg) {
        console.log("sdp received", msg);
        var sessionDesc = new RTCSessionDescription(JSON.parse(msg).sdp);
        caller.setRemoteDescription(sessionDesc);
        caller.createAnswer().then(function (sdp) {
            caller.setLocalDescription(new RTCSessionDescription(sdp));
            socket.emit("answer", JSON.stringify({ "sdp": sdp }));
        });
    });

    //Listening for answer to offer sent to remote peer
    socket.on("answer", function (answer) {
        caller.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer).sdp));
    });
});
