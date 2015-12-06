// Register partial for the networkMember templates
Handlebars.registerPartial('networkMember', Handlebars.templates['networkMember']);

// Register partial for the potentialFriend templates
Handlebars.registerPartial('potentialFriend', Handlebars.templates['potentialFriend']);

// load networkContainer and populate it with networkMembers and potentialFriends
var loadNetwork = function() {
    $.get('/users/network', function (response) {
        loadPage('networkContainer', 
          { friends_name: response.content.friends_name, 
            output: response.content.output,
            friend_no_message: response.content.friend_no_message,
            currentUser: currentUser})
        }); 
};

/* Check if password is strong: at least 8 characters with 1 number
 *
 * @password password given by user
 *
 * @return true if the given password meets the requirements
 */
//var checkPasswordStrength = function(password) {
//    var strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
//    return password.match(strongPasswordRegex);
//}

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
      //if (formData.password != '' || checkPasswordStrength(password)) {
      //    $('.error').text('Password must contain at least 8 characters with 1 number, 1 uppercase letter, and 1 lowercase letter!');
      //    return;
      //}
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
      loadPage('request', {currentUser: currentUser});

      var dt = new Date();
      $("input:checkbox[name=time]").each(function(){
           if ( $(this).val() <= dt.getHours() ) {
               $(this).prop('disabled', true);
           }
      });
  }); 

  // Event handler for whenever a user asks to see network 
  $(document).on('click', '#seeNetwork', function(evt) {
      console.log('network Button Clicked!');
      loadNetwork();
      // FIXME uncomment following code whenever the routing's done
      //$.get('/networks', function (response) {
      //    loadPage('networkContainer', { networkMembers: response.content.network,
      //        potentialFriends: response.content.potentialFriends, currentUser: currentUser});
      //    }); 
  });

  $(document).on('click','#dinnerCompleteBtn', function(evt) {
    var personEatWith = document.getElementById("personEatWith").innerHTML;
    $.post(
        '/users/network',
        {otherPerson:personEatWith}
      ).done(function(res){
        //loadNetworkPage();
        loadNetwork();
      })
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

