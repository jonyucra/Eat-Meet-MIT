// Wrap in an immediately invoked function expression.
(function() {

  // Event handler for whenever a user submits a request
  $(document).on('submit', '#requestForm', function(evt) {
      evt.preventDefault();
      var checkedTimes = [];
      var checkedPlaces = [];
      //var selectedSize = [];

      $("input:checkbox[name=time]:checked").each(function(){
              checkedTimes.push($(this).val());
      });

      $("input:checkbox[name=place]:checked").each(function(){
              checkedPlaces.push($(this).val());
      });

      //$("input:radio:checked").each(function(){
      //        selectedSize.push($(this).val());
      //});

      // TODO add more functionality
      var formData = {currentUser: currentUser, times: checkedTimes, places : checkedPlaces}; 
      //var formData = helpers.getFormData(this);
      $.post(
          '/requests',
          formData
      ).done(function(response) {
          // TODO uncomment once matching works, and remove following line
          loadHomePage();
          //loadIndexPage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });

  });

  // Event handler for whenever a user asks to see network 
  $(document).on('click', '#backHome', function(evt) {
      // FIXME loadHomePage() when routing works 
      loadPage('homepage');
  }); 

})();
