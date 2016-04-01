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

Each item in this list will contain all the information needed to find it in human-readable format in the `properties` block, as well as computer friendly coordinates in the `geometry` property.

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -73.990425,
      40.744131
    ]
  },
  "properties": {
    "id": "way:265038872",
    "gid": "openstreetmap:address:way:265038872",
    "layer": "address",
    "source": "openstreetmap",
    "name": "30 West 26th Street",
    "housenumber": "30",
    "street": "West 26th Street",
    "postalcode": "10010",
    "confidence": 0.875,
    "country": "United States",
    "country_id": "85633793",
    "country_a": "USA",
    "region": "New York",
    "region_id": "85688543",
    "region_a": "NY",
    "county": "New York County",
    "county_id": "102081863",
    "localadmin": "Manhattan",
    "localadmin_id": "404522731",
    "locality": "New York",
    "locality_id": "85977539",
    "neighbourhood": "Flatiron District",
    "neighbourhood_id": "85869245",
    "label": "30 West 26th Street, Manhattan, NY, USA"
  }
```

Additionally, `/reverse` queries will have a `distance` parameter, which is the distance, in meters, from the query point.

## Notable features

### `gid`
This is a "global id" that can be used to reference a result with the [/place](place.md) endpoint. It consists of an identifier for the dataset, a layer, and finally an `id` for the individual record. This `id` corresponds to stable ids from datasets wherever possible (such as the ID of an OpenStreetMap Node or Way). Not all datasets have stable ID's (in particular OpenAddresses records), so for OpenAddresses, Mapzen Search includes the name of the source dataset in OpenAddresses as a part of the ID scheme.

The `gid` is also used to retrieve full details on a particular result from the `place` endpoint. [Full details](place.md) on ID schemes are part of the `/place` endpoint.

### `label`
The `label` is a human-friendly representation of the place, ready to be displayed to an end user.  The label field attempts to use a format that is right for the region the result is in, although Mapzen Search only supports a few countries at the moment.

### `confidence`
The confidence score is an estimation of how accurately this result matches the query.

For the `/reverse` endpoint, the confidence score is determined solely by its distance from the coordinate specified. Closer results get a higher score.

For the `/search` endpoint, it primarily takes into account how well properties in the result match what was expected from parsing the input text. For example, if the input text looks like an address, but the house number of the result doesn't match the house number that was parsed from the input text, the confidence score will be lower.

Additionally, the confidence score can optionally be biased along with other results, like test scores in a classroom might be graded on a curve. This takes into account both the property matches described above and the distance between results. This relative scoring is enabled on Mapzen Search, but can be turned off when hosting your own Pelias instance.

## Result count

By default, Mapzen Search results 10 places, unless otherwise specified. If you want a different number of results, set the `size` parameter to the desired number. This example shows returning only the first result.

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `size` | 1 |

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___size=1___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&size=1)

If you want 25 results, you can build the query where `size` is 25.

> [/v1/search?api_key=search-XXXXXXX&text=YMCA&___size=25___](https://search.mapzen.com/v1/search?api_key=search-XXXXXXX&text=YMCA&size=25)
