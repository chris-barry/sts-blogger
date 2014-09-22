// @license magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt Creative Commons Zero

	var base = 'https://www.googleapis.com/blogger/v3/blogs/';

function loadBlogs() {
	var request = new XMLHttpRequest();
	request.open('GET', "/config.json", true);

	request.onload = function buttonsOnLoad() {
		// Populate Mustache data.
		var r = JSON.parse(request.responseText),
			template = document.getElementById("buttons-template").innerHTML,
			rendered;
		Mustache.parse(template);   // optional, speeds up future uses
		rendered = Mustache.render(template, r);
		document.getElementById("buttons").innerHTML = rendered;
	};

	request.onerror = function buttonsOnError () {
		alert("There was a big connection error. :(");
	};
	
	request.send();
}

function getBloggerStats(api_key, blog_id) {
	var pages = [],
		json_resp = "",
		request = new XMLHttpRequest(),
		template,
		rendered;
	pages.items = [];

	request.open('GET', base  + blog_id + '/posts?key=' + api_key + '&fields=kind,nextPageToken,items(title,published,replies/totalItems,url,author/displayName)', false);

	request.onload = function bloggerOnLoad() {
		if (request.status >= 200 && request.status < 400){
			var i;
			// Add response to pages[]
			json_resp = JSON.parse(request.responseText);
			for(i = 0; i < json_resp.items.length; i++) {
				pages.items.push(json_resp.items[i]);
			}
		} else {
			alert("Could not get data. Fail with HTTP error code of " + request.status + "!");
		}
	};

	request.onerror = function bloggerOnError () {
		alert("There was a big error. Are you still connected to the Internet?");
	};

	// Keep on sending requests until we don't see a next page token.
	do {
		request.send();
		request.open('GET', base + blog_id + '/posts?pageToken=' + json_resp.nextPageToken + '&fields=kind,nextPageToken,items(title,published,replies/totalItems,url,author/displayName)' + '&key=' + api_key, false);
	} while(json_resp.nextPageToken);

	// Parse Mustache
	template = document.getElementById("posts-template").innerHTML;
	Mustache.parse(template);
	rendered = Mustache.render(template, pages);
	document.getElementById("posts").innerHTML = rendered;
	sorttable.makeSortable(document.querySelectorAll("#posts > table:nth-child(1)")[0]);
	fixDates();
}

function fixDates() {
	var date;
	Array.prototype.forEach.call(
	document.querySelectorAll("#posts .date"), function(el, i) {
		//el.innerHTML = new Date(el.innerHTML).toLocaleDateString();
		date = new Date(el.innerHTML);
		el.innerHTML = date.toDateString() + " at " + date.getHours() + ":" + date.getMinutes();
	});
}

// @license-end
