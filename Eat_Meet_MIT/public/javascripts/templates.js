(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['request'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<head>\n    <title> Eat, Meet, MIT - Request Form </title>\n</head>\n<body>\n    <h2> Eat, Meet, MIT </h2>\n    <p> Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a id=\"logout\" href=\"#\">logout</a>)</p>\n    <p> Please create the Request Form: </p>\n    <form id=\"requestForm\" action=\"#\">\n        <fieldset>\n        <b> Time: </b> <br>\n            <input type=\"checkbox\" name=\"time\" value=\"5\"> 5pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"6\"> 6pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"7\"> 7pm <br>\n            <input type=\"checkbox\" name=\"time\" value=\"8\"> 8pm <br>\n        <b> Dining Hall: </b> <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Baker\"> Baker <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Maseeh\"> Maseeh <br>\n            <input type=\"checkbox\" name=\"place\" value=\"McCormick\"> McCormick <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Next\"> Next <br>\n            <input type=\"checkbox\" name=\"place\" value=\"Simmons\"> Simmons <br>\n        <b> Party Size: </b> <br>\n            <input type=\"radio\" name=\"size\" value=\"2\"> 2 <br>\n            <input type=\"radio\" name=\"size\" value=\"3\"> 3 <br>\n            <input type=\"radio\" name=\"size\" value=\"4\"> 4 <br>\n        </fieldset>\n        <input class=\"requestBtn\" type=\"submit\" value=\"Request\">\n        <input class=\"requestBtn\" type=\"button\" value=\"Back Home\">\n    </form>\n</body>\n";
},"useData":true});
})();