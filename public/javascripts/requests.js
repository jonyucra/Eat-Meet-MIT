// Wrap in an immediately invoked function expression.
(function() {

  // Event handler for whenever a user submits a request
  $(document).on('submit', '#requestForm', function(evt) {
      evt.preventDefault();
      var checkedTimes = [];
      var checkedPlaces = [];

      $("input:checkbox[name=time]:checked").each(function(){
              checkedTimes.push($(this).val());
      });

      $("input:checkbox[name=place]:checked").each(function(){
              checkedPlaces.push($(this).val());
      });

      if (checkedTimes.length === 0 || checkedPlaces.length === 0) {
          alert('Must indicate a time and place!');
          return;
      }

      var formData = {currentUser: currentUser, times: checkedTimes, places : checkedPlaces}; 
      $.post(
          '/requests',
          formData
      ).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });

  });

  // Event handler for whenever a user asks to see network 
  $(document).on('click', '#backHome', function(evt) {
      loadPage('homepage');
  }); 

  $(document).on('click','#cancelRequestBtn', function(evt) {
  $.post(
      '/requests/cancelpending',
      {currentUser:currentUser}
    ).done(function(res){
      loadHomePage();
    });
  });

  $(document).on('click','#cancelDinnerBtn', function(evt) {
  $.post(
      '/requests/cancelmatched',
      {currentUser:currentUser}
    ).done(function(res){
      loadHomePage();
    });
  });

})();
