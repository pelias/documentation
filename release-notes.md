# Mapzen Search API Release Notes 

## April 08, 2016

### Changes

* Switched from `Quattroshapes` to `WhosOnFirst` as the canonical source for administrative hierarchies and corresponding geometries.
* No longer importing `Quattroshapes` data since `WhosOnFirst` contains all those records and more. Going forward, any use of `quattroshapes` or `qs` in queries will resolve to `whosonfirst` or `wof` automatically.
* New `bbox` property has been added to individual results, for which geometry was available in the original source. This does not affect POI and address data.
* Drastic improvements have been made to the label generation logic.
* `id` and `gid` format has changed to make the ids more unique.
* New id format resolves previously outstanding bugs related to `geonames` ids being invalid for lookup via the `/place` endpoint.
* Addition place types have been introduced, such as `macroregion`, `macrocounty`, and `borough`.
* `gid` values have been added for each parent in the admin hierarchies of results.
