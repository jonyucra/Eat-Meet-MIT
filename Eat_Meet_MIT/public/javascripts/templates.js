(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
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