var getYelpResponse = function(resp) {
	$("#loading-indicator").hide();
	var $term = $("input[name=search_term]").prop("disabled",false);
	var $location = $("input[name=search_neighborhood]").prop("disabled",false);
	var $submit = $("input[name=submit_search]").prop("disabled",false);
	var $ul = $("ul");
	$.each(resp.businesses, function (i, val) {
		$ul.append("<li>"+val.name+"</li>");
	});
};
$("input[name=submit_search]").click(function () {
	var $ul = $("ul").empty();
	var $term = $("input[name=search_term]");
	var $location = $("input[name=search_neighborhood]");
	if (!$term.val() || !$location.val())
		return false;

	var url = "http://api.yelp.com/business_review_search?callback=getYelpResponse";
	var q = "&term=" + encodeURIComponent($term.val());
	q += "&location=" + encodeURIComponent($location.val());
	q += "&ywsid=oQcjRFaFtJ6xs4_sxLUHyg";
	var s = document.createElement("script");
	s.src = url + q;
	s.type = "text/javascript";
	document.getElementsByTagName("head").item(0).appendChild(s);

	$("#loading-indicator").show();
	$term.prop("disabled",true);
	$location.prop("disabled",true);
	var $submit = $("input[name=submit_search]").prop("disabled",true);
});