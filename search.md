# Mapzen Search: Finding places

Geospatial search, commonly referred to as geocoding, is the process of matching an address to its corresponding geographic coordinates.

There's nothing inherent in the language we use to describe a physical address that allows us to convert that human readable sentence in to a format that a computer can understand, such as latitude & longitude.

Making the leap from text to coordinates is an intricate and challenging process. Lucky for you, Mapzen has done all the hard work and made it accessible though a free web service.

All Mapzen Search requests share the same format:

```
   https://search.mapzen.com/v1/search?text=London&api_key=search-xxxxxx
   \___/   \_______________/\__/\_____/\__________/\___________________/
     |            |          /     |        |                |
  scheme       domain   version  path     query     authentication token
```

## Search the world

![Searching globally](/images/world_all.png)

In the simplest search, you can provide only one parameter, the text you want to match in any part of the location details. To accomplish this, build a query where the `text` parameter is set to the item you want to find.

For example, if you want to find a [YMCA](https://en.wikipedia.org/wiki/YMCA) facility, here's what you'd need to append to the base URL of the service, `search.mapzen.com`.

> [/v1/search?api_key=search-XXXXXXX&___text=YMCA___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA)

Note the parameter values are set as follows:

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |

Clicking the link above will open a file containing the best matching results for the text `YMCA`. You will notice the data is in a computer-friendly format called [GeoJSON](http://geojson.org/), which may be hard for humans to read in some browsers.

If you are having trouble seeing the JSON in your browser, you can install a browser extension for [Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) or [Firefox](https://addons.mozilla.org/en-us/firefox/addon/jsonview/) that will make it easier for you to read.

In the example above, you will find the name of each matched locations in a property named `'label'`. The top 10 labels returned were:

> * YMCA, Bargoed Community, United Kingdom
* YMCA, Nunspeet, Gelderland
* YMCA, Belleville, IL
* YMCA, Forest City, IA
* YMCA, Fargo, ND
* YMCA, Taipei, Taipei City
* YMCA, Orpington, Greater London
* YMCA, Frisco, TX
* YMCA, Jefferson, OH
* YMCA, Belleville, IL

Spelling matters, but not capitalization when performing a query with Mapzen Search. You can type `ymca`, `YMCA`, or even `yMcA`. See for yourself by comparing the results of the previous search to the following:

> [/v1/search?api_key=search-XXXXXXX&___text=yMcA___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=yMcA)

Note that the results are spread out throughout the world because you have not given your current location or provided any other geographic context in which to search.

## Set the number of results returned

By default, Mapzen Search results 10 places, unless otherwise specified. If you want a different number of results, set the `size` parameter to the desired number. This example shows returning only the first result.

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `size` | 1 |

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___size=1___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&size=1)

If you want 25 results, you can build the query where `size` is 25.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___size=25___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&size=25)


## Narrow your search

If you are looking for places in a particular region, or country, or only want to look in the immediate vicinity of a user with a known location, you can narrow your search to an area. There are different ways of including a region in your query. Mapzen Search currently supports three types: country, rectangle, and circle.

### Search within a particular country

![Searching in a country](/images/world_country.png)

Sometimes your work might require that all the search results be from a particular country. To do this, you can set the `boundary.country` parameter value to the alpha-2 or alpha-3 [ISO-3166 country code](https://en.wikipedia.org/wiki/ISO_3166-1).

Now, you want to search for YMCA again, but this time only in Great Britain. To do this, you will need to know that the alpha-3 code for Great Britain is GBR and set the parameters like this:

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___boundary.country=GBR___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&boundary.country=GBR)

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `boundary.country` | GBR |

Note that all the results reside within Great Britain:

> * YMCA, Bargoed Community, United Kingdom
* YMCA, Orpington, Greater London
* YMCA, Erdington, West Midlands
* YMCA, Malvern CP, United Kingdom
* YMCA, Ancoats, Greater Manchester
* YMCA, Carmarthen Community, United Kingdom
* YMCA, Halebank, Cheshire
* YMCA, Brightlingsea CP, United Kingdom
* YMCA, Lenton Abbey, Nottinghamshire
* YMCA, Old Clee, Lincolnshire

If you attempt the same search request with different country codes, the results change to reflect YMCA locations within this region.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___boundary.country=USA___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&boundary.country=USA)

