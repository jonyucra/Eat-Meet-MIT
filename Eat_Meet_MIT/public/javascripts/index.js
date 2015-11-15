// Fill main container with specified template
var loadPage = function(template, data) { 
    data = data || {};
    $('#main-container').html(Handlebars.templates[template](data));
};

$(document).ready(function () {
    console.log('ready');
    loadPage('request');
});
