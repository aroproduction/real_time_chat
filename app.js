// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyD_SZeQ9PKIaWKdWZNgCNjRzgjWyAfeVj0",
    authDomain: "real-time-chat-9994e.firebaseapp.com",
    projectId: "real-time-chat-9994e",
    storageBucket: "real-time-chat-9994e.appspot.com",
    messagingSenderId: "983591956854",
    appId: "1:983591956854:web:51b65e460c5636e0568a57",
    measurementId: "G-ZFYV28N60B"
  };
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the chat messages database
  var messagesRef = firebase.database().ref("messages");

  // Listen for new messages and append them to the chat UI
  messagesRef.on("child_added", function (snapshot) {
    var message = snapshot.val();
    var messageHtml = "<div><strong>" + message.name + ": </strong>" + message.message + "</div>";
    $(".chat-messages").append(messageHtml);
  });

  // Send a new message when the user clicks the Send button
  $(".chat-input button").on("click", function () {
    var name = $("#name").val();
    var message = $("#message").val();

    if (message !== "") {
      messagesRef.push({ name: name, message: message });
      $(".chat-input input").val("");
    }
  });

  // Send a new message when the user presses the Enter key
  $(".chat-input input").on("keypress", function (event) {
    if (event.which === 13) {
      event.preventDefault();
      $(".chat-input button").click();
    }
  });