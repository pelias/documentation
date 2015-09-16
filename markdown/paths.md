## Paths
### Fast response endpoint to provide an end-user suggestions of matching places as they're typing the search string. Returns 10 matching places. Intended for use while the user is typing a response. For searching a complete query (if autocomplete doesn't deliver a match), use the /search endpoint.
```
GET /autocomplete
```

#### Parameters
|Type|Name|Description|Required|Schema|Default|
|----|----|----|----|----|----|
|QueryParameter|text|User's search string|true|string (string)||
|QueryParameter|focus.point.lon|Focal point longitude. Ideally a user's device location, but can also be a focal point (like the center of their view). Used to provide results close to the user, while still finding good matches globally. Used in conjunction with `focus.point.lat`. Accepts only WGS84 longitutdes.|false|number (float)||
|QueryParameter|focus.point.lat|Focal point latitude. Used to provide results close to the user, while still finding good matches globally. Used in conjunction with `focus.point.lon`. Accepts only WGS84 latitudes.|false|number (float)||


#### Responses
|HTTP Code|Description|Schema|
|----|----|----|
|200|A GeoJSON FeatureCollection array of geocoded places.|No Content|
|400|Invalid request. Check that you are passing along valid parameters without conflicting options.|No Content|


#### Tags

* search
* forward geocoding

### Retrieves the full GeoJSON record for a given place. ID determined from the results of a `/search`, `/autocomplete`, or `/reverse` response.
```
GET /place
```

#### Parameters
|Type|Name|Description|Required|Schema|Default|
|----|----|----|----|----|----|
|QueryParameter|ids|Place ID from Mapzen Search.|false|string (string)||


#### Responses
|HTTP Code|Description|Schema|
|----|----|----|
|200|ok|No Content|


### Searches for the name of a place based on a lon/lat location. Used for address reverse geocoding, point of interest (POI) reverse geocoding, and reverse coarse geocoding.
```
GET /reverse
```

#### Parameters
|Type|Name|Description|Required|Schema|Default|
|----|----|----|----|----|----|
|QueryParameter|point.lon|tk|true|number (float)||
|QueryParameter|point.lat|tk|true|number (float)||
|QueryParameter|boundary.circle.lon|tk|true|number (float)||
|QueryParameter|boundary.circle.lat||false|number (float)||
|QueryParameter|boundary.circle.radius|bounding circle radius (in KM).|false|number (float)||
|QueryParameter|boundary.country|Limits search to only return matches within a specific country. Accepts 2 or 3 letter country codes based on ISO [Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Current_codes) or [Alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Current_codes) abbreviations.|false|string (string)||
|QueryParameter|layers|tk|false|string||
|QueryParameter|sources|tk|false|string||
|QueryParameter|size||false|integer (int32)|10|


#### Responses
|HTTP Code|Description|Schema|
|----|----|----|
|200|GeoJSON FeatureCollection|No Content|


### Geocodes a user's search query
```
GET /search
```

#### Parameters
|Type|Name|Description|Required|Schema|Default|
|----|----|----|----|----|----|
|QueryParameter|text|User's search string|true|string (string)||
|QueryParameter|focus.point.lon|Focal point longitude. Ideally a user's device location, but can also be a focal point. Used to provide results close to the user, while still finding good matches globally. Used in conjunction with `focus.point.lat`. Accepts only WGS84 longitutdes.|false|number (float)||
|QueryParameter|focus.point.lat|Focal point latitude. Used to provide results close to the user, while still finding good matches globally. Used in conjunction with `focus.point.lon`. Accepts only WGS84 latitudes.|false|number (float)||
|QueryParameter|focus.viewport.min_lon|`focus.viewport` provides focus to user's viewable map area, using the viewable screen to calibrate results relevant for an end-user's area of interest based on what's on screen, where that is located, and the level of zoom.

This parameter limits the user's viewport latitude (furthest bottom coordinate). Used to provide results close to the user, while still finding good matches globally. Used in conjunction with `focus.viewport.min_lat`, `focus.viewport.min_lon`, `focus.viewport.max_lon`, and `focus.viewport.max_lat`.

Accepts only WGS84 longitudes.
|false|number (float)||
|QueryParameter|focus.viewport.min_lat|This parameter limits the user's viewport longitude (furthest left coordinate). Used to provide results close to the user, while still finding good matches globally. Used in conjunction with `focus.viewport.min_lat`, `focus.viewport.min_lon`, `focus.viewport.max_lon`, and `focus.viewport.max_lat`.
Accepts only WGS84 latitudes.
|false|number (float)||
|QueryParameter|focus.viewport.max_lon|This parameter limits the user's viewport latitude (furthest right coordinate). Used to provide results close to the user, while still finding good matches globally. Used in conjunction with `focus.viewport.min_lat`, `focus.viewport.min_lon`, `focus.viewport.max_lon`, and `focus.viewport.max_lat`.

Accepts only WGS84 longitudes.
|false|number (float)||
|QueryParameter|focus.viewport.max_lat|This parameter limits the user's viewport longitude (furthest top coordinate). Used to provide results close to the user, while still finding good matches globally. Used in conjunction with `focus.viewport.min_lat`, `focus.viewport.min_lon`, `focus.viewport.max_lon`, and `focus.viewport.max_lat`.
Accepts only WGS84 latitudes.
|false|number (float)||
|QueryParameter|layers|For more than one layer, accepts a comma separated list of valid layers. If any of those layers is invalid, the request will still be honored, but a warning will be noted in the `geocoding` block of the response.
|false|string (string)||
|QueryParameter|sources|tk|false|string||
|QueryParameter|boundary.circle.lon|tk|false|number (float)||
|QueryParameter|boundary.circle.lat|tk|false|number (float)||
|QueryParameter|boundary.circle.radius|Maximum distance in meters from the centroid to search from. Forms the radius of a bounding circle.|false|number (float)||
|QueryParameter|boundary.rect.min_lon||false|number (float)||
|QueryParameter|boundary.rect.min_lat||false|number (float)||
|QueryParameter|boundary.rect.max_lon||false|number (float)||
|QueryParameter|boundary.rect.max_lat||false|number (float)||
|QueryParameter|boundary.country|Limits search to only return matches within a specific country. Accepts 2 or 3 letter country codes based on ISO [Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Current_codes) or [Alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Current_codes) abbreviations.
|false|string (string)||
|QueryParameter|size|Maximum number of possible matching places to be returned|false|integer (int32)|10|
|QueryParameter|private|Option to disable query logging in Mapzen Search. Defaults to False.|false|boolean|false|


#### Responses
|HTTP Code|Description|Schema|
|----|----|----|
|200|a GeoJSON FeatureCollection array of geocoded places|No Content|
|400|invalid request. Check that you are passing along valid parameters|No Content|
|403|invalid API key. Register for a valid API key at the [Mapzen Developer Portal](https://mapzen.com/developer).|No Content|


#### Tags

* forward geocoding
* search