Results in the United States:

> * YMCA, Belleville, IL
* YMCA, Forest City, IA
* YMCA, Fargo, ND
* YMCA, Frisco, TX
* YMCA, Jefferson, OH
* YMCA, Belleville, IL
* YMCA, Chapel Hill, NC
* YMCA, West Lampeter, PA
* YMCA, Bremerton, WA
* YMCA, Westerly, RI

### Search within a rectangular region

![Searching in a bounding box](/images/world_rect.png)

To specify the boundary using a rectangle, you need latitude, longitude coordinates for two diagonals of the bounding box (the minimum and the maximum latitude, longitude).

For example, to find a YMCA within the state of Texas, you can set the `boundary.rect.*` parameter to values representing the bounding box around Texas: min_lon=-106.65 min_lat=25.84 max_lon=-93.51 max_lat=36.5

  Tip: You can look up a bounding box for a known region with this [web tool](http://boundingbox.klokantech.com/).

 [/v1/search?api_key=search-XXXXXXX&text=YMCA&___boundary.rect.min_lat=25.84&boundary.rect.min_lon=-106.65&boundary.rect.max_lat=36.5&boundary.rect.max_lon=-93.51___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&boundary.rect.min_lat=25.84&boundary.rect.min_lon=-106.65&boundary.rect.max_lat=36.5&boundary.rect.max_lon=-93.51)

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `boundary.rect.min_lat` | 25.84 |
| `boundary.rect.min_lon` | -106.65 |
| `boundary.rect.max_lat` | 36.5 |
| `boundary.rect.max_lon` | -93.51 |

> * YMCA, Austin, TX
* YMCA, Frisco, TX
* Y.M.C.A, Fort Worth, TX
* YMCA, Rockwall, TX
* YMCA, Missouri City, TX
* YMCA, Northshore, TX
* YMCA, Austin, TX
* YMCA, Tulsa, OK
* YMCA, Los Alamos, NM
* YMCA, Tulsa, OK

### Search within a circular region

![Searching within a circle](/images/world_circle.png)

Sometimes you don't have a rectangle to work with, but rather you have a point on earth&mdash;for example, your location coordinates&mdash;and a maximum distance within which acceptable results can be located.

In this example, you want to find all YMCA locations within a 35-kilometer radius of a location in Ontario, Canada. This time, you can use the `boundary.circle.*` parameter group, where `boundary.circle.lat` and `boundary.circle.lon` represents your location in Ontario and `boundary.circle.radius` is the acceptable distance from that location. Note that the `boundary.circle.radius` parameter is always specified in kilometers.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&__boundary.circle.lon=-79.186484&boundary.circle.lat=43.818156&boundary.circle.radius=35__](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&boundary.circle.lon=-79.186484&boundary.circle.lat=43.818156&boundary.circle.radius=35)

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `boundary.circle.lat` | 43.818156 |
| `boundary.circle.lon` | -79.186484 |
| `boundary.circle.radius` | 35 |

You can see the results have fewer than the standard 10 items because there are not that many YMCA locations in the specified radius:

> * YMCA, Toronto, Ontario
* YMCA, Markham, Ontario
* YMCA, Toronto, Ontario
* Metro Central YMCA, Toronto, Ontario
* Pinnacle Jr YMCA, Toronto, Ontario
* Cooper Koo Family Cherry Street YMCA Centre, Toronto, Ontario

### Specify multiple boundaries

![Searching within multiple regions](/images/overlapping_boundaries.gif)

If you're going to attempt using multiple boundary types in a single search request, be aware that the results will come from the intersection of all the boundaries. So, if you provide regions that don't overlap, you'll be looking at an empty set of results.

