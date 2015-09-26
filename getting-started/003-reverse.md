# Reverse geocoding

Reverse geocoding is used for finding places near a latitude/longitude pair.  Think of it as clicking on a map to see what's there when the map doesn't show it otherwise.  For example, picture a map in your mind with building outlines but no labels then clicking on a building and being shown what business is there.  That's reverse geocoding.  

With reverse geocoding, you can lookup all sorts of information about a point on a map, including:

* addresses
* points of interest (businesses, museums, parks, etc)
* neighborhoods
* cities
* states
* postal areas
* countries

So [go get an API key](https://mapzen.com/developers) and let's get started.

## The Basics

To get started with reverse geocoding, all you need is an API key and a latitude/longitude pair specified with the parameters `point.lat` and `point.lon`, respectively.  For example, the Eiffel Tower in Paris, France is at the latitude/longitude pair `48.858268,2.294471`.  The reverse geocode query for this would be:

>[/v1/reverse?api\_key={YOUR-KEY}&___point.lat=48.858268___&___point.lon=2.294471___](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=48.858268&point.lon=2.294471)

Notice that the first result is the Eiffel Tower (well, Tour Eiffel).  It's as easy as that!  The output is the standard GeoJSON format.

## Advanced Usage

Like other entry points, reverse geocoding can use additional parameters to refine results.  

### Size

The most basic parameter for filtering is `size` that is used to limit the number of results returned.  In the previous request that returned the Eiffel Tower (or 'Tour Eiffel', to be exact), notice that other results were returned including "Bureau de Gustave Eiffel" (a museum) and "Le Jules Verne" (a restaurant).  To limit a reverse geocode to only the first result, just pass the `size` parameter:

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=48.858268&point.lon=2.294471&___size=1___](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=48.858268&point.lon=2.294471&size=1)

The default value for `size` is `10` and the maximum value is `40`.  Specifying a value greater than `40` will override to `40` and return a warning in the response metadata.  

### Sources

By default, reverse geocoding will return results from any source.  To filter results by source, specify one or more valid source names in a comma-delimited list using the `sources` parameter.  For example, the following request returns only results from OSM:

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=48.858268&point.lon=2.294471&___sources=osm___](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=48.858268&point.lon=2.294471&sources=osm)

For more information on the data each source provides, see [this link](http://source link).

### Layers

Without specifying further, reverse geocoding doesn't restrict results to a particular type (street, venue, neighbourhood, etc).  If your application is only concerned with, say, which city a latitude/longitude is closest to, then use the `layers` parameter.  For example, the following request returns only results that are localities (cities and towns):

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=48.858268&point.lon=2.294471&___layers=locality___](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=48.858268&point.lon=2.294471&layers=locality)

For more information on what the different layers mean, see [this link](http://layers link).

### Country

Let's say you're reverse geocoding close a country boundary but you are only interested in results from one country and not the other.  In that case, you would specify the 2- or 3-character ISO code of the country you're interested in to only get those results back.  For example, the latitude/longitude pair `47.270521,9.530846` is right on the boundary of Austria, Liechtenstein, and Switzerland.  Without specifying a `boundary.country` parameter value, the first 10 results returned would be from all 3 countries.  By specifying `boundary.country=LIE`, all 10 results will be from Liechtenstein.  Here's the request in action:

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=47.270521&point.lon=9.530846&___boundary.country=LIE___](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=47.270521&point.lon=9.530846&boundary.country=LIE)

Please click <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="\_blank">here</a> for the full list of ISO 3166-1 alpha-2 and alpha-3 country codes.

Also note that `UK` is not a valid ISO 3166-1 alpha-2 country code.  

## Confidence Scores

Each result returned has an associated confidence score.  Currently confidence scores are calculated based on the distance from the result to the supplied `point.lat` and `point.lon`.  

distance from `point.lat`/`point.lon` | Confidence Score
--- | ---
&lt; 1m | 1.0
&lt; 10m | 0.9
&lt; 100m | 0.8
&lt; 250m | 0.7
&lt; 1km | 0.6
&gt;= 1km | 0.5

Confidence scoring for reverse geocode results is likely to change to take into account different data sources and layers.  

## Parameters

This section provides a quick reference for parameters applicable to reverse geocoding requests.  

parameter | type | required | default | example
--- | --- | --- | --- | ---
`api_key` | string | yes | none | [get yours here!](https://mapzen.com/developers)
`point.lat` | floating point number | yes | none | `48.858268`
`point.lon` | floating point number | yes | none | `2.294471`
`size` | integer | no | `10` | `3`
`layers` | comma-delimited string array | no | none (all layers) | `oa,gn`
`sources` | comma-delimited string array | no | none (all sources) | `address,locality`
`boundary.country` | <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="\_blank">ISO-3166 alpha-2 or alpha-3</a> | no | none | `FR`

## Example Requests

This section shows how the various parameters can be combined to form complex use cases.  

#### All results near the Tower of London

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=51.5081124&point.lon=-0.0759493](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=51.5081124&point.lon=-0.0759493)

#### Only OpenStreetMap results near the Tower of London

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=51.5081124&point.lon=-0.0759493&sources=osm](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=51.5081124&point.lon=-0.0759493&sources=osm)

#### Only street addresses near the Tower of London

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=51.5081124&point.lon=-0.0759493&layers=address](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=51.5081124&point.lon=-0.0759493&layers=address)

#### Only OpenStreetMap street addresses near the Tower of London

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm)

#### Only the first OpenStreetMap address near the Tower of London

>[/v1/reverse?api\_key={YOUR-KEY}&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm&size=1](https://search.mapzen.com/v1/reverse?api_key={YOUR_API_KEY}&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm&size=1)
