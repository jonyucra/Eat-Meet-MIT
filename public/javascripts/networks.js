// Register partial for the networkMember templates
Handlebars.registerPartial('conversation', Handlebars.templates['conversation']);

// load conversation and populate it with messages
// var loadConversation = function(convoId) {
//     $.get('/networks/' + convoId, function (reponse) {
//         loadPage('conversation', {otherUser: response.content.otherUser,
//         messages: response.content.messages, currentUser: currentUser})
//     });
// };

// Wrap in an immediately invoked function expression.
(function() {

  // Event handler for whenever a user sends a message 
 // $(document).on('submit', '.sendMessage', function(evt) {
 //     evt.preventDefault();
 //     // FIXME uncomment following lines when templates made/routing finished 
 //     //var item = $(this).parent();
 //     //var convoId = item.data('conversation-id');
 //     //loadConversation(convoId);

 // });

  // Event handler for whenever a user accepts a friend request 
  $(document).on('click', '.acceptRequest', function(evt) {
      evt.preventDefault();
      alert('don\'t have this functionality yet :(');
      // FIXME uncomment following lines when routing works 
      //var item = $(this).parent();
      //var otherUser = item.data('other-user');
      //$.post('networks/addUser',
      //    { content: otherUser } )
      //.done(function(response) {
      //    loadNetwork();
      //}).fail(function(responseObject) {
      //    var response = $.parseJSON(responseObject.responseText);
      //    $('.error').text(response.err);
      //});
  }); 

  // Event handler for whenever a user adds a message to the current conversation
 // $(document).on('submit', '#new_message', function(evt) {
 //     evt.preventDefault();
 //     $.post(
 //         '/messages',
 //         helpers.getFormData(this)
 //     ).done(function(response) {
 //         var item = $(this).parent();
 //         var convoId = item.data('conversation-id');
 //         loadConversation(convoId);
 //     }).fail(function(responseObject) {
 //         var response = $.parseJSON(responseObject.responseText);
 //         $('.error').text(response.err);
 //     });
 // }); 


})();
