// Load conversationPage and populate the messages 
 var loadConversationPage = function (convoId) {
     $.get('/conversations/display_messages', {conversation_id: convoId})
     .done(function(response) {
         loadPage('conversation', { 
             currentUser: currentUser, 
             receiverUser: response.content.receiverUser, 
             messageArray: response.content.messageArray,
             last_read_status: response.content.last_read_status,
             last_message_id: response.content.last_message_id,
              _id: convoId});
          $('.chat_box').scrollTop($('.chat_box')[0].scrollHeight*(response.content.messageArray.length*20));
          loadMessagePage(convoId,null,null);
     });
 };

  var loadMessagePage = function (convoId,last_id,last_status) {
     $.get('/conversations/display_messages', {conversation_id: convoId})
     .done(function(response) {
      if(last_id !== response.content.last_message_id || last_status !== response.content.last_read_status){
       // console.log("last_id",last_id);
       // console.log("last_status",last_status);
       // console.log("req.last_id",response.content.last_message_id);
       // console.log("req.last_status",response.content.last_read_status);
        last_id = response.content.last_message_id;
        last_status = response.content.last_read_status;
         $('.chat_box').html(Handlebars.templates['message']({ 
             currentUser: currentUser, 
             receiverUser: response.content.receiverUser, 
             messageArray: response.content.messageArray,
             last_read_status: response.content.last_read_status,
             last_message_id: response.content.last_message_id,
              _id: convoId}));
         // console.log(response.content.messageArray.length);
         $('.chat_box').scrollTop($('.chat_box')[0].scrollHeight*(response.content.messageArray.length*20));
       }
       setTimeout(loadMessagePage(convoId,last_id,last_status), 10000);
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
    // loadPage('conversation', { 
    //     currentUser: currentUser, 
    //     receiverUser: response.content.receiverUser, 
    //     messageArray: response.content.messageArray,
    //     last_read_status: response.content.last_read_status,
    //     last_message_id: response.content.last_message_id, 
    //     _id:response.content._id});
    loadConversationPage(response.content._id);
    });
  });

  // //to send messages by click submitting new messages
  // $(document).on('click', '#submit_new_message', function(evt) {
  //   evt.preventDefault();
  //   var item = document.getElementById("conversation");;
  //   var convoId= item.getAttribute("conversationId");
  //     var content = $('#new_message_input').val();
  //     if (content.trim().length === 0) {
  //         alert('no empty message can be sent');
  //         return;
  //     }
  //     $.post(
  //         '/conversations/create_message',
  //         { content: content,
  //           conversation_id: convoId
  //          }
  //     ).done(function(response) {
  //       convoId = response.content.convoId;
  //       loadConversationPage(convoId);
  //     }).fail(function(responseObject) {
  //         var response = $.parseJSON(responseObject.responseText);
  //         $('.error').text(response.err);
  //     });
  // });

   //to send messages by click submitting new messages
  $(document).on('click', '#submit_new_message', function(evt) {
    evt.preventDefault();
    var item = document.getElementById("conversation");;
    var convoId= item.getAttribute("conversationId");
    var objDiv = document.getElementsByClassName("chat_box");
    objDiv.scrollTop = objDiv.scrollHeight;

      var content = $('#new_message_input').val();
      if (content.trim().length === 0) {
          alert('no empty message can be sent');
          return;
      }
      $.post(
          '/conversations/create_message',
          { content: content,
            conversation_id: convoId
           })
      .done(function(response) {
        convoId = response.content.convoId;
        loadConversationPage(convoId);
      });
  });

})();
