// Wrap in an immediately invoked function expression.
(function() {

  // Event handler for whenever a new user logs in
  $(document).on('submit', '#loginForm', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/login',
          helpers.getFormData(this)
      ).done(function(response) {
          currentUser = response.content.user;
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  // Event handler for whenever a new user registers 
  $(document).on('submit', '#registerForm', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      console.log(formData);
      if (formData.password !== formData.confirm) {
          $('.error').text('Password and confirmation do not match!');
          return;
      }
      if (formData.email.indexOf('@mit.edu') == -1) {
          $('.error').text('Email is not an MIT email!');
          return;
      }
      delete formData['confirm'];
      $.post(
          '/users',
          formData
      ).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  // Event handler for whenever a user asks for a request
  $(document).on('click', '#makeRequest', function(evt) {
      loadPage('request');
  }); 

  // Event handler for whenever a user asks to see network 
  $(document).on('click', '#seeNetwork', function(evt) {
      alert('No network feature added :(');
      // TODO add more functionality
  }); 

  // Event handler for whevner a user logs out
  $(document).on('click', '#logoutLink', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/logout'
      ).done(function(response) {
          currentUser = undefined;
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
