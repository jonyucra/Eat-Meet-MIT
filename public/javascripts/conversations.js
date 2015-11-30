// Load conversationPage and populate the messages 
 var loadConversationPage = function (convoId) {
     $.get('/conversations/display_messages', {conversation_id: convoId}, function(response) {
         loadPage('conversation', { 
             currentUser: currentUser, receiverUser: response.content.receiverUser.receiver_username, 
             messageArray: response.content.messageArray, _id: convoId});
     });
 };

// Wrapped in an immediately invoked function expression.
(function() {
  
  //to display current conversation with any people in the current network 
  $(document).on('click', '.sendMessage', function(evt){
    var receiverUser = evt.currentTarget.childNodes[0].nodeValue;
    $.get('/conversations/messages',
      {receiverUser: receiverUser})
    .done( function(response) {
    loadPage('conversation', { 
        currentUser: currentUser, receiverUser: response.content.receiverUser, messageArray: response.content.messageArray, _id:response.content._id});
    });
  });

  //to send messages by click submitting new messages
  $(document).on('click', '#submit_new_message', function(evt) {
    evt.preventDefault();
    var item = document.getElementById("conversation");;
    var convoId= item.getAttribute("conversationId");
      var content = $('#new_message_input').val();
      if (content.trim().length === 0) {
          alert('no empty message can be sent');
          return;
      }
      $.post(
          '/conversations/create_message',
          { content: content,
            conversation_id: convoId
           }
      ).done(function(response) {
        convoId = response.content.convoId;
        loadConversationPage(convoId);
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
