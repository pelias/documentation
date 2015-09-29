# Search an ID to get details on a place

When you know an identification number and the source it came from, you can use Mapzen Search to get details on the location.  

To get started with a place search, you need a [free, developer API key](https://mapzen.com/developers) and these three pieces of information:

* source - the data source, such as OpenStreetMap
* layer - the type of place, such as a venue, address, country.
* id - the identification number of the item

If you have all of those, join them together with semicolon and pass them in with the `ids` parameter.  

For example, this `/place` query looks up the Eiffel Tower in OSM:

https://search.mapzen.com/v1/place?api_key=search-XXXXXXX&ids=osm:venue:5013364

***From Rhonda -- looks like this returns a radio station in Michigan? Also need to redo the query to include production server and the reader's API key***

*** From Rhonda -- what are some examples of when you would use a /place search? When would you have this info and need to get the details? What would you do with it.***

## Search for multiple places in a query

To search for more than one `/place` in a request, join multiple values together and separate them with a comma. For example, this /place query looks up the Eiffel Tower in OSM and `30 West 26th St, New York, NY` in OpenAddresses:

https://search.mapzen.com/v1/place?api_key=search-XXXXXXX&ids=osm:country:5013364,oa:address:65cf57e4eb5548eca9bb548fb1461633

The results are returned in the order requested.  

***From Rhonda -- is there another example where you might do multiple requests at the same time...in other words, more related locations?***

Keep in mind that if you enter a `source:layer:id` combination that cannot be found, then the `features` array in the response contains a different number of elements than the number of requests. This will be most noticeable in requests with multiple IDs, as your request may have three IDs requested but only two results returned. The reason for this is that the `features` section of the response is GeoJSON-compliant and there is currently no way to convey an exception condition (not even an empty JSON element, `{}`). For this reason, if your application is dependent upon the results mapping directly to the individual input requests in order, then you'll have to do your own bookkeeping to handle exception conditions.  

## Valid combinations of place searches

Some combinations of `sources` and `layers` are valid while others are not. This table shows valid combinations.

source | layers
--- | ---
`osm` or `openstreetmap` | `venue`, `address`
`oa` or `openaddresses` | `address`
`gn` or `geonames` | `venue`, `address`, `neighbourhood`, `locality`, `county`, `region`, `country`, `coarse`
`qs` or `quattroshapes` | `neighbourhood`, `locality`, `county`, `region`, `country`, `coarse`
