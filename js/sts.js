// @license magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt Creative Commons Zero

function loadBlogs() {
	var request = new XMLHttpRequest();
	request.open('GET', "/blogs.json", true);

	request.onload = function buttonsOnLoad() {
		// Populate Mustache data.
		var r = JSON.parse(request.responseText);
		var template = document.getElementById("buttons-template").innerHTML;
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, r);
		document.getElementById("buttons").innerHTML = rendered;
	};

	request.onerror = function buttonsOnError () {
		// There was a connection error of some sort
		alert("There was a big error. :(");
	};

	request.send();
}

// Make call to Blogger API and fill out Mustache template.
// Expects API_Key from blogger, and the blog_id as strings.
function getBloggerStats(api_key, blog_id, next_token) {
	var request = new XMLHttpRequest();
	if(next_token) {
		//alert(next_token);
		request.open('GET', 'https://www.googleapis.com/blogger/v3/blogs/' + blog_id + '/posts?pageToken=' + next_token + '&fields=kind,nextPageToken,items(title,published,replies/totalItems,url,author/displayName)' + '&key=' + api_key, true);
	} else {
		request.open('GET', 'https://www.googleapis.com/blogger/v3/blogs/' + blog_id + '/posts?key=' + api_key + '&fields=kind,nextPageToken,items(title,published,replies/totalItems,url,author/displayName)', true);
	}

	request.onload = function bloggerOnLoad() {
	if (request.status >= 200 && request.status < 400){
		// Populate Mustache data.
		var r = JSON.parse(request.responseText);
		var template = document.getElementById("posts-template").innerHTML;
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, r);
		document.getElementById("posts").innerHTML = rendered;
		// Allow the table to be sortable.
		sorttable.makeSortable(document.getElementById("posts-table"))

		// Does it look like we have a next page to view?
		if(r.nextPageToken) {
			r.api_key = api_key;
			r.blog_id = blog_id;
			template = document.getElementById("next-template").innerHTML;
			Mustache.parse(template);
			document.getElementById("next").innerHTML = Mustache.render(template, r);
		} else {
			document.getElementById("next").innerHTML = "";
		}
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

loadBlogs();

// @license-end
