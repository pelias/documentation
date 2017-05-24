# Reverse geocoding

Reverse geocoding is used for finding places or addresses near a latitude, longitude pair&mdash;like clicking on a map to see what's there when the map doesn't show it otherwise. For example, picture a map showing building outlines but no labels, then clicking on a building and being shown the name of the business. That's reverse geocoding.

With reverse geocoding with Mapzen Search, you can look up all sorts of information about points on a map, including:

* addresses
* points of interest (businesses, museums, parks, and so on)
* neighborhoods
* cities
* states
* postal areas
* countries

To get started with reverse geocoding, you need a latitude, longitude pair in decimal degrees specified with the parameters `point.lat` and `point.lon`, respectively.  For example, the Eiffel Tower in Paris, France, is located at `48.858268,2.294471`. The reverse geocode query for this would be:

```
https://search.mapzen.com/v1/reverse??api_key=your-mapzen-api-key&point.lat=48.858268&point.lon=2.294471
```

Notice that the first result is the Eiffel Tower (well, _Tour Eiffel_). The output is the standard GeoJSON format:


```
{
  geocoding: {
    version: "0.2",
    attribution: "https://search.mapzen.com/v1/attribution",
    query: {
      size: 10,
      private: false,
      point.lat: 48.858268,
      point.lon: 2.294471,
      boundary.circle.radius: 1,
      boundary.circle.lat: 48.858268,
      boundary.circle.lon: 2.294471,
      lang: {
        name: "English",
        iso6391: "en",
        iso6393: "eng",
        defaulted: true
      },
      querySize: 20
    },
    engine: {
      name: "Pelias",
      author: "Mapzen",
      version: "1.0"
    },
    timestamp: 1494452713373
  },
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    geometry: {
    type: "Point",
    coordinates: [
      2.294501,
      48.858262
    ]},
    properties: {
      id: "node:4013678139",
      gid: "openstreetmap:venue:node:4013678139",
      layer: "venue",
      source: "openstreetmap",
      source_id: "node:4013678139",
      name: "75056Y - A",
      confidence: 0.9,
      distance: 0.002,
      accuracy: "point",
      country: "France",
      country_gid: "whosonfirst:country:85633147",
      country_a: "FRA",
      macroregion: "Île-De-France",
      macroregion_gid: "whosonfirst:macroregion:404227465",
      region: "Paris",
      region_gid: "whosonfirst:region:85683497",
      macrocounty: "1st Arrondissement",
      macrocounty_gid: "whosonfirst:macrocounty:404227749",
      county: "7th Arrondissement",
      county_gid: "whosonfirst:county:102068177",
      locality: "Paris",
      locality_gid: "whosonfirst:locality:101751119",
      neighbourhood: "Quartier du Gros-Caillou",
      neighbourhood_gid: "whosonfirst:neighbourhood:85873841",
      label: "75056Y - A, Paris, France"
    }
  }],
  bbox: [
    2.293308,
    48.857475,
    2.29569,
    48.859047
  ]
}
```

[Log in]() or [sign up]() to see demo request

## Reverse geocoding parameters

Like other queries with Mapzen Search, reverse geocoding has optional, additional parameters you can use to refine results.

