# Search with autocomplete

If you are building an end-user application, you can use the `/autocomplete` endpoint alongside `/search` to enable real-time feedback. This typeahead functionality helps users find what they are looking for more easily, without requiring them to fully specify their search term. Typically, the user starts typing and a drop-down list appears where they can choose the term from the list.

To get started with autocomplete, you need only a developer key and a `text` parameter, representing what a user has typed into your application so far. Optionally, you can specify a geographic point where the search is focused, this will allow users to see more local places in the results.

# User experience guidelines

There are two user experience pitfalls to watch out for when implementing a client-side typeahead solution:

**Requests must be throttled**, the client must only send a maximum of one or two requests per second. Sending requests more frequently than this will result in a sluggish network and laggy user interface for mobile consumers. A general rule of thumb is to account for fast typers by batching their keystrokes and sending the input text no more than twice per second. Mapzen Search limits the amount of requests per second (per api key), so be sure to account for those limits in your throttle code. [interactive demo](http://jsfiddle.net/missinglink/19e2r2we/)

**Responses are asynchronous**, there is no guarantee that they will be returned in the same order they were requested. If you were to send two queries synchronously, first `'Lo'` then `'London'`, you may find the `'London'` response would arrive before the `'Lo'` response. This will result in a quick flash of `'London'` results followed by the results for `'L'` which can be confuse the user. You must account for this behaviour by storing the `requested_at` timestamps for each request and discarding older results.

# Global scope, local focus

To focus your search based upon a geographical area, such as the center of the user's map or at the device GPS location, supply the parameters `focus.point.lat` and `focus.point.lon`. This boosts locally relevant results higher, for example we can search for `Union Square`:

From San Francisco: https://search.mapzen.com/v1/autocomplete?api_key=pelias-xxxxxx&text=union%20square&focus.point.lat=37.7&focus.point.lon=-122.4

```javascript
{
  "type": "Feature",
  "properties": {
    "id": "6462006",
    "gid": "gn:venue:6462006",
    "layer": "venue",
    "source": "gn",
    "name": "Union Square",
    "country_a": "USA",
    "country": "United States",
    "region": "California",
    "region_a": "CA",
    "county": "San Francisco County",
    "locality": "San Francisco",
    "neighbourhood": "NOMA",
    "confidence": 0.736,
    "distance": 9.543,
    "label": "Union Square, San Francisco, CA"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      -122.40776,
      37.78576
    ]
  }
}
```

From New York City: https://search.mapzen.com/v1/autocomplete?api_key=pelias-xxxxxx&text=union%20square&focus.point.lat=40.7&focus.point.lon=-73.9

```javascript
{
  "type": "Feature",
  "properties": {
    "id": "8436470",
    "gid": "gn:neighbourhood:8436470",
    "layer": "neighbourhood",
    "source": "gn",
    "name": "Union Square",
    "country_a": "USA",
    "country": "United States",
    "region": "New York",
    "region_a": "NY",
    "county": "New York County",
    "localadmin": "Manhattan",
    "locality": "New York",
    "confidence": 0.943,
    "distance": 8.624,
    "label": "Union Square, Manhattan, NY"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      -73.99027,
      40.73624
    ]
  }
}
```
### Parameters

Parameter | Type | Required | Default | Example
--- | --- | --- | --- | ---
`api_key` | string | yes | none | [get yours here!](https://mapzen.com/developers)
`text` | string | yes | none | `Union Square`
`focus.point.lat` | floating point number | no | none | `48.581755`
`focus.point.lon` | floating point number | no | none | `7.745843`
