# Search an ID to get details on a place

When you know an identification number and the source it came from, you can use Mapzen Search to get details on the location.

To get started with a `/place` search, you need a [developer API key](https://mapzen.com/developers).

The `/place` endpoint accepts Mapzen Search `gid` strings that get returned for every record in all query responses.
These `gid` strings should not be built manually, but rather used directly as-is to lookup additional details on the location that `gid` refers to.

For example, this `/place` query looks up the Eiffel Tower in OpenStreetMap (OSM):

https://search.mapzen.com/v1/place?api_key=search-XXXXXXX&ids=openstreetmap:venue:way:5013364

## Search for multiple places in a query

To search for more than one `/place` in a request, join multiple values together and separate them with a comma. For example, this `/place` query looks up the Eiffel Tower in OpenStreetMap and the borough of Manhattan in Who's on First:

https://search.mapzen.com/v1/place?api_key=search-XXXXXXX&ids=openstreetmap:venue:way:5013364,whosonfirst:borough:421205771

The results are returned in the order requested.

If you enter a valid `gid` that cannot be found or has "expired" due to a newer build, you may get empty results. The request will NOT return an error.

If the structure of your `gid` is invalid, an error will be returned as part of the geojson structure.

Keep in mind that if you enter a `gid` that cannot be found in a list of multiple ids, then the `features` array in the response contains a different number of elements than the number of requests. For example, your request may have three IDs requested but only two results returned. The reason for this is that the `features` section of the response is GeoJSON-compliant, and JSON does not allow a way to convey an exception condition (not even an empty JSON element, `{}`). For this reason, if your application is dependent upon the results mapping directly to the individual input requests in order, then you'll have to do your own bookkeeping to handle exception conditions.

:warning: It is important to not use any `gid` values to attempt `/place` queries after longer than an hour. These ids are not intended to be stable across build, as we employ datasets that do not have consistent ids.
