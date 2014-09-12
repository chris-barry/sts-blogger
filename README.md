# STS Blog Grader

Gets data from Blogger to make grading easier for professors who run blogs there.

## Setting Up Your Own

To run your own instance of this page, you will need three things:

1. A place to host the website.
2. A Blogger API token.
   [How to get one can be found here](https://developers.google.com/blogger/docs/3.0/using#APIKey).
3. A class that uses Google Blogger.

### Instillation

1. Clone this repository to the directory where it will be served from.
   For this example, we will use `/srv/www/grader/`.
2. Second, configure blogs.json with the information about your blogs.
3. Point a web server to your directory.
4. There is no step four.

## TODO

* Export to excel?
* Filter by date range.
  See [paramaters for post](https://developers.google.com/blogger/docs/3.0/reference/posts/list).
* Previous page button
	* Instead of clearing the data, make multiple JSON requests until no more `nextPageToken`.
	  Keep on apprnding to json structure.

## License

Creative Commons Zero.
See `LICENSE` for more information.

