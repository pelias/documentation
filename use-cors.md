# Load data from the browser

For security reasons, web browsers prevent what are called cross-origin or cross-site requests from one domain to another. JavaScript `XMLHTTPRequests` (commonly called “AJAX” requests) inherit all of the authentication context of the currently logged in user, so a malicious web page could attempt to make malicious requests that cross domain contexts and cause trouble. Historically, that has made it difficult for web developers to build web applications making use of third-party APIs.

Fortunately, techniques have since been developed that allow developers to securely access APIs cross-domain.

## Cross-Origin Resource Sharing (CORS)

`CORS` is the recommended standard for allowing your web browser and a web server to negotiate and allow requests to be made across domain contexts. `CORS` is currently supported in modern Chrome, Firefox, Safari, and Internet Explorer (10+) web browsers. It became an official W3C Recommendation on the 16th January 2014.

You don’t need to do anything special to use `CORS` with JavaScript in a modern browser. Your web browser and our servers will automatically negotiate the cross-origin request. For example, to make a `CORS` request with `jQuery`, you’d make your request just like you were performing it within the context of your own domain.

For a full list of supported browsers see: http://caniuse.com/#feat=cors

### Add a Pelias search box to a Leaflet map

Mapzen provides a plug-in that adds a Pelias search box to any [Leaflet](http://leafletjs.com/)-powered map.

See https://github.com/pelias/leaflet-geocoder for installation instructions and a live demo.

### Loading data with jQuery

```javascript
$.ajax({
  url: "https://search.mapzen.com/v1/search",
  method: "GET",
  dataType: "json",
  data: {
    "text": "London, UK",
    "api_key": "search-EEgHGcM"
  },
  success: function( data, status, jqxhr ){
    console.log( "Request received:", data );
  },
  error: function( jqxhr, status, error ){
    console.log( "Something went wrong!" );
  }
});
```

interactive demo: http://jsfiddle.net/missinglink/fb6p0par/

### Loading data with Angular

```javascript
$http({
  url: "https://search.mapzen.com/v1/search",
  method: "GET",
  headers: { "Accept": "application/json" },
  params: {
    "text": "London, UK",
    "api_key": "search-EEgHGcM"
  },
})
.success(function( data, status ) {
  console.log( "Request received:", data );
})
.error(function( data, status ) {
  console.log( "Something went wrong!" );
});
```

interactive demo: http://jsfiddle.net/missinglink/nchh8a9j/

## Why not JSONP?

Also called “JSON with Padding”, `JSONP` is a technique for fooling a web browser into performing cross-origin requests using a special `<script>` tag that uses the `src` attribute that to make a special API request.

Instead of responding with just a `JSON` object, the server responds with JavaScript code that calls a client-declared callback function, passing the data as that function’s first parameter.

`JSONP` **is disabled** by default for Mapzen Search, as `CORS` is offered as a more modern alternative.

You can find more information online by performing a web search for `"CORS vs JSONP"` and `"Security risks with JSONP"`.

If you are having any issues implementing `CORS` with Mapzen Search, open an issue in the [main Pelias GitHub repository](https://github.com/pelias/pelias/issues). Please include the name of any frameworks you are using and some example code.

---

This content is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. Some content adapted from the [Socrata Documentation](http://dev.socrata.com/docs/cors-and-jsonp.html).
