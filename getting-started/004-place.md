# Search for places

Place search is for when you have an ID and the source it came from and now you just need the details.  

Once you have [an API key](https://mapzen.com/developers), continue on.

## The Basics

A place search requires 3 pieces of information:

1. source
2. layer
3. id

Once you have all 3 of those, simply join them together with semicolon and pass in on the ids parameter.  

For example, this /place query looks up the Eiffel Tower in OSM:

http://pelias.bigdev.mapzen.com/v1/place?api_key=pelias-M7dcnto&ids=osm:venue:5013364

## Advanced Usage

To request more than 1 /place lookup in one request, simply join multiple values together delimited by comma.  
For example, this /place query looks up the Eiffel Tower in OSM and `30 West 26th St, New York, NY` in OpenAddresses:

http://pelias.bigdev.mapzen.com/v1/place?api_key=pelias-M7dcnto&ids=osm:country:5013364,oa:address:65cf57e4eb5548eca9bb548fb1461633

The results are returned in the order requested.  

## Caveats

If you enter a `source:layer:id` combination that cannot be found then the `features` array in the response will continue a different number of elements than the number of requests.  This will be most noticeable in multi-id requests since your request may have 3 ids requested but only 2 results returned.  The reason for this is that the `features` section of the response is GeoJSON-compliant and there is currently no way to convey an exception condition (not even an empty JSON element, `{}`).  For this reason, if your application is dependent upon the results mapping directly to the individual input requests in order, then you'll have to do your own bookkeeping to handle with exception conditions.  

## Valid combinations

Some combinations of `sources` and `layers` are valid while others aren't.  Please use the following table for reference:

source | layers
--- | ---
`osm` or `openstreetmap` | `venue`, `address`
`oa` or `openaddresses` | `address`
`gn` or `geonames` | `venue`, `address`, `neighbourhood`, `locality`, `county`, `region`, `country`, `coarse`
`qs` or `quattroshapes` | `neighbourhood`, `locality`, `county`, `region`, `country`, `coarse`
