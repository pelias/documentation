# Address search accuracy and results

Finding an address is one of the most common functions of a geocoder, but also one of the more complex because of analysis required on the constituent parts of the input text. The search integrates an address-parsing library, known as libpostal, to improve the results when you are looking for an address. In addition, interpolation improves search results when addresses exactly matching the query cannot be found.

## Accuracy in address results

When finding addresses, you can see an indication of the [confidence](response.md#confidence) of the result in the response. The `confidence` is a numerical value increasing from 0 to 1 that estimates how closely this result matches the query. In relation to an address search, if the input text looks like an address, but the house number of the result does not match the house number that was parsed from the input text, the confidence score is lower.

Properties that are related to confidence include `accuracy` and `match_type`. The `accuracy` is an indication of the geometry of the result, which can be either a `point` or a `centroid`. The `match_type` represents the kind of matching that happened for this address. An `exact` match means the search precisely found your entry, but `fallback` or `interpolated` means the result is not exact. The match type is only shown for queries that include an address.

Here is an example resulting from a search for the text, `30 W 26th street, New York, NY`:

```
"properties": {
  [...]
  "name": "30 West 26th Street",
  "housenumber": "30",
  "street": "West 26th Street",
  "postalcode": "10010",
  "confidence": 1,
  "match_type": "exact",
  "accuracy": "point",
  [...]
}
```

With an accuracy of point and an exact match, the confidence score is closer to 1. You also likely see higher scores with interpolated matches, but the confidence value decreases when centroid accuracy and a fallback match occurs. When that happens, multiple results may be returned so you can choose the one you intended.

## Address interpolation

When you search for an address and and there is not a precise match, the interpolation technique is applied if the street being queried has any address records at all. [OpenAddresses](data-sources.md#openaddresses) and [OpenStreetMap](data-sources.md#openstreetmap), which are the primary sources of addresses in the geocoder, provide locations for hundreds of millions of places globally. These sources, plus address range data from the [United States Census Bureau's TIGER product](https://www.census.gov/geo/maps-data/data/tiger.html), build a framework for the interpolation, or estimation, of address numbers in areas where there is incomplete data.

One form of address interpolation involves drawing a line that connects between the nearest known house numbers and placing the interpolated address within a range on that line. This process may work if the road is straight, but often results in the interpolated point being placed at a distance offset from the road network on curved sections.

To improve upon the straight line technique, the Pelias interpolation implementation considers the actual shape of the street when locating a point without a matching address. This results in more accurate location estimation because the interpolated addresses points are placed on the road itself, which also makes it easier for routing and turn-by-turn navigation services to calculate directions for that location.

If the address was derived using this technique, you see `interpolated` for the `match_type`.

```
},
"properties": {
  [...]
  "name": "207 Spear Street",
  "housenumber": "207",
  "street": "Spear Street",
  "confidence": 0.8,
  "match_type": "interpolated",
  "accuracy": "point",
  [...]
}
```

## Partial matches and fallbacks

In some scenarios, good matches cannot be found for what you enter, so fallback behavior occurs. Some examples where this occurs includes if a street is misspelled, the street name changes (such as `West Broadway` turns into `East Main Street`), or the street name does not exist in a city.

When this happens, the approach is to first try the most specific combination of analyzed fields, then fall back to coarser combinations until a result is returned. For example, if you enter a street address that is not in the city you specified, the house number and street are dropped, and the search attempts to match the city and state names only.  

The search currently supports only address points and not house number interpolation. This means that if a house number is not an address point in the data being searched, the behavior is to fall back to the street name. For example, `32 W 26th Street, New York, NY` is not an address point in the available data, but `W 26th Street, New York, NY` does exist. Therefore, only a street result is returned.

Sometimes the search input contains a street, city, and state but the street is either misspelled or does not exist in the city. For example, if you enter `Calle de Lago, New York, NY`, the `Calle de Lago` is identified as a street, but one that does not exist in New York City. When the street lookup fails, the city is returned.

If you enter a city that is not found in a particular state, the results will fall back to the state name you entered. Similar behavior happens for provinces and other administrative regions around the world.

## Poor address search results

If the search is unable to return any results based on the address, it functions more as a geographic search engine than a geocoder. When this happens, you may see fuzzy text-matching behavior. For example, the input `10 Main Street, United States of America` is parsed as a street and country but the search only supports `United States` and `USA`, so no results would be returned.  In this case, you may see results that match some of the inputs, including `10 Main Street, Fair Haven, VT, USA` and `10 Main Street, Swanland, England, United Kingdom`.  
