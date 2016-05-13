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

``` json
{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.125422,
          51.501581
        ]
      },
      "properties": {
        "id": "101750367",
        "gid": "whosonfirst:locality:101750367",
        "layer": "locality",
        "source": "whosonfirst",
        "name": "London",
        "confidence": 0.949,
        "country": "United Kingdom",
        "country_gid": "whosonfirst:country:85633159",
        "country_a": "GBR",
        "macroregion": "England",
        "macroregion_gid": "whosonfirst:macroregion:404227469",
        "region": "City of Westminster",
        "region_gid": "whosonfirst:region:85684061",
        "locality": "London",
        "locality_gid": "whosonfirst:locality:101750367",
        "label": "London, England, United Kingdom"
      },
      "bbox": [
        -0.4984345,
        51.297207,
        0.27894,
        51.6843015
      ]
    },
```

Additionally, `/reverse` queries will have a `distance` parameter, which is the distance, in meters, from the query point.

## Notable elements

### `gid`
All places in Mapzen Search have a global identifier, known as a `gid`. Each matching record returned from a [`/search`](search), [`/autocomplete`](autocomplete), or [`/reverse`](reverse) geocoding request has a `gid` field.

The `gid` consists of a `layer` (such as `address` or `country`), an identifier for the original data source (`openstreetmap` or `openaddresses`),  and an `id` for the individual record corresponding to the original source idenfier, where possible. This information is also available as properties on the individual results as `layer`, `source`, and `source_id`.

#### :warning: Follow these guidelines regarding the `gid`:

- You should not create your own `gid` strings.
- `gid` values may not be consistent across releases.
- You should not attempt to parse `gid` strings for information or store them for future use. You should only use `gid` at the time when you receive the search results. One valid use for the `gid` is to retrieve full details on a particular result from the `/place` endpoint.

### `label`
The `label` is a human-friendly representation of the place, ready to be displayed to an end user.  The label field attempts to use a format that is right for the region the result is in, although Mapzen Search only supports a few countries at the moment.

### `confidence`
The confidence score is an estimation of how accurately this result matches the query.

For the `/reverse` endpoint, the confidence score is determined solely by its distance from the coordinate specified. Closer results get a higher score.

For the `/search` endpoint, it primarily takes into account how well properties in the result match what was expected from parsing the input text. For example, if the input text looks like an address, but the house number of the result doesn't match the house number that was parsed from the input text, the confidence score will be lower.

Additionally, the confidence score can optionally be biased along with other results, like test scores in a classroom might be graded on a curve. This takes into account both the property matches described above and the distance between results. This relative scoring is enabled on Mapzen Search, but can be turned off when hosting your own Pelias instance.

### `bbox`
`Feature`s coming from _Who's on First_ and OpenStreetMap ways will often have their own `"bbox"` elements. This `"bbox"` is at the same level as `"properties"`. If present, it describes the geographic extent of the feature (e.g. the screen size necessary to show all of California without needing to send the precise polygon geometry). This should be treated as separate from the `bbox` that describes the entire `FeatureCollection`.

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
