// Register partial for the networkMember templates
Handlebars.registerPartial('networkMember', Handlebars.templates['networkMember']);

// Register partial for the potentialFriend templates
Handlebars.registerPartial('potentialFriend', Handlebars.templates['potentialFriend']);

// load networkContainer and populate it with networkMembers and potentialFriends
var loadNetwork = function() {
    $.get('/networks/', function (response) {
        loadPage('networkContainer', { networkMembers: response.content.network,
        potentialFriends: response.content.potentialFriends, currentUser: currentUser})
        }); 
};

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
          // TODO uncomment once matching works, and remove following line
          //loadHomePage();
          loadIndexPage();
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
          // TODO uncomment once matching works, and remove following line
          //loadHomePage();
          loadIndexPage();
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
      loadPage('networkContainer');
      // FIXME uncomment following code whenever the routing's done
      //$.get('/networks', function (response) {
      //    loadPage('networkContainer', { networkMembers: response.content.network,
      //        potentialFriends: response.content.potentialFriends, currentUser: currentUser});
      //    }); 
  }); 

  // Event handler for whevner a user logs out
  $(document).on('click', '#logoutLink', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/logout'
      ).done(function(response) {
          currentUser = undefined;
          // TODO uncomment once matching works, and remove following line
          //loadHomePage();
          loadIndexPage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();

