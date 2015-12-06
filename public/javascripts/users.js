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
          console.log("Getting ready to call from users eventHandlers")
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
    console.log("Getting Suggestion")
    $.get("/requests/suggestion", function (response) {
      console.log("Got the suggestion");
      loadPage('request', {currentUser: currentUser, diningHall: response.content.diningHall, diningTime:response.content.dinnerTime});

      var dt = new Date();
      $("input:checkbox[name=time]").each(function(){
           if ( $(this).val() <= dt.getHours() ) {
               $(this).prop('disabled', true);
           }
      });
    })
      
  }); 

  // Event handler for whenever a user asks to see network 
  $(document).on('click', '#seeNetwork', function(evt) {
      //console.log('network Button Clicked!');
      if (polling) {polling.abort();};
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
      if (polling) {polling.abort();};   
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

