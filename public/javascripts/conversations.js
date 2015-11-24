// // Load homepage and populate it with current match, if one exists 
// var loadConversationPage = function () {
//     console.log("Getting ready to get Conversation info")
//     $.get('/conversation', function(response) {
//         console.log("Gonna load the conversation page")
//         loadPage('conversation', { 
//             currentUser: currentUser, receiver: receiverUser, messageArray: response.content.messagearray });
//     });
// };

 var loadConversationPage = function (convoId) {
     $.get('/users/poodle', {conversation_id: convoId}, function(response) {
     console.log('response: ', response.content);
         loadPage('conversation', { 
             currentUser: currentUser, receiverUser: response.content.receiverUser.receiver_username, 
             messageArray: response.content.messageArray, conversationId: convoId});
     });
 };

// Wrapped in an immediately invoked function expression.
(function() {
  $(document).on('click', '#submit_new_message', function(evt) {
    console.log("Submitting a new message");
    evt.preventDefault();
     // console.log("evt:",evt);
    //console.log("test:", evt.currentTarget.childNodes[0].nodeValue);
      //var receiverUserz = evt.currentTarget.childNodes[0].nodeValue;
      var item = document.getElementById("conversation");
      var convoId = item.getAttribute("conversationId");
      var content = $('#new_message_input').val();
      console.log("CONTENT",content)
      console.log("CONVID",convoId);
      if (content.trim().length === 0) {
          alert('no empty message can be sent');
          return;
      }
      $.post(
          '/users/labrador',
          { content: content,
            conversation_id: convoId
           }
      ).done(function(response) {
        console.log("GETTING READY TO GET MESSAGES_DISPLAY");
        console.log("response: ", response.content.convoId);
        convoId = response.content.convoId;
        loadConversationPage(convoId);
        // $.get('/users/poodle', function(response) {
        //  loadPage('conversation', { 
        //    currentUser: currentUser, receiverUser: response.content.receiverUser, messageArray: response.content.messagearray });
        //});
      }).fail(function(responseObject) {
        console.log(responseObject);
        console.log("I FAILED?")
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
