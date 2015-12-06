(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['conversation'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "          \n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.author : depth0),"===",(depths[1] != null ? depths[1].currentUser : depths[1]),{"name":"ifEq","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"well author_message\">\n              "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n              <p class=\"messageDetail\">sent at "
    + alias4(((helper = (helper = helpers.create_time || (depth0 != null ? depth0.create_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"create_time","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias2).call(alias1,(depth0 != null ? depth0._id : depth0),"===",(depths[1] != null ? depths[1].last_message_id : depths[1]),{"name":"ifEq","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "              <div class= \"message_status\">\n                <p class=\"messageDetail\">"
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1].last_read_status : depths[1]), depth0))
    + "</p>\n              </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"well receiver_message\" id=\"receive_well\">\n            "
    + container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper)))
    + "\n            </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "          <p>No message yet. Start Chatting!</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"conversation\" conversationId="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <div class=\"jumbotron text-center\">\n    <h1>Eat, Meet, MIT</h1>\n    <p>Hi there "
    + alias4(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + ".</p>\n    <p>Below are all conversations between you and "
    + alias4(((helper = (helper = helpers.receiverUser || (depth0 != null ? depth0.receiverUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiverUser","hash":{},"data":data}) : helper)))
    + "</p>\n  </div>\n\n  <div class=\"row text-center\">\n    \n    <div class=\"col-md-4 col-md-offset-4\">\n    \n      <div> <b class=\"messagePerson\">"
    + alias4(((helper = (helper = helpers.receiverUser || (depth0 != null ? depth0.receiverUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiverUser","hash":{},"data":data}) : helper)))
    + "</b> </div>\n\n      <div class = \"chat_box\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.messageArray : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "      </div>\n        \n        <form id=\"new_message\" action=\"#\" class=\"form-inline\">\n          <div class=\"form-group\">\n            <input type=\"text\" name=\"new_message_input\" id=\"new_message_input\" class=\"form-control\">\n            <button class=\"btn btn-primary btn-sm\" id=\"submit_new_message\">Send</button>\n          </div>\n        </form>\n        <br>\n\n        \n        <button id=\"seeNetwork\" class=\"btn btn-primary btn-lg\">Back Network</button>\n        <button id=\"homeBtn\" class=\"btn btn-primary btn-lg\">Back Home</button>\n\n    </div>\n  </div>\n</div>\n";
},"useData":true,"useDepths":true});
templates['homepage'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.request : depth0)) != null ? stack1.status : stack1),"===","pending",{"name":"ifEq","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.request : depth0)) != null ? stack1.status : stack1),"===","matched",{"name":"ifEq","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      \n";
},"2":function(container,depth0,helpers,partials,data) {
    return "          <p> Request is currently pending </p>\n          <button id=\"cancelRequestBtn\" class='btn btn-primary btn-lg'>Cancel Request</button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.match,depth0,{"name":"match","data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "          <button id=\"cancelDinnerBtn\" class=\"btn btn-primary btn-lg\">Cancel Request</button>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "        <p> You currently have no active requests :( Make one! </p>\n        <button id='makeRequest' class='btn btn-primary btn-lg'>Request</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"homepage\">\n  <div class=\"jumbotron text-center\">\n    <h1>Eat, Meet, MIT</h1>\n    <div class=\"error\"></div>\n    <p>Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a href=\"#\" id=\"logoutLink\">logout</a>)</p>\n  </div>\n  <div class=\"row text-center\">\n    \n    <div class=\"col-md-12\">\n    \n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.request : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "      <button id='seeNetwork' class='btn btn-primary btn-lg'>Network</button>\n    </div>\n    \n  </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='homepage'>\n<div class=\"jumbotron text-center\">\n    <h1> Welcome to Eat, Meet, MIT </h1>\n    <p> The place that connects you to other hungry students on campus</p>\n</div>\n\n  <div class=\"row text-center\">\n  	\n  	<div class=\"col-md-12\">\n	    <p> Please log in to continue </p>\n	    <button id='loginBtn' class='btn btn-primary btn-lg'> Log in </button> \n	    <button id='registerBtn' class='btn btn-primary btn-lg'>Register </button>\n	  </div>\n	\n	</div>\n\n</div>\n";
},"useData":true});
templates['login'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signIn\">\n		<p id=\"aPara\"><a href=\"#\" id=\"indexLink\">Back</a></p>\n			<div class=\"jumbotron text-center\">\n				<h1>Sign In</h1>\n				  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				  </div>\n				<form id=\"loginForm\" role=\"form\">\n					<div class=\"form-group\">\n						<label class=\"control-label\"> Username: </label>\n						<input type=\"text\" name=\"username\" class=\"form-control\">\n					</div>\n					<div class=\"form-group\">\n						<label> Password: </label> <input type=\"password\" name=\"password\" class=\"form-control\">\n					</div>\n					<br><br>\n					<button type=\"submit\" class='btn btn-default'>Submit</button>\n				</form>\n			</div>\n</div>\n";
},"useData":true});
templates['match'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"match\">\n\n  <div class=\"jumbotron text-center\">\n	  <p>Below is your dinner plan for tonight!</p>\n	  \n	  <b> Time: </b> <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.diner_time : stack1), depth0))
    + ":00</p> <br>\n	  <b> Dining Hall:</b> <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.diner_location : stack1), depth0))
    + "</p> <br>\n	  <b> You are going to eat and meet with:</b> <p id=\"personEatWith\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.match : depth0)) != null ? stack1.dinner_meet : stack1), depth0))
    + "</p> <br>\n	  <button class='btn btn-primary btn-lg' id='dinnerCompleteBtn'>Dinner Completed</button>\n	  \n  </div>\n\n</div>\n";
},"useData":true});
templates['message'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "          \n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.author : depth0),"===",(depths[1] != null ? depths[1].currentUser : depths[1]),{"name":"ifEq","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"well author_message\">\n              "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n              <p class=\"messageDetail\">sent at "
    + alias4(((helper = (helper = helpers.create_time || (depth0 != null ? depth0.create_time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"create_time","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n\n"
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias2).call(alias1,(depth0 != null ? depth0._id : depth0),"===",(depths[1] != null ? depths[1].last_message_id : depths[1]),{"name":"ifEq","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "              <div class= \"message_status\">\n                <p class=\"messageDetail\">"
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1].last_read_status : depths[1]), depth0))
    + "</p>\n              </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"well receiver_message\" id=\"receive_well\">\n            "
    + container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper)))
    + "\n            </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "          <p>No message yet. Start Chatting!</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class = \"chat_box\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.messageArray : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true,"useDepths":true});
templates['networkContainer'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.networkMember,depth0,{"name":"networkMember","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "      <p><a href=\"#\" class=\"sendMessage\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</a></p> <p class=\"messageDetail\">no conversation yet</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"network\">\n  <div class=\"jumbotron text-center\">\n    <h1>Eat, Meet, MIT</h1>\n    <div class=\"error\"></div>\n    <p>Hi there "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + ". Below are all of the people who are a part of your network. Click on their name to send them a message! (<a id=\"logoutLink\" href=\"#\">logout</a>) </p>\n    <p>You may add friends after each meal!</p>\n    <button id=\"homeBtn\" class=\"btn btn-primary btn-lg\">Back Home</button>\n  </div>\n  <div class=\"row text-center\">\n    <div class=\"col-md-12\">\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.output : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.friend_no_message : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['networkMember'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div id=\"networkMember\" data-conversation-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <!-- The \"this\" refers to the name of user that is in your network -->\n  <div class=\"network_messages\">\n	  <p><a href=\"#\" class=\"sendMessage\">"
    + alias4(((helper = (helper = helpers.friend_name || (depth0 != null ? depth0.friend_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"friend_name","hash":{},"data":data}) : helper)))
    + "</a></p>\n	  <p class=\"messageDetail\"> \""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.last_messasge : depth0)) != null ? stack1.content : stack1), depth0))
    + "\"\" last sent at "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.last_messasge : depth0)) != null ? stack1.create_time : stack1), depth0))
    + "</p>\n	  <p class=\"messageDetail\">"
    + alias4(((helper = (helper = helpers.unread || (depth0 != null ? depth0.unread : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unread","hash":{},"data":data}) : helper)))
    + " new messages</p>\n  </div>\n</div>";
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

  return "		        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"registrationPage\">\n	<p id=\"aPara\"><a href=\"#\" id=\"indexLink\">Back</a></p>\n		<div class=\"jumbotron text-center\">\n		  \n			<h1>Register</h1> \n		    <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		    </div>\n			<form id=\"registerForm\" role=\"form\">\n				<div class=\"form-group\">\n					<label class=\"control-label\"> Username: </label>\n					<input type=\"text\" name=\"username\" class=\"form-control\">\n				</div>\n				<div class=\"form-group\">\n					<label class=\"control-label\"> MIT Email: </label>\n					<input type=\"email\" name=\"email\" class=\"form-control\">\n				</div>\n				<div class=\"form-group\">\n					<label class=\"control-label\"> Password: </label>\n					<input type=\"password\" name=\"password\" class=\"form-control\">\n				</div>\n				<div class=\"form-group\">\n					<label class=\"control-label\"> Confirm Password: </label>\n					<input type=\"password\" name=\"confirm\" class=\"form-control\">\n				</div>\n			    <br><br>\n				<button type=\"submit\" class='btn btn-default'>Submit</button>\n			</form>\n		</div>\n</div>\n";
},"useData":true});
templates['request'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<body>\n  <div class=\"jumbotron text-center\">\n    <h1> Eat, Meet, MIT </h1>\n    <div class=\"error\"></div>\n    <p> Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a id=\"logoutLink\" href=\"#\">logout</a>)</p>\n  </div>\n  <div class=\"row text-center\">\n    \n    <div class=\"col-md-12\">\n    <p> Please create the Request Form: </p>\n    <form id=\"requestForm\">\n        \n        <b> Time: </b> <br>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" name=\"time\" value=\"17\">5pm</label>\n            </div>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" name=\"time\" value=\"18\">6pm</label>\n            </div>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" name=\"time\" value=\"19\">7pm</label>\n            </div>\n        <b> Dining Hall: </b> <br>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" name=\"place\" value=\"Baker\">Baker</label>\n            </div>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" name=\"place\" value=\"Maseeh\">Maseeh</label>\n            </div>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" name=\"place\" value=\"McCormick\">McCormick</label>\n            </div>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" name=\"place\" value=\"Next\">Next</label>\n            </div>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" name=\"place\" value=\"Simmons\">Simmons</label>\n            </div>\n        \n        <button type=\"submit\" class='btn btn-default'>Submit</button>\n        <button id='homeBtn' class='btn btn-default'>Back Home</button>\n    </form>\n    </div>\n  </div>\n</body>\n";
},"useData":true});
})();