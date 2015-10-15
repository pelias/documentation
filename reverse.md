# Reverse geocoding

Reverse geocoding is used for finding places or addresses near a latitude,longitude pair&mdashlike clicking on a map to see what's there when the map doesn't show it otherwise. For example, picture a map showing building outlines but no labels, then clicking on a building and being shown the name of the business. That's reverse geocoding.

With reverse geocoding with Mapzen Search, you can look up all sorts of information about points on a map, including:

* addresses
* points of interest (businesses, museums, parks, and so on)
* neighborhoods
* cities
* states
* postal areas
* countries

To get started with reverse geocoding, you need a [free, developer API key](https://mapzen.com/developers) and a latitude,longitude pair in decimal degrees specified with the parameters `point.lat` and `point.lon`, respectively.  For example, the Eiffel Tower in Paris, France, is located at `48.858268,2.294471`. The reverse geocode query for this would be:

>[/v1/reverse?api_key=search-XXXXXXX&___point.lat=48.858268___&___point.lon=2.294471___](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=48.858268&point.lon=2.294471)

Notice that the first result is the Eiffel Tower (well, Tour Eiffel). The output is the standard GeoJSON format.

## Reverse geocoding parameters

Similar to other queries with Mapzen Search, reverse geocoding has optional, additional parameters you can use to refine results.

Parameter | Type | Required | Default | Example
--- | --- | --- | --- | ---
`api_key` | string | yes | none | [get yours here!](https://mapzen.com/developers)
`point.lat` | floating point number | yes | none | `48.858268`
`point.lon` | floating point number | yes | none | `2.294471`
`size` | integer | no | `10` | `3`
`layers` | comma-delimited string array | no | none (all layers) | `oa,gn`
`sources` | comma-delimited string array | no | none (all sources) | `address,locality`
`boundary.country` | <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="\_blank">ISO-3166 alpha-2 or alpha-3</a> | no | none | `FR`

### Size

A basic parameter for filtering is `size`, which is used to limit the number of results returned. In the previous request that returned the Eiffel Tower (or 'Tour Eiffel', to be exact), notice that other results were returned including "Bureau de Gustave Eiffel" (a museum) and "Le Jules Verne" (a restaurant). To limit a reverse geocode to only the first result, pass the `size` parameter:

>[/v1/reverse?api_key=search-XXXXXXX&point.lat=48.858268&point.lon=2.294471&___size=1___](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=48.858268&point.lon=2.294471&size=1)

The default value for `size` is `10` and the maximum value is `40`. Specifying a value greater than `40` will override to `40` and return a warning in the response metadata.

### Filter by data source

By default, reverse geocoding returns results from any [data source](data-sources.md) available to Mapzen Search. To filter results by source, specify one or more valid source names in a comma-delimited list using the `sources` parameter. For example, the following request returns only results from OpenStreetMap:

>[/v1/reverse?api_key=search-XXXXXXX&point.lat=48.858268&point.lon=2.294471&___sources=osm___](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=48.858268&point.lon=2.294471&sources=osm)

### Filter by layers

Without specifying further, reverse geocoding doesn't restrict results to a particular type (street, venue, neighbourhood, and so on).  If your application is only concerned with, say, which city a latitude, longitude is closest to, then use the `layers` parameter.  For example, the following request returns only results that are localities (cities and towns):

>[/v1/reverse?api_key=search-XXXXXXX&point.lat=48.858268&point.lon=2.294471&___layers=locality___](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=48.858268&point.lon=2.294471&layers=locality)

### Filter by country

If you are performing a reverse geocode near a country boundary, and are only interested in results from one country and not the other, you can specify a country code. You can set the `boundary.country` parameter value to the alpha-2 or alpha-3 [ISO-3166 country code](https://en.wikipedia.org/wiki/ISO_3166-1). For example, the latitude,longitude pair `47.270521,9.530846` is on the boundary of Austria, Liechtenstein, and Switzerland. Without specifying a `boundary.country`, the first 10 results returned may come from all three countries. By including `boundary.country=LIE`, all 10 results will be from Liechtenstein. Here's the request in action:

>[/v1/reverse?api_key=search-XXXXXXX&point.lat=47.270521&point.lon=9.530846&___boundary.country=LIE___](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=47.270521&point.lon=9.530846&boundary.country=LIE)

Note that `UK` is not a valid ISO 3166-1 alpha-2 country code.

## Confidence scores for the results

Each result returned has an associated confidence score. Currently confidence scores are calculated based on the distance from the result to the supplied `point.lat` and `point.lon`. Confidence scoring for reverse geocode results is likely to change with different data sources and layers.

Distance from `point.lat`/`point.lon` | Confidence score
--- | ---
&lt; 1m | 1.0
&lt; 10m | 0.9
&lt; 100m | 0.8
&lt; 250m | 0.7
&lt; 1km | 0.6
&gt;= 1km | 0.5

## Example requests

This section shows how the various parameters can be combined to form complex use cases.

* All results near the Tower of London
>[/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493)

* Only OpenStreetMap results near the Tower of London
>[/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493&sources=osm](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493&sources=osm)

* Only street addresses near the Tower of London
>[/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493&layers=address](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493&layers=address)

* Only OpenStreetMap street addresses near the Tower of London
>[/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm)

* Only the first OpenStreetMap address near the Tower of London
>[/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm&size=1](https://search.mapzen.com/v1/reverse?api_key=search-XXXXXXX&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm&size=1)
