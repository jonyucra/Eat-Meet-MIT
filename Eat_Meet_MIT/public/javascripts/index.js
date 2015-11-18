// Fill main container with specified template
var loadPage = function(template, data) { 
    data = data || {};
    $('#main-container').html(Handlebars.templates[template](data));
};

$(document).ready(function () {
    console.log('ready');
    loadPage('index');
});

// Handle click for loginBtn button
$(document).on('click', '#loginBtn', function(evt) {
    loadPage('login');
    });

// Handle click for regiserBtn button
$(document).on('click', '#registerBtn', function(evt) {
  loadPage('register');
});

// Handle click for homeLink button
$(document).on('click', '#homeLink', function(evt) {
 evt.preventDefault();
 loadPage('index');
});
