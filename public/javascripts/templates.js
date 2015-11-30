(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['conversation'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"message\">\n    <p>"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + ": "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p>No message yet. Start Chatting!</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"conversation\" conversationId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <h2>Eat, Meet, MIT</h2>\n  <p>Hi there "
    + alias4(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + ". (<a id=\"logoutLink\" href=\"#\">logout</a>)</p>\n  <p>Below are all conversations between you and "
    + alias4(((helper = (helper = helpers.receiverUser || (depth0 != null ? depth0.receiverUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiverUser","hash":{},"data":data}) : helper)))
    + "</p>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.messageArray : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  <form id=\"new_message\" action=\"#\"> \n  <input type=\"text\" name=\"new_message_input\" id=\"new_message_input\">\n  <input type=\"submit\" id=\"submit_new_message\" value=\"Send\">\n  </form>\n  <br>\n\n  <input id=\"seeNetwork\" class=\"generalBtn\" type=\"button\" value=\"Back Network\">\n  <input id=\"homeBtn\" class=\"generalBtn\" type=\"button\" value=\"Back Home\">\n\n</div>\n";
},"useData":true});
templates['homepage'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.request : depth0)) != null ? stack1.status : stack1),"===","pending",{"name":"ifEq","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.request : depth0)) != null ? stack1.status : stack1),"===","matched",{"name":"ifEq","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  \n";
},"2":function(container,depth0,helpers,partials,data) {
    return "      <p> Request is currently pending </p> \n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.match,depth0,{"name":"match","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "    <p> You currently have no active requests :( Make one! </p>\n    <input id=\"makeRequest\" class=\"generalBtn\" type=\"button\" value=\"Request\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"homepage\">\n  <h2>Eat, Meet, MIT</h2>\n  <div class=\"error\"></div>\n  <p>Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a href=\"#\" id=\"logoutLink\">logout</a>)</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.request : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "  <input id=\"seeNetwork\" class=\"generalBtn\" type=\"button\" value=\"Network\">\n</div>\n";
},"usePartial":true,"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='homepage'>\n    <h2> Welcome to Eat, Meet, MIT </h2>\n    <p> The place that connects you to other hungry students on campus</p>\n    <p> Please log in to continue </p>\n    <button id='loginBtn' class='generalBtn'> Log in </button> \n    <button id='registerBtn' class='generalBtn'>Register </button> \n</div>\n";
},"useData":true});
templates['login'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signIn\">\n<a href=\"#\" id=\"indexLink\">Back</a>\n<h2>Sign In</h2>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n<form id=\"loginForm\">\n<label> Username: </label> <input type=\"text\" name=\"username\"> <br>\n<label> Password: </label> <input type=\"password\" name=\"password\">\n<br><br>\n<input type=\"submit\" class='generalBtn' value=\"Submit\">\n</form>\n</div>\n";
},"useData":true});
templates['match'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"match\">\n\n  \n  <p>Below is your dinner plan for tonight!</p>\n  <fieldset>\n  <b> Time: </b> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.diner_time : stack1), depth0))
    + " <br>\n  <b> Dining Hall:</b> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.diner_location : stack1), depth0))
    + " <br>\n  <b> You are going to eat and meet with:</b> <p id=\"personEatWith\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.dinner_meet : stack1), depth0))
    + "</p> <br>\n  <input class=\"generalBtn\" type=\"button\" id='dinnerCompleteBtn' value=\"Dinner Completed\">\n  </fieldset>\n  \n\n</div>\n";
},"useData":true});
templates['networkContainer'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.networkMember,depth0,{"name":"networkMember","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p>Nobody in your network :( Add them after meals!</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"network\">\n  <h2>Eat, Meet, MIT</h2>\n  <div class=\"error\"></div>\n  <p>Hi there "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + ". Below are all of the people who are a part of your network. Click on their name to send them a message! (<a id=\"logoutLink\" href=\"#\">logout</a>) </p>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.networkMembers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  \n\n  <input id=\"homeBtn\" class=\"generalBtn\" type=\"button\" value=\"Back Home\">\n\n</div>\n";
},"usePartial":true,"useData":true});
templates['networkMember'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "<div id=\"networkMember\" data-conversation-id="
    + alias1(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <!-- The \"this\" refers to the name of user that is in your network -->\n  <a href=\"#\" class=\"sendMessage\">"
    + alias1(container.lambda(depth0, depth0))
    + "</a>\n  \n</div>\n";
},"useData":true});
templates['potentialFriend'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div id=\"potentialFriend\" data-other-user="
    + alias2(alias1(depth0, depth0))
    + ">\n	<p>"
    + alias2(alias1(depth0, depth0))
    + "</p>\n  <a href=\"#\"  class=\"acceptRequest\">Accept friend request</a>\n</div>\n";
},"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"registrationPage\">\n    <a href=\"#\" id=\"indexLink\">Back</a>\n	<h2>Register</h2> \n    <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n	<form id=\"registerForm\">\n	<label> Username: </label> <input type=\"text\" name=\"username\"> <br>\n	<label> MIT Email: </label>  <input type=\"email\" name=\"email\"> <br>\n	<label> Password: </label> <input type=\"password\" name=\"password\"> <br>\n	<label> Confirm Password: </label> <input type=\"password\" name=\"confirm\">\n    <br><br>\n	<input type=\"submit\" class='generalBtn' value=\"Submit\">\n	</form>\n</div>\n";
},"useData":true});
templates['request'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<body>\n    <h2> Eat, Meet, MIT </h2>\n    <div class=\"error\"></div>\n    <p> Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a id=\"logoutLink\" href=\"#\">logout</a>)</p>\n    <p> Please create the Request Form: </p>\n    <form id=\"requestForm\">\n        <fieldset>\n        <b> Time: </b> <br>\n            <input type=\"checkbox\" name=\"time\" value=\"5\"> 5pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"6\"> 6pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"7\"> 7pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"8\"> 8pm <br>\n        <b> Dining Hall: </b> <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Baker\"> Baker <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Maseeh\"> Maseeh <br>\n            <input type=\"checkbox\" name=\"place\" value=\"McCormick\"> McCormick <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Next\"> Next <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Simmons\"> Simmons <br>\n        <!--\n        <b> Party Size: </b> <br>\n            <input type=\"radio\" name=\"size\" value=\"2\"> 2 <br>\n            <input type=\"radio\" name=\"size\" value=\"3\"> 3 <br>\n            <input type=\"radio\" name=\"size\" value=\"4\"> 4 <br>\n        -->\n        </fieldset>\n        <input  class=\"generalBtn\" type=\"submit\" value=\"Request\">\n        <input id=\"homeBtn\" class=\"generalBtn\" type=\"button\" value=\"Back Home\">\n    </form>\n</body>\n";
},"useData":true});
})();
