this["homepage"] = this["homepage"] || {};
this["homepage"]["templates"] = this["homepage"]["templates"] || {};

this["homepage"]["templates"]["templates/homepage/handlebars/html/test.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<p>\nThis is a ";
  if (stack1 = helpers.test) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.test); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n</p>";
  return buffer;
  });