# Determining Result Quality

Each result returned from Pelias contains several different properties to help you programmatically determine if a result is good enough for your purposes.


### match\_type

This field is present on queries to the [search](search.md) and [structured search](structured-geocoding.md) endpoints only.

There are three possible values: `exact`, `interpolated`, and `fallback`;

If Pelias found exactly what it believes you were looking for, the `match_type` value will be `exact`.

If Pelias determined you are querying for a street address, and could not find that exact address, but was able to estimate where that address might be (if it exists) via the [interpolation engine](https://github.com/pelias/interpolation/), the match type will be `interpolated`.

If Pelias wasn't able to return exactly what it thinks you asked for, it will try to return something that relates to your query in an intelligent way. These fallback results will be records that follow the relationships of places in the real world.

#### Some examples:

A query for [1600 Pennsylvania Avenue, Seattle, Washington](/v1/search?text=1600 Pennsylvania Avenue, Seattle, WA) returns the city of Seattle, since there is no Pennsylvania Avenue in Seattle. In previous versions of Pelias, this query would return 1600 Pennsylvania Avenue addresses in other parts of the world (such as the famous White House address in Washington, D.C.).

A query for [France](http://pelias.github.io/compare/#/v1/search%3Ftext=France) will return one result, with `match_type` `exact`. However, a query for the non-existent city of [Berlin, France](http://pelias.github.io/compare/#/v1/search%3Ftext=France) will also return France, but in this case with a match type of `fallback`. Pelias knows you were looking for something in the country of France called Berlin. It couldn't find it, so instead of returning one of the many [other Berlins](http://pelias.github.io/compare/#/v1/search%3Ftext=berlin), it returns France. This demonstrates that the `match_type` value depends on the query _and_ the result.

### confidence
This is a general score computed to calculate how likely result is what was asked for. It's meant to be a combination of all the information available to Pelias.
It's not super sophisticated, and results may not be sorted in confidence-score order. In that case results returned first should be trusted more. Confidence scores are floating point numbers ranging from `0.0` to `1.0`.

Confidence scores are calculated differently for different endpoints:

For **reverse geocoding** it's based on distance from the reverse geocoded point. The progression of confidence scores is as follows:

| distance | confidence score |
| --- | --- |
| < 1 meter | 1.0 |
| 1 - 10 meters | 0.9 |
| 11 - 100 meters | 0.8 |
| 101 - 250 meters | 0.7 |
| 251 - 1000 meters | 0.6 |

For **forward geocoding and autocomplete**, several factors affect the score. These factors are:

* the `match_type`, as described above
* whether the postal code matched (postal codes must be an optional part of all Pelias queries since not all records have known postal codes)
* for address results, whether the housenumber and street name match the input query
* whether any other fields are obviously non-matching (such as the city, region, or country fields).

In all cases, confidence scores for `fallback` results will be reduced.

### layer
This is essentially what type of result was returned, for example whether the result was an address, a city, or a country (a [full list](https://github.com/pelias/documentation/blob/master/search.md#filter-by-data-type) of possible layers can be found in the search endpoint documentation).

The `layers` parameter can be used to filter out undesired results if you know ahead of time what you want.

Results that have a `layer` value that you did not expect generally represent a fallback scenario, and should be checked carefully.

### accuracy

The accuracy field gives information on the accuracy of the latitude/longitude point returned with the given result. This value is a property of the result itself and won't change based on the query. There are currently two possible values for the `accuracy` field: `point` and `centroid`.

`point` results are generally addresses, venues, or interpolated addresses. A point result means the record represents a record that can reasonably be represented by a single latitude/longitude point.

`centroid` results, on the other hand, are records that represent a larger area, such as a city or country. Pelias cannot currently return results with geometries made of polygons or lines, so all such records are estimated with a centroid.

In the future, Pelias will [likely add support for proper complex geometries](https://github.com/pelias/whosonfirst/issues/19).
