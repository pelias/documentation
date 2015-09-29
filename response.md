# Search results

When requesting results from Mapzen Search, you will always get back `GeoJSON` results, unless something goes terribly wrong, in which case you'll get an error message.

  Tip: You can go to http://geojson.org/geojson-spec.html to learn more about the GeoJSON data format specification.

The top-level structure to every response looks like this:

```json
{
  "geocoding":{...},
  "type":"FeatureCollection",
  "features":[...],
  "bbox":[...]
}
```

##List of `features` returned

The `features` property of the result is where you will find the list of results that best matched your input parameters.

Each item in this list will contain all the information needed to identify it in human-readable format in the `properties` block, as well as computer friendly coordinates in the `geometry` property. Note the `label` property, which is a human-friendly representation of the place, ready to be displayed to an end-user.

```json
{  
  "type":"Feature",
  "properties":{  
    "gid":"...",
    "layer":"address",
    "source":"osm",
    "name":"30 West 26th Street",
    "housenumber":"30",
    "street":"West 26th Street",
    "postalcode":"10010",
    "country_a":"USA",
    "country":"United States",
    "region":"New York",
    "region_a":"NY",
    "county":"New York County",
    "localadmin":"Manhattan",
    "locality":"New York",
    "neighbourhood":"Flatiron District",
    "confidence":0.9624939994613662,
    "label":"30 West 26th Street, Manhattan, NY"
  },
  "geometry":{  
    "type":"Point",
    "coordinates":[  
      -73.990342,
      40.744243
    ]
  }
}
```

## Result count

By default, Mapzen Search results 10 places, unless otherwise specified. If you want a different number of results, set the `size` parameter to the desired number. This example shows returning only the first result.

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `size` | ***1*** |

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___size=1___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&size=1)

If you want 25 results, you can build the query where `size` is 25.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___size=25___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&size=25)
