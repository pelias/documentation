# Search with autocomplete

If you are building an end-user application, you can use the `/autocomplete` endpoint alongside `/search` to enable real-time feedback. This type-ahead functionality helps users find what they are looking for, without requiring them to fully specify their search term. Typically, the user starts typing and a drop-down list appears where they can choose the term from the list below.

To build a query with autocomplete, you need an [API key](https://mapzen.com/developers) and a `text` parameter, representing what a user has typed into your application so far. Optionally, you can specify a geographic point where the search is focused, this will allow users to see more local places in the results.

## User experience guidelines

There are two user experience pitfalls to watch out for when implementing a client-side typeahead solution:

**Requests must be throttled.** The client must only send a maximum of one or two requests per second. Sending requests more often than this will result in a sluggish network and laggy user interface for mobile consumers. A general rule is to account for fast typers by batching their keystrokes and sending the input text no more than twice per second. Mapzen Search limits the amount of requests per second (per API key), so be sure to account for those limits in your throttle code. [Learn more in this interactive demo.](http://jsfiddle.net/missinglink/19e2r2we/)

**Responses are asynchronous.** This means you cannot be sure responses will be returned in the same order they were requested. If you were to send two queries synchronously, first `'Lo'` then `'London'`, you may find the `'London'` response would arrive before the `'Lo'` response. This will result in a quick flash of `'London'` results followed by the results for `'Lo'`, which can confuse the user. You must account for this behavior by storing the `requested_at` timestamps for each request and discarding older responses when they arrive late.

## Global scope, local focus

To focus your search based upon a geographical area, such as the center of the user's map or at the device's GPS location, supply the parameters `focus.point.lat` and `focus.point.lon`. This boosts locally relevant results higher. For example, if you search for `Union Square`:

From San Francisco:

> /v1/autocomplete?api_key=search-XXXXXXX&focus.point.lat=37.7&focus.point.lon=-122.4&text=union square

```
1)	Union Square, San Francisco County, CA
2)	Union Square, New York County, NY
```

From New York City:

> /v1/autocomplete?api_key=search-XXXXXXX&focus.point.lat=40.7&focus.point.lon=-73.9&text=union square

```
1)	Union Square, New York County, NY
2)	Union Square, San Francisco County, CA
```

The `/autocomplete` endpoint can promote nearby results to the top of the list, while still allowing important matches from farther away to be visible. For example, searching `hard rock cafe` with a focus on Berlin:

> /v1/autocomplete?api_key=search-XXXXXXX&focus.point.lat=52.5&focus.point.lon=13.3&text=hard rock cafe

with `focus.point` you will find the Berlin restaurant first:
```
1)	Hard Rock Cafe Berlin, Berlin, Germany
2)	Hard Rock Café, San Giljan, Malta
```

without `focus.point` you will find the most popular restaurants first:
```
1)	Hard Rock Cafe, Pune, Maharashtra
2)	Hard Rock Café, San Giljan, Malta
```

## Filters

You can filter the results in several ways: the original data source and/or the type of record. 

### Sources

The `sources` parameter allows you to specify from which data sources you'd like to receive results. The sources are as follows

* `openstreetmap` or `osm`
* `openaddresses` or `oa`
* `geonames` or `gn`
* `whosonfirst` or `wof`

> /v1/autocomplete?api_key=search-XXXXXXX&sources=openaddresses&text=pennsylvania

with `sources=openaddresses` you will only find addresses on Pennsylvania Ave or Street:
```
1) 8 R Pennsylvania Avenue, Amity, PA, USA
2) 7 Pennsylvania Avenue, Amity, PA, USA
3) 9 Pennsylvania Avenue, Cherry, PA, USA
```

without `sources=openaddresses` you will find the most popular Pennsylvanias first:
```
1) Pennsylvania, USA
2) Pennsylvania Avenue Heights, Washington, DC, USA
3) Pennsylvania, Satsuma, AL, USA
```

### Layers
We refer to the type of record as its `layer`. We index all records into the following layers

* `venue`
* `address`
* `microhood`
* `neighbourhood`
* `macrohood`
* `county`
* `macrocounty`
* `localadmin`
* `locality`
* `borough`
* `region`
* `country`

We also allow users to refer to all the administrative hierarchy layers with a single alias, `coarse`.

> /v1/autocomplete?api_key=search-XXXXXXX&layers=coarse&text=starbuck

with `layers=coarse` you will see only administrative areas with names containing Starbuck

```
1) Starbuckville, NY, USA
2) Starbuck, MN, USA
3) Starbuck, WA, USA
```

with `layers=venue` you will see only the venues by that name

```
1) Starbucks, Braunschweig, Germany
2) Starbucks, Islip, NY, USA
3) Starbucks, Austin, TX, USA
```

## Available autocomplete parameters

| Parameter | Type | Required | Default | Example |
| --- | --- | --- | --- | --- |
| `api_key` | string | yes | none | [get yours here](https://mapzen.com/developers) |
| `text` | string | yes | none | `Union Square` |
| `focus.point.lat` | floating point number | no | none | `48.581755` |
| `focus.point.lon` | floating point number | no | none | `7.745843` |
| `sources` | string | no | all sources: osm,oa,gn,wof | openstreetmap,wof |
| `layers` | string | no | all layers: address,venue,neighbourhood,locality,borough,localadmin,county,macrocounty,region,marcoregion,country,coarse | address,venue |
