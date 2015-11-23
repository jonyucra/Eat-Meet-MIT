// Wrapped in an immediately invoked function expression.
(function() {
  $(document).on('click', '#submit_new_message', function(evt) {
      var content = $('#new_message_input').val();
      if (content.trim().length === 0) {
          alert('no empty message can be sent');
          return;
      }
      $.post(
          '/messages',
          { content: content }
      ).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

})();
