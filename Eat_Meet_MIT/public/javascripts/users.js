// Wrap in an immediately invoked function expression.
(function() {

  // Event handler for whenever a new user logs in
  $(document).on('submit', '#loginForm', function(evt) {
      evt.preventDefault();
      //$('.error').text(response.err);
      loadPage('homepage');
      // TODO add more functionality
  });

  // Event handler for whenever a new user registers 
  $(document).on('submit', '#registerForm', function(evt) {
      evt.preventDefault();
      // TODO add more functionality
      //var formData = helpers.getFormData(this);
      //if (formData.password !== formData.confirm) {
      //    $('.error').text('Password and confirmation do not match!');
      //    return;
      //}
      //$('.error').text(response.err);
      loadPage('homepage');
  });

  // Event handler for whenever a user asks for a request
  $(document).on('click', '#makeRequest', function(evt) {
      loadPage('request');
      // TODO add more functionality
  }); 

  // Event handler for whenever a user asks to see network 
  $(document).on('click', '#seeNetwork', function(evt) {
      alert('No network feature added :(');
      // TODO add more functionality
  }); 

  // Event handler for whevner a user logs out
  $(document).on('click', '#logoutLink', function(evt) {
      evt.preventDefault();
      //$('.error').text(response.err);
      loadPage('index');
      // TODO make sure functionality met 
  });
})();
