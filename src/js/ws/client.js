const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function(event) {
  // Handle connection open
};

socket.onmessage = function(event) {
  // Handle received message
};

socket.onclose = function(event) {
  // Handle connection close
};

function sendMessage(message) {
  socket.send(message);
}