# Pelias: Finding places

Geocoding is the process of matching an address or other text to its corresponding geographic coordinates.

All Pelias requests share the same format:

```
   https://search.mapzen.com/v1/search?text=London
   \___/   \_______________/\__/\_____/\_________/
     |            |          /     |        |
  scheme       domain   version  path     query
```

## Search the world

![Searching globally](/assets/images/world_all.png)

In the simplest search, you can provide only one parameter, the text you want to match in any part of the location details. To do this, build a query where the `text` parameter is set to the item you want to find.

For example, if you want to find a [YMCA](https://en.wikipedia.org/wiki/YMCA) facility, here's what you'd need to append to the base URL of the service.

> [/v1/search?__text=YMCA__](http://pelias.github.io/compare/#/v1/search%3Ftext=YMCA)

Note the parameter values are set as follows:

| parameter | value |
| :--- | :--- |
| `text` | YMCA |

Clicking the link above will open a file containing the best matching results for the text `YMCA`. You will notice the data is in a computer-friendly format called [GeoJSON](http://geojson.org/), which may be hard for humans to read in some browsers.

You can install a plug-in for your browser to display JSON in a more formatted manner. You can search the web store for your browser to find and install applicable products.

In the example above, you will find the name of each matched locations in a property named `'label'`. The top 10 labels returned at the time of writing were:

* YMCA, Bargoed Community, United Kingdom
* YMCA, Nunspeet, Gelderland
* YMCA, Belleville, IL
* YMCA, Forest City, IA
* YMCA, Fargo, ND
* YMCA, Taipei, Taipei City
* YMCA, Orpington, Greater London
* YMCA, Frisco, TX
* YMCA, Jefferson, OH
* YMCA, Belleville, IL

Spelling matters, but not capitalization when performing a query with Pelias. You can type `ymca`, `YMCA`, or even `yMcA`. See for yourself by comparing the results of the earlier search to the following:

> [/v1/search?__text=yMcA__](http://pelias.github.io/compare/#/v1/search%3Ftext=yMcA)

Note that the results are spread out throughout the world because you have not given your current location or provided any other geographic context in which to search.

## Set the number of results returned

By default, Pelias returns up to 10 results. If you want a different number, set the `size` parameter to the desired number. This example shows returning only the first result.

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `size` | 1 |

> [/v1/search?text=YMCA&__size=1__](https://pelias.github.io/compare/#/v1/search%3Fsize=1&text=ymca)

If you want 25 results, you can build the query where `size` is 25.

> [/v1/search?text=YMCA&__size=25__](https://pelias.github.io/compare/#/v1/search%3Fsize=25&text=ymca)

## Narrow your search

If you are looking for places in a particular region, or country, or only want to look in the immediate vicinity of a user with a known location, you can narrow your search to an area. There are different ways of including a region in your query. Pelias supports three types: country, rectangle, and circle.

### Search within a particular country

![Searching in a country](/assets/images/world_country.png)

Sometimes your work might require that all the search results be from a particular country or a list of countries. To do this, you can set the `boundary.country` parameter value to a comma separated list of alpha-2 or alpha-3 [ISO-3166 country code](https://en.wikipedia.org/wiki/ISO_3166-1).

Now, you want to search for YMCA again, but this time only in Great Britain. To do this, you will need to know that the alpha-3 code for Great Britain is GBR and set the parameters like this:

> [/v1/search?text=YMCA&__boundary.country=GBR__](https://pelias.github.io/compare/#/v1/search%3Fboundary.country=GBR&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `boundary.country` | GBR |

Note that all the results are within Great Britain:

* YMCA, Bargoed Community, United Kingdom
* YMCA, Orpington, Greater London
* YMCA, Erdington, West Midlands
* YMCA, Malvern CP, United Kingdom
* YMCA, Ancoats, Greater Manchester
* YMCA, Carmarthen Community, United Kingdom
* YMCA, Halebank, Cheshire
* YMCA, Brightlingsea CP, United Kingdom
* YMCA, Lenton Abbey, Nottinghamshire
* YMCA, Old Clee, Lincolnshire

If you try the same search request with different country codes, the results change to show YMCA locations within this region.

> [/v1/search?text=YMCA&__boundary.country=USA__](https://pelias.github.io/compare/#/v1/search%3Fboundary.country=USA&text=ymca)

Results in the United States:

* YMCA, Belleville, IL
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

![Searching in a bounding box](/assets/images/world_rect.png)

To specify the boundary using a rectangle, you need latitude, longitude coordinates for two diagonals of the bounding box (the minimum and the maximum latitude, longitude).

For example, to find a YMCA within the state of Texas, you can set the `boundary.rect.*` parameter to values representing the bounding box around Texas: min_lon=-106.65 min_lat=25.84 max_lon=-93.51 max_lat=36.5

Tip: You can look up a bounding box for a known region with this [web tool](http://boundingbox.klokantech.com/).

> [/v1/search?text=YMCA&__boundary.rect.min_lat=25.84&boundary.rect.min_lon=-106.65&boundary.rect.max_lat=36.5&boundary.rect.max_lon=-93.51__](https://pelias.github.io/compare/#/v1/search%3Fboundary.rect.min_lat=25.84&boundary.rect.min_lon=-106.65&boundary.rect.max_lat=36.5&boundary.rect.max_lon=-93.51&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `boundary.rect.min_lat` | 25.84 |
| `boundary.rect.min_lon` | -106.65 |
| `boundary.rect.max_lat` | 36.5 |
| `boundary.rect.max_lon` | -93.51 |

* YMCA, Austin, TX
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

![Searching within a circle](/assets/images/world_circle.png)

Sometimes you don't have a rectangle to work with, but rather you have a point on earth&mdash;for example, your location coordinates&mdash;and a maximum distance within which acceptable results can be located.

In this example, you want to find all YMCA locations within a 35-kilometer radius of a location in Ontario, Canada. This time, you can use the `boundary.circle.*` parameter group, where `boundary.circle.lat` and `boundary.circle.lon` is your location in Ontario and `boundary.circle.radius` is the acceptable distance from that location. Note that the `boundary.circle.radius` parameter is always specified in kilometers.

> [/v1/search?text=YMCA&__boundary.circle.lon=-79.186484&boundary.circle.lat=43.818156&boundary.circle.radius=35__](https://pelias.github.io/compare/#/v1/search%3Fboundary.circle.lon=-79.186484&boundary.circle.lat=43.818156&boundary.circle.radius=35&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `boundary.circle.lat` | 43.818156 |
| `boundary.circle.lon` | -79.186484 |
| `boundary.circle.radius` | 35 |

You can see the results have fewer than the standard 10 items because there are not that many YMCA locations in the specified radius:

* YMCA, Toronto, Ontario
* YMCA, Markham, Ontario
* YMCA, Toronto, Ontario
* Metro Central YMCA, Toronto, Ontario
* Pinnacle Jr YMCA, Toronto, Ontario
* Cooper Koo Family Cherry Street YMCA Centre, Toronto, Ontario

### Search within a parent administrative area

Pelias has a powerful understanding of relationships between places. In particular, it has a concept called the administrative hierarchy: each record in Pelias is listed as belonging to a parent neighbourhood, city, region, country, and other regions. This has many uses, including filtering. The Pelias global id (`gid`) of any record can be used with the `boundary.gid` filter to return only records with a given parent.

For example, finding YMCAs in [Oklahoma](https://en.wikipedia.org/wiki/Oklahoma) with only a bounding box would be challenging: the bounding box would include much of nearby Texas, possibly leading to incorrect results.

With `boundary.gid`, this query can return accurate results.

> [/v1/search?text=YMCA&__boundary.gid=whosonfirst:region:85688585__](http://pelias.github.io/compare/#/v1/search%3Fboundary.gid=whosonfirst:region:85688585&text=ymca)

* YMCA, Stillwater, OK, USA
* YMCA, Edmond, OK, USA
* YMCA, Guymon, OK, USA
* YMCA, Grove, OK, USA
* YMCA, Midwest City, OK, USA
* YMCA, Shawnee, OK, USA
* YMCA, Owasso, OK, USA
* YMCA, Tulsa, OK, USA
* YMCA, The Village, OK, USA
* YMCA, Broken Arrow, OK, USA

In the query above, `whosonfirst:region:85688585`, is the Pelias `gid` for Oklahoma, USA. Currently, all parent records come from the [Who's on First](https://whosonfirst.org/) project. `gid`s for records can be found using either the [Who's on First Spelunker](http://spelunker.whosonfirst.org/), a tool for searching Who's on First data, or from the responses of other Pelias queries. In this case a [search for Oklahoma](http://pelias.github.io/compare/#/v1/search%3Ftext=oklahoma) will return the proper `gid`.

### Specify multiple boundaries

![Searching within multiple regions](/assets/images/overlapping_boundaries.gif)

If you're going to try using multiple boundary types in a single search request, be aware that the results will come from the intersection of all the boundaries. So, if you provide regions that don't overlap, you'll be looking at an empty set of results.

## Prioritize results by proximity
Many use cases call for the ability to promote nearby results to the top of the list, while still allowing important matches from farther away to be visible. Pelias allows you to prioritize results within geographic boundaries, including around a point, within a country, or within a region.

### Prioritize around a point

![Searching around a point](/assets/images/focus_point.png)

By specifying a `focus.point`, results will be sorted in part by their proximity to the given coordinate. All else being equal, results closest to the point will show up higher. However, unlike a `boundary.circle` query, important results far from the given coordinate may still be returned. This allows, for example, [a query for places called Paris with a `focus.point` value in Texas to return both Paris, TX and Paris, France](http://pelias.github.io/compare/#/v1/autocomplete%3Ffocus.point.lat=33.7568&focus.point.lon=-95.5362&layers=locality&sources=wof&text=paris).

To find YMCAs again, but this time near a specific coordinate location (representing the Sydney Opera House) in Sydney, Australia, use `focus.point`.

> [/v1/search?text=YMCA&__focus.point.lat=-33.856680&focus.point.lon=151.215281__](https://pelias.github.io/compare/#/v1/search%3Ffocus.point.lat=-33.856680&focus.point.lon=151.215281&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `focus.point.lat` | -33.856680 |
| `focus.point.lon` | 151.215281 |

Looking at the results, you can see that the few locations closer to this location show up at the top of the list, sorted by distance. You also still get back a significant amount of remote locations, for a well balanced mix. Because you provided a focus point, Pelias can compute distance from that point for each resulting feature.

* YMCA, Redfern, New South Wales [distance: 3.836]
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

> [/v1/search?text=YMCA&__focus.point.lat=-33.856680&focus.point.lon=151.215281__](https://pelias.github.io/compare/#/v1/search%3Ffocus.point.lat=-33.856680&focus.point.lon=151.215281&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `focus.point.lat` | -33.856680 |
| `focus.point.lon` | 151.215281 |
| `boundary.country` | AUS |

The results below look different from the ones you saw before with only a focus point specified. These results are all from within Australia. You'll note the closest results show up at the top of the list, which is helped by the focus parameter.

* YMCA, Redfern, New South Wales [distance: 3.836]
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

> [/v1/search?text=YMCA&focus.point.lat=-33.856680&focus.point.lon=151.215281&__boundary.circle.lat=-33.856680&boundary.circle.lon=151.215281&boundary.circle.radius=50__](https://pelias.github.io/compare/#/v1/search%3Ffocus.point.lat=-33.856680&focus.point.lon=151.215281&boundary.circle.lat=-33.856680&boundary.circle.lon=151.215281&boundary.circle.radius=50&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `focus.point.lat` | -33.856680 |
| `focus.point.lon` | 151.215281 |
| `boundary.circle.lat` | -33.856680 |
| `boundary.circle.lon` | 151.215281 |
| `boundary.circle.radius` | 50 |

Looking at these results, they are all less than 50 kilometers away from the focus point:

* YMCA, Redfern, New South Wales [distance: 3.836]
* YMCA, St Ives (NSW), New South Wales [distance: 14.844]
* YMCA, Epping (NSW), New South Wales [distance: 16.583]
* YMCA, Revesby, New South Wales [distance: 21.335]
* Caringbah YMCA, Caringbah, New South Wales [distance: 22.543]
* YMCA building, Loftus, New South Wales [distance: 25.756]

## Filter your search

Pelias brings together data from multiple open sources and combines a variety of place types into a single database, allowing you options for selecting the dataset you want to search.

With Pelias, you can filter by:

* `sources`: the originating source of the data
* `layers`: the kind of place you want to find

### Filter by data source
The search examples so far have returned a mix of results from all the data sources available to Pelias. Here are the sources being searched:

| source | name | short name |
|---|---|---|
| [OpenStreetMap](http://www.openstreetmap.org/) | `openstreetmap` | `osm` |
| [OpenAddresses](http://openaddresses.io/) | `openaddresses` | `oa` |
| [Who's on First](https://whosonfirst.org) | `whosonfirst` | `wof` |
| [GeoNames](http://www.geonames.org/) | `geonames` | `gn` |

If you use the `sources` parameter, you can choose which of these data sources to include in your search. So if you're only interested in finding a YMCA in data from OpenAddresses, for example, you can build a query specifying that data source.

> [/v1/search?text=YMCA&__sources=oa__](https://pelias.github.io/compare/#/v1/search%3Fsources=oa&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `sources` | oa |

Because OpenAddresses is, as the name suggests, only address data, here's what you can expect to find:

*	20 Ymca Drive, Niagara, ON, Canada
*	341 Ymca Rd, New Hope, AL, USA
*	318 Ymca Rd, New Hope, AL, USA
*	138 Ymca Rd, New Hope, AL, USA
*	304 Ymca Rd, New Hope, AL, USA
*	1919 Ymca Lane, Minnetonka, MN, USA
*	101 Ymca Dr, Kannapolis, NC, USA
*	2121 Ymca Camp Road, Stokes County, NC, USA
*	1110 Ymca Camp Road, Stokes County, NC, USA
*	1581 Ymca Camp Road, Stokes County, NC, USA

If you wanted to combine several data sources together, set `sources` to a comma separated list of desired source names. Note that the order of the comma separated values does not impact sorting order of the results; they are still sorted based on the linguistic match quality to `text` and distance from `focus`, if you specified one.

> [/v1/search?text=YMCA&__sources=osm,gn__](https://pelias.github.io/compare/#/v1/search%3Fsources=osm,gn&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `sources` | osm,gn |

Each of the data sources supported by Pelias can have different properties, licenses, and strengths. You can learn more on the [data sources for Pelias](data-sources.md) page.

### Filter by data type
In Pelias, different types of results are given different `layer` values. This helps us differentiate, for example, an address from a point of interest from a country.

The Pelias layers are derived from the hierarchy created by the gazetteer [Who's on First](https://github.com/whosonfirst/whosonfirst-placetypes/blob/master/README.md) and can be used to help you filter for just the types of results you want.

Here's a list of the types of places you could find in the results, sorted by granularity:

|layer|description|
|----|----|
|`venue`|points of interest, businesses, things with walls|
|`address`|places with a street address|
|`street`|streets,roads,highways|
|`neighbourhood`|social communities, neighbourhoods|
|`borough`|a local administrative boundary, currently only used for New York City|
|`localadmin`|local administrative boundaries|
|`locality`|towns, hamlets, cities|
|`county`|official governmental area; usually bigger than a locality, almost always smaller than a region|
|`macrocounty`|a related group of counties. Mostly in Europe.|
|`region`|states and provinces|
|`macroregion`|a related group of regions. Mostly in Europe|
|`country`|places that issue passports, nations, nation-states|
|`coarse`|alias for simultaneously using all administrative layers (everything except `venue` and `address`)|
|`postalcode`|postal code used by mail services|

> [/v1/search?text=YMCA&__layers=venue,address__](https://pelias.github.io/compare/#/v1/search%3Flayers=venue,address&text=ymca)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `layers` | venue,address |

## Available search parameters

| Parameter | Type | Required | Default | Example |
| --- | --- | --- | --- | --- |
| `text` | string | yes | none | `Union Square` |
| `focus.point.lat` | floating point number | no | none | `48.581755` |
| `focus.point.lon` | floating point number | no | none | `7.745843` |
| `boundary.rect.min_lon` | floating point number | no | none | `139.2794` |
| `boundary.rect.max_lon` | floating point number | no | none | `140.1471` |
| `boundary.rect.min_lat` | floating point number | no | none | `35.53308` |
| `boundary.rect.max_lat` | floating point number | no | none | `35.81346` |
| `boundary.circle.lat` | floating point number | no | none | `43.818156` |
| `boundary.circle.lon` | floating point number | no | none | `-79.186484` |
| `boundary.circle.radius` | floating point number | no | 50 | `35` |
| `boundary.gid` | Pelias `gid` | no | none | `whosonfirst:locality:101748355` |
| `sources` | string | no | all sources: osm,oa,gn,wof | openstreetmap,wof |
| `layers` | string | no | all layers: address,venue,neighbourhood,locality,borough,localadmin,county,macrocounty,region,macroregion,country,coarse,postalcode | address,venue |
| `boundary.country` | string | no | none | `GBR,FRA` |
| `size` | integer | no | 10 | 20 |
