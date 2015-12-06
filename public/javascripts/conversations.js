//global variable to terminate the long polling
polling=undefined;

//define the message height in the chat box
var message_height = 20;

//Load initial conversation page and fire message check repetitively
var loadInitialConv = function(convoId){
     $.get('/conversations/display_messages', {conversation_id: convoId})
     .done(function(response) {
         loadPage('conversation', { 
             currentUser: currentUser, 
             receiverUser: response.content.receiverUser, 
             messageArray: response.content.messageArray,
             last_read_status: response.content.last_read_status,
             last_message_id: response.content.last_message_id,
              _id: convoId});
          $('.chat_box').scrollTop($('.chat_box')[0].scrollHeight*(response.content.messageArray.length*message_height));
          loadMessagePage(convoId,response.content.last_message_id,response.content.last_read_status)  
     });
};

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
          $('.chat_box').scrollTop($('.chat_box')[0].scrollHeight*(response.content.messageArray.length*message_height));
     });
 };

//Load chat_box if there is new message coming or update in the reading status of the last sending message
  var loadMessagePage = function (convoId,last_id,last_status) {
     polling = $.get('/conversations/display_messages', {conversation_id: convoId})
     .done(function(response) {
      // console.log("@loadMessagePage, current last_id:", last_id);
      // console.log("@loadMessagePage, current last_status:", last_status);
      // console.log("@loadMessagePage, current response.last_id:", response.content.last_message_id);
      // console.log("@loadMessagePage, current response.last_status:", response.content.last_read_status);           
      if(last_id !== response.content.last_message_id || last_status !== response.content.last_read_status){
        last_id = response.content.last_message_id;
        last_status = response.content.last_read_status;
        // console.log("last_message:",response.content.messageArray[response.content.messageArray.length-1]);
         $('.chat_box').html(Handlebars.templates['message']({ 
             currentUser: currentUser, 
             receiverUser: response.content.receiverUser, 
             messageArray: response.content.messageArray,
             last_read_status: response.content.last_read_status,
             last_message_id: response.content.last_message_id,
              _id: convoId}));
         $('.chat_box').scrollTop($('.chat_box')[0].scrollHeight*(response.content.messageArray.length*message_height));
       }
       setTimeout(loadMessagePage(convoId,last_id,last_status), 30000);
     });
 };

//  //Load chat_box if there is new message coming or update in the reading status of the last sending message
//   var loadMessagePage = function (convoId,last_id,last_status) {
//      $.ajax( {type: 'GET',
//       url:'/conversations/display_messages', 
//       data:'{"conversation_id":"' + convoId + '"}',
//       // data: {conversation_id: convoId},
//       contentType: "application/json; charset=utf-8",
//       dataType: "json",
//       success: function(response) {          
//         if(last_id !== response.content.last_message_id || last_status !== response.content.last_read_status){
//           last_id = response.content.last_message_id;
//           last_status = response.content.last_read_status;
//           // console.log("last_message:",response.content.messageArray[response.content.messageArray.length-1]);
//            $('.chat_box').html(Handlebars.templates['message']({ 
//                currentUser: currentUser, 
//                receiverUser: response.content.receiverUser, 
//                messageArray: response.content.messageArray,
//                last_read_status: response.content.last_read_status,
//                last_message_id: response.content.last_message_id,
//                 _id: convoId}));
//            $('.chat_box').scrollTop($('.chat_box')[0].scrollHeight*(response.content.messageArray.length*message_height)); 
//         };
//       },
//       complete: function(){loadMessagePage(convoId,last_id,last_status);},
//       timeout: 30000
//  });
// };


// Wrapped in an immediately invoked function expression.
(function() {
  
  //to display current conversation with any people in the current network 
  $(document).on('click', '.sendMessage', function(evt){
     console.log("in click sendmessage tst polling:",polling);      
    //clearTimeout(polling);
    var receiverUser = evt.currentTarget.childNodes[0].nodeValue;
    $.get('/conversations/messages',
      {receiverUser: receiverUser})
    .done( function(response) {
      loadInitialConv(response.content._id);
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
         })
    .done(function(response) {
      convoId = response.content.convoId;
      loadConversationPage(convoId);
    });
  });

})();