## Prioritize results by proximity
Many use cases call for the ability to promote nearby results to the top of the list, while still allowing important matches from farther away to be visible. Mapzen Search allows you to prioritize results within geographic boundaries, including around a point, within a country, or within a region.

### Prioritize around a point

![Searching around a point](/images/focus_point.png)

By specifying a `focus.point`, nearby places will be scored higher depending on how close they are to the `focus.point` so that places with higher scores will appear higher in the results list. The effect of this scoring boost diminishes to zero after 100 kilometers away from the `focus.point`. After all the nearby results have been found, additional results will come from the rest of the world, without any further location-based prioritization.

To find YMCA again, but this time near a specific coordinate location (representing the Sydney Opera House) in Sydney, Australia, use `focus.point`.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___focus.point.lat=-33.856680&focus.point.lon=151.215281___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&focus.point.lat=-33.856680&focus.point.lon=151.215281)

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `focus.point.lat` | -33.856680 |
| `focus.point.lon` | 151.215281 |

Looking at the results, you can see that the few locations closer to this location show up at the top of the list, sorted by distance. You also still get back a significant amount of remote locations, for a well balanced mix. Because you provided a focus point, Mapzen Search can compute distance from that point for each resulting feature.

> * YMCA, Redfern, New South Wales [distance: 3.836]
* YMCA, St Ives (NSW), New South Wales [distance: 14.844]
* YMCA, Epping (NSW), New South Wales [distance: 16.583]
* YMCA, Revesby, New South Wales [distance: 21.335]
* YMCA, Kochâang, South Gyeongsang [distance: 8071.436]
* YMCA, Center, IN [distance: 14882.675]
* YMCA, Lake Villa, IL [distance: 14847.667]
* YMCA, Onondaga, NY [distance: 15818.08]
* YMCA, 's-Gravenhage, Zuid-Holland [distance: 16688.292]
* YMCA, Loughborough, United Kingdom [distance: 16978.367]

## Combine boundary search and prioritization
Now that you have seen how to use boundary and focus to narrow and sort your results, you can examine a few scenarios where they work well together.

### Prioritize within a country

Going back to the YMCA search you conducted with a focus around a point in Sydney, the results came back from distant parts of the world, as expected. But say you wanted to only see results from the country in which your focus point lies. You can combine that same focus point in Sydney with the country boundary of Australia like this.

> [/v1/search?api_key={YOUR-KEY}&text=YMCA&___focus.point.lat=-33.856680&focus.point.lon=151.215281___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&focus.point.lat=-33.856680&focus.point.lon=151.215281)

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `focus.point.lat` | -33.856680 |
| `focus.point.lon` | 151.215281 |
| `boundary.country` | AUS |

The results below look very different from the ones you saw previously with only a focus point specified. These results are all from within Australia. You'll note the closest results show up at the top of the list, which is facilitated by the focus parameter.

> * YMCA, Redfern, New South Wales [distance: 3.836]
* YMCA, St Ives (NSW), New South Wales [distance: 14.844]
* YMCA, Epping (NSW), New South Wales [distance: 16.583]
* YMCA, Revesby, New South Wales [distance: 21.335]
* YMCA, Larrakeyah, Northern Territory [distance: 3144.296]
* YMCA, Kepnock, Queensland [distance: 1001.657]
* YMCA, Kings Meadows, Tasmania [distance: 917.144]
* YMCA, Katherine East, Northern Territory [distance: 2873.376]
* YMCA, Sadadeen, Northern Territory [distance: 2026.731]
* YMCA, Ararat, Victoria [distance: 841.022]

### Prioritize within a circular region

If you are looking for the nearest YMCA locations, and are willing to travel no farther than 50 kilometers from your current location, you likely would want the results to be sorted by distance from current location to make your selection process easier. You can get this behavior by using `focus.point` in combination with `boundary.circle.*`. You can use the `focus.point.*` values as the `boundary.circle.lat` and `boundary.circle.lon`, and add the required `boundary.circle.radius` value in kilometers.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&focus.point.lat=-33.856680&focus.point.lon=151.215281&___boundary.circle.lat=-33.856680&boundary.circle.lon=151.215281&boundary.circle.radius=50___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&focus.point.lat=-33.856680&focus.point.lon=151.215281&boundary.circle.lat=-33.856680&boundary.circle.lon=151.215281&boundary.circle.radius=50)

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `focus.point.lat` | -33.856680 |
| `focus.point.lon` | 151.215281 |
| `boundary.circle.lat` | -33.856680 |
| `boundary.circle.lon` | 151.215281 |
| `boundary.circle.radius` | 50 |

