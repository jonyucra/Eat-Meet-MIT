// // Load homepage and populate it with current match, if one exists 
// var loadConversationPage = function () {
//     console.log("Getting ready to get Conversation info")
//     $.get('/conversation', function(response) {
//         console.log("Gonna load the conversation page")
//         loadPage('conversation', { 
//             currentUser: currentUser, receiver: receiverUser, messageArray: response.content.messagearray });
//     });
// };

// Wrapped in an immediately invoked function expression.
(function() {
  $(document).on('click', '#submit_new_message', function(evt) {
    //evt.preventDefault();
     // console.log("evt:",evt);
    //console.log("test:", evt.currentTarget.childNodes[0].nodeValue);
      //var receiverUserz = evt.currentTarget.childNodes[0].nodeValue;
      var item = $(this).parent();
      var Convid = item.data('conversation-id');      
      var content = $('#new_message_input').val();
      if (content.trim().length === 0) {
          alert('no empty message can be sent');
          return;
      }
      $.post(
          '/conversations',
          { content: content,
            conversation_id: Convid
           }
      ).done(function(response) {
         $.get('/conversations/messages_display', function(response) {
          loadPage('conversation', { 
            currentUser: currentUser, receiverUser: response.content.receiverUser, messageArray: response.content.messagearray });
        });
          //loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
