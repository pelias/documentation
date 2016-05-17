# Search an ID to get details on a place

When you know an identification number and the source it came from, you can use Mapzen Search to get details on the location.

To get started with a `/place` search, you need a [developer API key](https://mapzen.com/developers).

The `/place` endpoint accepts Mapzen Search `gid` strings that get returned for every record in all query responses.
These `gid` strings should not be built manually, but rather used directly as-is to lookup additional details on the location that `gid` refers to.

For example, this `/place` query looks up the Eiffel Tower in OpenStreetMap (OSM):

https://search.mapzen.com/v1/place?api_key=search-XXXXXXX&ids=osm:venue:5013364

## Search for multiple places in a query

To search for more than one `/place` in a request, join multiple values together and separate them with a comma. For example, this /place query looks up the Eiffel Tower in OpenStreetMap and `30 West 26th St, New York, NY` in OpenAddresses:

https://search.mapzen.com/v1/place?api_key=search-XXXXXXX&ids=osm:venue:5013364,oa:address:65cf57e4eb5548eca9bb548fb1461633

The results are returned in the order requested.

One reason you'd want to do this is to exclude a particular dataset from being searched; you would include all the other data sources you do want to search.

Keep in mind that if you enter a `source:layer:id` combination that cannot be found, then the `features` array in the response contains a different number of elements than the number of requests. This will be most noticeable in requests with multiple IDs, as your request may have three IDs requested but only two results returned. The reason for this is that the `features` section of the response is GeoJSON-compliant, and JSON does not allow a way to convey an exception condition (not even an empty JSON element, `{}`). For this reason, if your application is dependent upon the results mapping directly to the individual input requests in order, then you'll have to do your own bookkeeping to handle exception conditions.

## Valid combinations of place searches

Some combinations of `sources` and `layers` can be used together while others cannot. This table shows valid combinations.

source | layers
--- | ---
`osm` or `openstreetmap` | `venue`, `address`
`oa` or `openaddresses` | `address`
`gn` or `geonames` | `venue`, `address`, `neighbourhood`, `locality`, `county`, `region`, `country`, `coarse`
