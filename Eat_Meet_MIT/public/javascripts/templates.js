(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['conversation'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"message\" data-tweet-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\r\n    <p>"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + ": "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p>No message yet. Start Chatting!</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"conversation\" data-conversation-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\r\n  <h2>Eat, Meet, MIT</h2>\r\n  <p>Hi there "
    + alias4(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + ". (<a id=\"logoutLink\" href=\"#\">logout</a>)</p>\r\n  <p>Below are all conversations between you and "
    + alias4(((helper = (helper = helpers.receiver || (depth0 != null ? depth0.receiver : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiver","hash":{},"data":data}) : helper)))
    + "</p>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.messageArray : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n  <form id=\"new_message\"> \r\n  <input type=\"text\" name=\"new_message_input\" id=\"new_message_input\">\r\n  <input type=\"submit\" id=\"submit_new_message\" value=\"Add\">\r\n  </form>\r\n  <br>\r\n\r\n  <input id=\"seeNetwork\" class=\"generalBtn\" type=\"button\" value=\"Back Network\">\r\n  <input id=\"homeBtn\" class=\"generalBtn\" type=\"button\" value=\"Back Home\">\r\n\r\n</div>\r\n";
},"useData":true});
templates['homepage'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "\r\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.request : depth0)) != null ? stack1.status : stack1),"===","pending",{"name":"ifEq","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.request : depth0)) != null ? stack1.status : stack1),"===","matched",{"name":"ifEq","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  \r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "      <p> Request is currently pending </p> \r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.match,depth0,{"name":"match","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "    <p> You currently have no active requests :( Make one! </p>\r\n    <input id=\"makeRequest\" class=\"generalBtn\" type=\"button\" value=\"Request\">\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"homepage\">\r\n  <h2>Eat, Meet, MIT</h2>\r\n  <div class=\"error\"></div>\r\n  <p>Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a href=\"#\" id=\"logoutLink\">logout</a>)</p>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.request : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "  <input id=\"seeNetwork\" class=\"generalBtn\" type=\"button\" value=\"Network\">\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='homepage'>\r\n    <h2> Welcome to Eat, Meet, MIT </h2>\r\n    <p> The place that connects you to other hungry students on campus</p>\r\n    <p> Please log in to continue </p>\r\n    <button id='loginBtn' class='generalBtn'> Log in </button> \r\n    <button id='registerBtn' class='generalBtn'>Register </button> \r\n</div>\r\n";
},"useData":true});
templates['login'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signIn\">\r\n<a href=\"#\" id=\"indexLink\">Back</a>\r\n<h2>Sign In</h2>\r\n  <div class=\"error\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n<form id=\"loginForm\">\r\n<label> Username: </label> <input type=\"text\" name=\"username\"> <br>\r\n<label> Password: </label> <input type=\"password\" name=\"password\">\r\n<br><br>\r\n<input type=\"submit\" class='generalBtn' value=\"Submit\">\r\n</form>\r\n</div>\r\n";
},"useData":true});
templates['match'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"match\">\r\n\r\n  \r\n  <p>Below is your dinner plan for tonight!</p>\r\n  <fieldset>\r\n  <b> Time: </b> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.diner_time : stack1), depth0))
    + " <br>\r\n  <b> Dining Hall:</b> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.diner_location : stack1), depth0))
    + " <br>\r\n  <b> You are going to eat and meet with:</b> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.dinner_meet : stack1), depth0))
    + " <br>\r\n  <input class=\"generalBtn\" type=\"button\" id='dinnerCompleteBtn' value=\"Dinner Completed\">\r\n  </fieldset>\r\n  \r\n\r\n</div>\r\n";
},"useData":true});
templates['networkContainer'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.networkMember,depth0,{"name":"networkMember","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p>Nobody in your network :( Add them after meals!</p>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.potentialFriend,depth0,{"name":"potentialFriend","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "    <p>No active friend requests</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"network\">\r\n  <h2>Eat, Meet, MIT</h2>\r\n  <div class=\"error\"></div>\r\n  <p>Hi there "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + ". Below are all of the people who are a part of your network. Send them a message! (<a id=\"logoutLink\" href=\"#\">logout</a>) </p>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.networkMember : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n  <h3>Pending Friend Requests</h3>\r\n  <p>Accept these requests to add this person to your network</p>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.potentialFriend : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n  <input id=\"homeBtn\" class=\"generalBtn\" type=\"button\" value=\"Back Home\">\r\n\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['networkMember'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "<div id=\"networkMember\" data-conversation-id="
    + alias1(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\r\n  <!-- The \"this\" refers to the name of user that is in your network -->\r\n  <p>"
    + alias1(container.lambda(depth0, depth0))
    + "</p>\r\n  <a href=\"#\" class=\"sendMessage\">Send them a message!</a>\r\n</div>\r\n";
},"useData":true});
templates['potentialFriend'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div id=\"potentialFriend\" data-other-user="
    + alias2(alias1(depth0, depth0))
    + ">\r\n	<p>"
    + alias2(alias1(depth0, depth0))
    + "</p>\r\n  <a href=\"#\"  class=\"acceptRequest\">Accept friend request</a>\r\n</div>\r\n";
},"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"registrationPage\">\r\n    <a href=\"#\" id=\"indexLink\">Back</a>\r\n	<h2>Register</h2> \r\n    <div class=\"error\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n	<form id=\"registerForm\">\r\n	<label> Username: </label> <input type=\"text\" name=\"username\"> <br>\r\n	<label> MIT Email: </label>  <input type=\"email\" name=\"email\"> <br>\r\n	<label> Password: </label> <input type=\"password\" name=\"password\"> <br>\r\n	<label> Confirm Password: </label> <input type=\"password\" name=\"confirm\">\r\n    <br><br>\r\n	<input type=\"submit\" class='generalBtn' value=\"Submit\">\r\n	</form>\r\n</div>\r\n";
},"useData":true});
templates['request'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<body>\r\n    <h2> Eat, Meet, MIT </h2>\r\n    <div class=\"error\"></div>\r\n    <p> Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a id=\"logoutLink\" href=\"#\">logout</a>)</p>\r\n    <p> Please create the Request Form: </p>\r\n    <form id=\"requestForm\">\r\n        <fieldset>\r\n        <b> Time: </b> <br>\r\n            <input type=\"checkbox\" name=\"time\" value=\"5\"> 5pm <br>\r\n            <input type=\"checkbox\" name=\"time\" value=\"6\"> 6pm <br>\r\n            <input type=\"checkbox\" name=\"time\" value=\"7\"> 7pm <br>\r\n            <input type=\"checkbox\" name=\"time\" value=\"8\"> 8pm <br>\r\n        <b> Dining Hall: </b> <br>\r\n            <input type=\"checkbox\" name=\"place\" value=\"Baker\"> Baker <br>\r\n            <input type=\"checkbox\" name=\"place\" value=\"Maseeh\"> Maseeh <br>\r\n            <input type=\"checkbox\" name=\"place\" value=\"McCormick\"> McCormick <br>\r\n            <input type=\"checkbox\" name=\"place\" value=\"Next\"> Next <br>\r\n            <input type=\"checkbox\" name=\"place\" value=\"Simmons\"> Simmons <br>\r\n        <!--\r\n        <b> Party Size: </b> <br>\r\n            <input type=\"radio\" name=\"size\" value=\"2\"> 2 <br>\r\n            <input type=\"radio\" name=\"size\" value=\"3\"> 3 <br>\r\n            <input type=\"radio\" name=\"size\" value=\"4\"> 4 <br>\r\n        -->\r\n        </fieldset>\r\n        <input  class=\"generalBtn\" type=\"submit\" value=\"Request\">\r\n        <input id=\"homeBtn\" class=\"generalBtn\" type=\"button\" value=\"Back Home\">\r\n    </form>\r\n</body>\r\n";
},"useData":true});
})();
