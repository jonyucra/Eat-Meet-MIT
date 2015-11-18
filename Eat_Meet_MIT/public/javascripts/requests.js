// Wrap in an immediately invoked function expression.
(function() {

  // Event handler for whenever a user submits a request
  $(document).on('submit', '#requestForm', function(evt) {
      evt.preventDefault();
      alert('Currently don\'t offer this functionality -- sorry :(');
      // TODO add more functionality
      var formData = helpers.getFormData(this);
      console.log(formData);
      //if (formData.password !== formData.confirm) {
      //    $('.error').text('Password and confirmation do not match!');
      //    return;
      //}
      //$('.error').text(response.err);
  });

  // Event handler for whenever a user asks to see network 
  $(document).on('click', '#backHome', function(evt) {
      loadPage('homepage');
      // TODO add more functionality
  }); 

})();
