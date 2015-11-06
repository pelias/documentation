# Add Mapzen Search geocoder to a map

[Mapzen Search](https://mapzen.com/projects/search) is a modern, geographic search service based entirely on open-source tools and powered entirely by open data. To start integrating Mapzen Search to your apps, you need a [developer API key](api-keys-rate-limits.md). You might use this functionality in any app that has a geographic component, including ones that deliver goods, locate hotels or venues, or even provide local weather forecasts.

Through a process known as [geocoding](search.md), Mapzen Search allows you to use natural language to find a particular place by entering an address or the name of a landmark or business, and then translates the result in to the geographic coordinates for mapping. Mapzen Search is built on [Pelias](https://github.com/pelias), an open-source geocoding project.

In this walkthrough, you will learn how to make a map with a search box that allows you to enter addresses and place names and locate them on a map. To complete the tutorial, you should have some familiarity with HTML and JavaScript, although all the source code is provided. You will need an [API key](https://mapzen.com/developers) to use Mapzen Search, which requires a GitHub account for authorization. You can use any text editor and operating system, but must maintain an Internet connection while you are working. The tutorial should take about 30 minutes to complete.

## Sign up for a Mapzen Search API key

***For Maptime Oakland: This section is optional during the meetup. You will be provided with a sample key that will expire following the event. If you want to continue using the Mapzen Search service afterward, you need to get your own API key.***

To use the geocoding service, you must first obtain an API key from Mapzen. Sign in at https://mapzen.com/developers to create and manage your API keys.

1. Go to https://mapzen.com/developers.
2. Sign in with your GitHub account. If you have not done this before, you need to agree to the terms first.
3. Create a new key for Mapzen Search, and optionally, give it a project name so you can remember the purpose of the key.
4. Keep the web page open so you can copy the key into the source code later.

## Download and install the dependencies

The Leaflet JavaScript library, which provides tools for zooming, displaying attributions, and drawing symbols, is one way you can build web and mobile maps. Leaflet is extensible, and developers have built additional tools for Leaflet maps, including the Mapzen Search plug-in.

To set up your development environment for this walkthrough, you need to download the geocoder plug-in.

1. Create a new folder on your machine named `geocoding-tutorial`. You will use this folder as your working directory where you can store the downloaded files.
3. Download or clone the [leaflet-geocoder GitHub repository](https://github.com/pelias/leaflet-geocoder) to make a copy of it on your local machine. You can click [Download Zip](https://github.com/pelias/leaflet-geocoder/archive/master.zip) on the GitHub repository website.
4. Unzip any zipped files.
5. Navigate to `leaflet-geocoder` folder (`leaflet-geocoder-master`, if you downloaded the zip).

    ![Downloaded and unzipped folder](images/geocoder-plug-in-files.png)

6. Navigate inside the `dist` subfolder and copy the images folder, leaflet-geocoder.css, and leaflet-geocoder.js files.
7. Paste the images folder and the two files into your `geocoding-tutorial` folder.

    ![Files needed for the walkthrough](images/geocoder-dist-folder.png)

## Create an index page

Now that you have downloaded the required dependent files, you are ready to start building your application. This example uses the simplest structure, a single index.html file.

1. At the root level of your working folder, create a file called index.html and open it in a text editor.

    ![New index.html file in folder](images/geocoder-new-index.png)

2. Add the basic HTML tags, including `<!DOCTYPE HTML>`, `<html>`, `<head>`, and `<body>`. Your HTML might look like this:

    ```html
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
    </body>
    </html>
    ```

3. In the `<head>` tag, add a title, such as `<title>My Geocoding Map</title>`.
4. On the next line, add a metadata tag to set the character encoding.
  ```html
  <meta charset="utf-8">
  ```
4. Save your edits to the index.html file.
5. Drag your index.html file onto a web browser tab. It should show your title, `My Geocoding Map`, but the web page canvas is blank.

  ![Blank html page](images/geocoder-blank-tab.png)

You HTML should look like this:
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Geocoding Map</title>
  <meta charset="utf-8">
</head>
<body>
</body>
</html>
```

As you are working, it’s a good idea to save your edits and periodically reload the browser page. This helps you identify problems quicker and trace them back to your most recent changes.

## Add references to CSS and JavaScript files

Because you are working with several external cascading style sheet (CSS) and JavaScript files, you need to add references to them in your index.html file. These include style sheets and JavaScript files for Leaflet and the geocoder. You will need to add these into the <head> and <body> sections of the index.html.

1. In index.html, at the bottom of the `<head>` section, add references to the Leaflet CSS and JavaScript files. You are referencing these from a website, rather than from a file on your machine.

    ```html
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.js"></script>
    ```

2. In the `<head>` section, immediately after the Leaflet lines, add references to the geocoder CSS and JavaScript files. These files are from the GitHub repository you copied to your machine.

    ```html
    <link rel="stylesheet" href="../geocoding-tutorial/pelias-leaflet-geocoder.css">
    <script src="../geocoding-tutorial/pelias-leaflet-geocoder.js"></script>
    ```

3. Save your edits and refresh the browser. It should still appear empty because you have not added any code to interact with these references.

After adding these, your index.html file should look something like this.

```html
<!DOCTYPE html>
<html>
  <head>
  <title>My Geocoding Map</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.js"></script>
  <link rel="stylesheet" href="../geocoding-tutorial/pelias-leaflet-geocoder.css">
  <script src="../geocoding-tutorial/pelias-leaflet-geocoder.js"></script>
</head>
<body>
</body>
</html>
```

## Add a map to the page

To display a Leaflet map on a page, you need a `<div>` element with an ID value, as well as a size for the box containing the map. If you want to know more about initializing a Leaflet map, see the [Leaflet getting started documentation](http://leafletjs.com/examples/quick-start.html).

1. At the bottom of the `<head>` section, after the references you added in the previous steps, add a `<style>` tag and the following size attributes to set the size of the map.

  ```html
  <style>
    #map {
      height: 100%;
      width: 100%;
      position: absolute;
    }
  </style>
  ```

2. At the top of the `<body>` section, add the `<div>`.

    ```html
    <div id="map"></div>
    ```

3. Immediately after the `<div>`, add this JavaScript code within a `<script>` tag to initialize Leaflet. `L.xxxxx` is a convention used with the Leaflet API. The `setView([37.804146, -122.275045], 16)` sets the center of the map, in decimal degrees, and the zoom level. The map is centered at the Maptime Oakland meeting location, with a zoom level that allows you to see the streets and features of the city. Zoom levels are similar to map scales or resolutions, where a smaller value shows a larger area in less detail, and a larger zoom level value depicts smaller area in great detail.

    ```html
    <script>
      var map = L.map('map').setView([37.804146, -122.275045], 16);
    </script>
    ```
4. Within the same `<script>` tag as `var map = `, add a line to set the data source for the map. This line adds the default OpenStreetMap tiles and an attribution.

    ```html
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
    ```
5. Save your edits and refresh the browser. You should see a map with OpenStreetMap tiles, zoom controls, and a Leaflet attribution in the bottom corner.

    ![Leaflet canvas map with controls and attribution](images/geocoder-osm-leaflet.png)

Your index.html should look something like this:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Geocoding Map</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.js"></script>
  <link rel="stylesheet" href="../geocoding-tutorial/pelias-leaflet-geocoder.css">
  <script src="../geocoding-tutorial/pelias-leaflet-geocoder.js"></script>
  <style>
    #map {
      height: 100%;
      width: 100%;
      position: absolute;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map').setView([37.804146, -122.275045], 16);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
  </script>
</body>
</html>
```

## Add the Search box

So far, you have referenced the necessary files, initialized Leaflet with a map container on the page, and added data to the map. Now, you are ready to add the Search box from the Mapzen Search plug-in.

1. Inside the same `<script>` tag, and after the `}).addTo(map);` line, initialize a search box with the following code. You must include a valid Mapzen Search API key to make the map load properly. If you have obtained your own API key from https://mapzen.com/developers, you can paste it here.

    ```js
    var geocoder = L.control.geocoder('search-VzKH_PI').addTo(map);
    ```
2. Save your edits and refresh the browser. You should see a small magnifying glass icon in the left corner, near the zoom controls.

    ![Search icon on the map canvas](images/geocoder-search-icon.png)

3. Click the button to display the Search box on the map. The Search box closes if you click away from it.

    ![Expanded Search box on the map canvas](images/geocoder-search-box.png)

Your `<body>` section should look like this:

```html
[...]
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map').setView([37.804146, -122.275045], 16);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
    var geocoder = L.control.geocoder('search-VzKH_PI').addTo(map);
  </script>
</body>
[...]]
```

## Search for places on the map

1. On the map, type a place name or address in the Search box. As you type, the text automatically completes to suggest matching results.
2. Click a result in the list to zoom and add a point to the map at that location.

    ![Entering an address to find on the map](images/geocoder-address-search.png)

Mapzen Search uses a [variety of open data sources](https://mapzen.com/documentation/search/data-sources/), including OpenStreetMap. In some cases, you may be unable to find the location you are expecting, which could be an indicator that the data has limitations. Part of the power of open data is that you are able to correct it. If you want to note a problem, you can add an issue to the [Pelias GitHub repository](https://github.com/pelias/pelias/issues).

## Walkthrough summary and next steps

In this walkthrough, you learned the basics of adding the Mapzen Search geocoding engine to a Leaflet map.

You can review the [documentation](https://mapzen.com/documentation/search/) to learn more about geocoding with Mapzen Search.