Parameter | Type | Required | Default | Example
--- | --- | --- | --- | ---
`api_key` | string | yes | none | [get yours here!](https://mapzen.com/developers)
`point.lat` | floating point number | yes | none | `48.858268`
`point.lon` | floating point number | yes | none | `2.294471`
`size` | integer | no | `10` | `3`
`layers` | comma-delimited string array | no | none (all layers) | `address,locality`
`sources` | comma-delimited string array | no | none (all sources) | `oa,gn`
`boundary.country` | <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="\_blank">ISO-3166 alpha-2 or alpha-3</a> | no | none | `FR`

### Size

A basic parameter for filtering is `size`, which is used to limit the number of results returned. In the earlier request that returned the Eiffel Tower (or 'Tour Eiffel', to be exact), notice that other results were returned including "Bureau de Gustave Eiffel" (a museum) and "Le Jules Verne" (a restaurant). To limit a reverse geocode to only the first result, pass the `size` parameter:

>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=48.858268&point.lon=2.294471&___size=1___](https://search.mapzen.com/v1/reverse?point.lat=48.858268&point.lon=2.294471&size=1)

The default value for `size` is `10` and the maximum value is `40`. Specifying a value greater than `40` will override to `40` and return a warning in the response metadata.

### Filter by data source

By default, reverse geocoding returns results from any [data source](data-sources.md) available to Mapzen Search. To filter results by source, specify one or more valid source names in a comma-delimited list using the `sources` parameter. For example, the following request returns only results from OpenStreetMap:

| source | name | short name |
|---|---|---|
| [OpenStreetMap](http://www.openstreetmap.org/) | `openstreetmap` | `osm` |
| [OpenAddresses](http://openaddresses.io/) | `openaddresses` | `oa` |
| [Who's on First](https://whosonfirst.mapzen.com) | `whosonfirst` | `wof` |
| [GeoNames](http://www.geonames.org/) | `geonames` | `gn` |

>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=48.858268&point.lon=2.294471&___sources=osm___](https://search.mapzen.com/v1/reverse?point.lat=48.858268&point.lon=2.294471&sources=osm)

### Filter by layers (data type)

Without specifying further, reverse geocoding doesn't restrict results to a particular type (street, venue, neighbourhood, and so on).  If your application is only concerned with, say, which city a latitude, longitude is closest to, then use the `layers` parameter.  For example, the following request returns only results that are localities (cities and towns):

>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=48.858268&point.lon=2.294471&___layers=locality___](https://search.mapzen.com/v1/reverse?point.lat=48.858268&point.lon=2.294471&layers=locality)

Here are all the supported layers and their meanings.

|layer|description|
|----|----|
|`venue`|points of interest, businesses, things with walls|
|`address`|places with a street address|
|`street`|streets,roads,highways|
|`country`|places that issue passports, nations, nation-states|
|`macroregion`|a related group of regions. Mostly in Europe|
|`region`|states and provinces|
|`macrocounty`|a related group of counties. Mostly in Europe.|
|`county`|official governmental area; usually bigger than a locality, almost always smaller than a region|
|`locality`|towns, hamlets, cities|
|`localadmin`|local administrative boundaries|
|`borough`| a local administrative boundary, currently only used for New York City|
|`neighbourhood`|social communities, neighbourhoods|
|`coarse`|alias for simultaneously using all administrative layers (everything except `venue` and `address`)|

### Filter by country

If you are performing a reverse geocode near a country boundary, and are only interested in results from one country and not the other, you can specify a country code. You can set the `boundary.country` parameter value to the alpha-2 or alpha-3 [ISO-3166 country code](https://en.wikipedia.org/wiki/ISO_3166-1). For example, the latitude,longitude pair `47.270521,9.530846` is on the boundary of Austria, Liechtenstein, and Switzerland. Without specifying a `boundary.country`, the first 10 results returned may come from all three countries. By including `boundary.country=LIE`, all 10 results will be from Liechtenstein. Here's the request in action:

>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=47.270521&point.lon=9.530846&___boundary.country=LIE___](https://search.mapzen.com/v1/reverse?point.lat=47.270521&point.lon=9.530846&boundary.country=LIE)

Note that `UK` is not a valid ISO 3166-1 alpha-2 country code.

## Distance Confidence scores for the results

Each result returned has a distance from the query point (in meters) and an associated confidence score. Confidence scores are calculated based on the distance from the result to the supplied `point.lat` and `point.lon`. Confidence scoring for reverse geocode results is likely to change with different data sources and layers.

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
>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=51.5081124&point.lon=-0.0759493](https://search.mapzen.com/v1/reverse?point.lat=51.5081124&point.lon=-0.0759493)

* Only OpenStreetMap results near the Tower of London
>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=51.5081124&point.lon=-0.0759493&sources=osm](https://search.mapzen.com/v1/reverse?point.lat=51.5081124&point.lon=-0.0759493&sources=osm)

* Only street addresses near the Tower of London
>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=51.5081124&point.lon=-0.0759493&layers=address](https://search.mapzen.com/v1/reverse?point.lat=51.5081124&point.lon=-0.0759493&layers=address)

* Only OpenStreetMap street addresses near the Tower of London
>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm](https://search.mapzen.com/v1/reverse?point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm)

* Only the first OpenStreetMap address near the Tower of London
>[/v1/reverse?api_key=mapzen-xxxxxx&point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm&size=1](https://search.mapzen.com/v1/reverse?point.lat=51.5081124&point.lon=-0.0759493&layers=address&sources=osm&size=1)
