const localRTC = new RTCPeerConnection();
// var remoteCaller = new RTCPeerConnection();
const dataChannel = localRTC.createDataChannel('channel');
let remoteRTC;


export { localRTC, dataChannel, remoteRTC };