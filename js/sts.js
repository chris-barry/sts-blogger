// @license magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt Creative Commons Zero


// Make call to Blogger API and fill out Mustache template.
// Expects API_Key from blogger, and the blog_id as strings.
function getBloggerStats(api_key, blog_id) {
	request = new XMLHttpRequest();
	request.open('GET', 'https://www.googleapis.com/blogger/v3/blogs/' + blog_id + '/posts?key=' + api_key, true);

	request.onload = function bloggerOnLoad() {
	if (request.status >= 200 && request.status < 400){
		// Populate Mustache data.
		var r = JSON.parse(request.responseText);
		var template = document.querySelector("#content").innerHTML;
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, r);
		document.querySelector("#content").innerHTML = rendered;
		// Allow the table to be sortable.
		sorttable.makeSortable(document.getElementById("posts"))
	} else {
		alert("Could not get data. HTTP error code of " + request.status + " !");
	}
	};

	request.onerror = function bloggerOnError () {
		// There was a connection error of some sort
		alert("There was a big error. :(");
	};

	request.send();
}

getBloggerStats("AIzaSyBgpz4l_4fIDqS7xcTZpJWo_ar-xiwBNbU", "4975085557082644153");

// @license-end
