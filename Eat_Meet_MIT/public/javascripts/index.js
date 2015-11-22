// Register partial for followTweet templats
Handlebars.registerPartial('match', Handlebars.templates['match']);

// Register helper to process '===' boolean operation
Handlebars.registerHelper('ifEq', function (v1, operator, v2, options) {
    switch (operator) {
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
    }
});

// Global variable set when a user is logged in. Note
// that this is unsafe on its own to determine this: we 
// must still verify every server request. This is just 
// for convenience across all client-side code.
currentUser = undefined;

// Fill main container with specified template
var loadPage = function(template, data) { 
    data = data || {};
    $('#main-container').html(Handlebars.templates[template](data));
};

// Load app's index page or home page depending on whether or not their is a user
// currently logged in
var loadIndexPage = function() {                                    
    if (currentUser) {
        // TODO uncomment this line and remove loadPage('homepage')
        //      once matching works
        //loadHomePage();                                           
        loadPage('homepage');
        
    } else {                                                       
        // TODO change this back to 'index'
        loadPage('index');                                         
    }                                                              
};

// Load homepage and populate it with current match, if one exists 
var loadHomePage = function () {
    $.get('/requests', function(response) {
        loadPage('homepage', { request: reponse.content.request, match: response.content.match,
            currentUser: currentUser });
    });
};

$(document).ready(function () {
    $.get('/users/current', function(response) {                   
        if (response.content.loggedIn) {                           
              currentUser = response.content.user;                   
          }
          loadIndexPage();
    });
});

// Handle click for loginBtn button
$(document).on('click', '#loginBtn', function(evt) {
    loadPage('login');
    });

// Handle click for regiserBtn button
$(document).on('click', '#registerBtn', function(evt) {
  loadPage('register');
});

// Handle click for homeLink link 
$(document).on('click', '#homeLink', function(evt) {
 evt.preventDefault();
 loadIndexPage();
});

// Handle click for indexLink link 
$(document).on('click', '#indexLink', function(evt) {
 evt.preventDefault();
 loadPage('index');
});
