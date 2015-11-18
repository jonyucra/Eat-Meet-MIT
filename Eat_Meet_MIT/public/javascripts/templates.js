(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['homepage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"homepage\">\n  <h2>Eat, Meet, MIT</h2>\n  <p>Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a href=\"#\" id=\"logoutLink\">logout</a>)</p>\n  <input id=\"makeRequest\" class=\"generalBtn\" type=\"button\" value=\"Request\">\n  <input id=\"seeNetwork\" class=\"generalBtn\" type=\"button\" value=\"Network\">\n</div>\n";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='homepage'>\n    <h2> Welcome to Eat, Meet, MIT </h2>\n    <p> The place that connects you to other hungry students on campus</p>\n    <p> Please log in to continue </p>\n    <button id='loginBtn' class='generalBtn'> Log in </button> \n    <button id='registerBtn' class='generalBtn'>Register </button> \n</div>\n";
},"useData":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"signIn\">\n<a href=\"#\" id=\"homeLink\">Back to Home</a>\n<h2>Sign In</h2>\n<form id=\"loginForm\">\n<label> Username: </label> <input type=\"text\" name=\"userName\"> <br>\n<label> Password: </label> <input type=\"password\" name=\"password\">\n<br><br>\n<input type=\"submit\" class='generalBtn' value=\"Submit\">\n</form>\n</div>\n";
},"useData":true});
templates['register'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"registrationPage\">\n    <a href=\"#\" id=\"homeLink\">Back to Home</a>\n	<h2>Register</h2> \n	<form id=\"registerForm\">\n	<label> Username: </label> <input type=\"text\" name=\"userName\"> <br>\n	<label> MIT Email: </label>  <input type=\"email\" name=\"email\"> <br>\n	<label> Password: </label> <input type=\"password\" name=\"password\"> <br>\n	<label> Confirm Password: </label> <input type=\"password\" name=\"confirmPassword\">\n    <br><br>\n	<input type=\"submit\" class='generalBtn' value=\"Submit\">\n	</form>\n</div>\n";
},"useData":true});
templates['request'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<body>\n    <h2> Eat, Meet, MIT </h2>\n    <p> Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a id=\"logoutLink\" href=\"#\">logout</a>)</p>\n    <p> Please create the Request Form: </p>\n    <form id=\"requestForm\">\n        <fieldset>\n        <b> Time: </b> <br>\n            <input type=\"checkbox\" name=\"time\" value=\"5\"> 5pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"6\"> 6pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"7\"> 7pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"8\"> 8pm <br>\n        <b> Dining Hall: </b> <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Baker\"> Baker <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Maseeh\"> Maseeh <br>\n            <input type=\"checkbox\" name=\"place\" value=\"McCormick\"> McCormick <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Next\"> Next <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Simmons\"> Simmons <br>\n        <b> Party Size: </b> <br>\n            <input type=\"radio\" name=\"size\" value=\"2\"> 2 <br>\n            <input type=\"radio\" name=\"size\" value=\"3\"> 3 <br>\n            <input type=\"radio\" name=\"size\" value=\"4\"> 4 <br>\n        </fieldset>\n        <input  class=\"generalBtn\" type=\"submit\" value=\"Request\">\n        <input id=\"backHome\" class=\"generalBtn\" type=\"button\" value=\"Back Home\">\n    </form>\n</body>\n";
},"useData":true});
templates['status'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<body>\n  <h2>Eat, Meet, MIT </h2>\n  <p>Welcome, "
    + alias4(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a href=\"#\" id=\"logout-link\">logout</a>) </p>\n  <br>\n  <p>Below is your dinner plan tonight!</p>\n  <fieldset>\n  <b> Time: </b> "
    + alias4(((helper = (helper = helpers.diner_time || (depth0 != null ? depth0.diner_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"diner_time","hash":{},"data":data}) : helper)))
    + " <br>\n  <b> Dining Hall:</b> "
    + alias4(((helper = (helper = helpers.diner_location || (depth0 != null ? depth0.diner_location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"diner_location","hash":{},"data":data}) : helper)))
    + " <br>\n  <b> You are going to eat and meet with:</b> "
    + alias4(((helper = (helper = helpers.dinner_meet || (depth0 != null ? depth0.dinner_meet : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dinner_meet","hash":{},"data":data}) : helper)))
    + " <br>\n  </fieldset>\n  <input class=\"generalBtn\" type=\"button\" value=\"Back Home\">\n</body>\n";
},"useData":true});
})();