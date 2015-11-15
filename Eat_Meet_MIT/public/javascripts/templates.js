(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['homepage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"homepage\">\n  <h2>Eat, Meet, MIT</h2>\n  <p>Welcome, XXX (<a href=\"#\" id=\"logout-link\">logout</a>)</p>\n  <input class=\"requestBtn\" type=\"submit\" value=\"Request\">\n  <input class=\"requestBtn\" type=\"button\" value=\"Network\">\n</div>\n";
},"useData":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"signIn\">\n<h2>Sign In</h2> <p>Back to Home</p>\n\n<form>\nUsername: <input type=\"text\" name=\"userName\">\nPassword: <input type=\"password\" name=\"password\">\n<br><br>\n<input type=\"submit\" value=\"Submit\">\n</form>\n</div>";
},"useData":true});
templates['registration'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"registrationPage\">\n	<h2>Register</h2> <p>Back to Home</p>\n\n	<form>\n	Username: <input type=\"text\" name=\"userName\">\n	Email Address( @mit.edu ): <input type=\"email\" name=\"email\">\n	Password: <input type=\"password\" name=\"password\">\n	Confirm Password: <input type=\"password\" name=\"confirmPassword\">\n	</form>\n	<br><br>\n	<input type=\"submit\" value=\"Submit\">\n	<!-- <button id=\"registerBtn\">Submit</button> -->\n</div>";
},"useData":true});
templates['request'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<body>\n    <h2> Eat, Meet, MIT </h2>\n    <p> Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a id=\"logout\" href=\"#\">logout</a>)</p>\n    <p> Please create the Request Form: </p>\n    <form id=\"requestForm\" action=\"#\">\n        <fieldset>\n        <b> Time: </b> <br>\n            <input type=\"checkbox\" name=\"time\" value=\"5\"> 5pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"6\"> 6pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"7\"> 7pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"8\"> 8pm <br>\n        <b> Dining Hall: </b> <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Baker\"> Baker <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Maseeh\"> Maseeh <br>\n            <input type=\"checkbox\" name=\"place\" value=\"McCormick\"> McCormick <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Next\"> Next <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Simmons\"> Simmons <br>\n        <b> Party Size: </b> <br>\n            <input type=\"radio\" name=\"size\" value=\"2\"> 2 <br>\n            <input type=\"radio\" name=\"size\" value=\"3\"> 3 <br>\n            <input type=\"radio\" name=\"size\" value=\"4\"> 4 <br>\n        </fieldset>\n        <input class=\"requestBtn\" type=\"submit\" value=\"Request\">\n        <input class=\"requestBtn\" type=\"button\" value=\"Back Home\">\n    </form>\n</body>\n";
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
    + " <br>\n  </fieldset>\n  <input class=\"requestBtn\" type=\"button\" value=\"Back Home\">\n</body>";
},"useData":true});
})();