Looking at these results, they are all less than 50 kilometers away from the focus point:

> * YMCA, Redfern, New South Wales [distance: 3.836]
* YMCA, St Ives (NSW), New South Wales [distance: 14.844]
* YMCA, Epping (NSW), New South Wales [distance: 16.583]
* YMCA, Revesby, New South Wales [distance: 21.335]
* Caringbah YMCA, Caringbah, New South Wales [distance: 22.543]
* YMCA building, Loftus, New South Wales [distance: 25.756]

## Filter your search

Mapzen Search brings together data from multiple open sources and combines a variety of place types into a single database, allowing you options for selecting the dataset you want to search.

With Mapzen Search, you can filter by:

* `sources`: the originating source of the data
* `layers`: the kind of place you want to find

### Filter by data source
The search examples so far have returned a mix of results from all the data sources available to Mapzen Search. Here are the sources currently being searched:

| source | name | short name |
|---|---|---|
| [OpenStreetMap](http://www.openstreetmap.org/) | `openstreetmap` | `osm` |
| [OpenAddresses](http://openaddresses.io/) | `openaddresses` | `oa` |
| [Quattroshapes](http://quattroshapes.com/) | `quattroshapes` | `qs` |
| [GeoNames](http://www.geonames.org/) | `geonames` | `ga` |

If you use the `sources` parameter, you can choose which of these data sources to include in your search. So if you're only interested in finding a YMCA in data from OpenAddresses, for example, you can build a query specifying that data source.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___sources=oa___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&sources=oa)

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `sources` | oa |

Because OpenAddresses is, as the name suggests, only address data, here's what you can expect to find:

> * 0 Ymca, New Brunswick
* 0 Ymca Drive, Cary, NC
* 14843 Ymca Lane, Cormorant, MN
* 14660 Ymca Lane, Cormorant, MN
* 6221 Ymca Lane, Northampton County, VA
* 6223 Ymca Lane, Northampton County, VA
* 74 Ymca Road, Wairoa District, Hawke's Bay Region
* 108 Ymca Drive, Clinton, SC
* 101 Ymca Drive, Kannapolis, NC
* 31440 Ymca Road, Washington, OH

If you wanted to combine several data sources together, set `sources` to a comma separated list of desired source names. Note that the order of the comma separated values does not impact sorting order of the results; they are still sorted based on the linguistic match quality to `text` and distance from `focus`, if you specified one.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___sources=osm,gn___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&sources=oa)

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `sources` | osm,gn |

Each of these data sources has properties, licenses, and strengths. You can learn more about the [data sources for Mapzen Search](data-sources.md).

### Filter by data type
In Mapzen Search, place types are referred to as `layers`, ranging from fine to coarse. The Mapzen Search layers are derived from the hierarchy created by the gazetteer [Who's on First](https://github.com/whosonfirst/whosonfirst-placetypes/blob/master/README.md) and can be used to facilitate coarse geocoding. Here's a list of the types of places you could find in the results, sorted by granularity:

|layer|description|
|----|----|
|`venue`|points of interest, businesses, things with walls|
|`address`|places with a street address|
|`country`|places that issue passports, nations, nation-states|
|`region`|states and provinces|
|`county`|official governmental area; usually bigger than a locality, almost always smaller than a region|
|`locality`|towns, hamlets, cities|
|`localadmin`|local administrative boundaries|
|`neighbourhood`|social communities, neighbourhoods|
|`coarse`|alias for simultaneously using `country`, `region`, `county`, `locality`, `localadmin`, and `neighbourhood`|
