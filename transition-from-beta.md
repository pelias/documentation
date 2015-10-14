# Mapzen Search: Beta to V1 transition guide

First of all, thank you for being an early user of Mapzen Search/Pelias. You trusted the idea of a modern geocoding service built by and for the open mapping community and have helped make that happen.

This project is moving out of the beta stage and has an updated API designed to support the next several generations of progress to Pelias and Mapzen Search.

The changes aren't too drastic and should be implementable in an afternoon or a day at most for existing users.

These changes also affect self-hosted users of Pelias upgrading from the beta to 1.0 (leaving aside API key restrictions), but these users can make the upgrade on their own time.

## API keys
The first big change is the introduction of API keys. Like all other Mapzen APIs, Search now requires a free API key. You can register at the [Mapzen Developer Portal](https://mapzen.com/developers) and generate one (or more) for all your search needs.

Mapzen Search API keys allow you:

* 6 requests per second
* 30,000 requests per day

To start using an API key, append `&api_key=search-xxxxxx` to all API calls to all endpoints (aside from `/attribution`, which requires no key).

Your API usage limits are displayed in the HTTP headers of any API call, such as in this example:

```
X-ApiaxleProxy-Qpd-Left:4828
X-ApiaxleProxy-Qps-Left:4
```
## Changes to domain and URL structure
Mapzen Search is now hosted on the `search.mapzen.com` domain. The former domain, `pelias.mapzen.com` has been deprecated. To take advantage of the full v1 API, you must use the `search.mapzen.com` endpoint.

Additionally, all endpoints are now under the `/v1` namespace. For example, the full URI to the `/reverse` endpoint is now `https://search.mapzen.com/v1/reverse`.

Requests going to `pelias.mapzen.com` will continue to work until the end of November, 2015, at which point the servers handling pre-v1 requests will be disabled.


## Changes to response document
The response document is still plain, vanilla GeoJSON. Dots will still show up without a problem! Take a look at the [specification document](https://github.com/pelias/geocodejson-spec/blob/master/draft/README.md) or the [sample response](https://github.com/pelias/geocodejson-spec/blob/master/sample.geo.json?short_path=7cdb999) for further details.

### Metadata
The GeoJSON result object now contains a `geocoding` property that has lots of information about the request, such as how Mapzen Search parsed your query, certain explicit errors and warnings, and an attribution link.

### Features
The bulk of a valid response is still an array of `Feature` objects, ordered by result ranking (most relevant result first).

If the only property you used before was `text` for what to display, you'll have to change it to `label` and you'll be ready to process responses.

| Used to be (Beta) | Is now (V1) |       Notes     |
| ----------------- | ----------- | --------------- |
| `text` | `label` | The suggested display text. You can construct your own from the elements passed along, but this is Mapzen Search's best understanding of how to display it. |
| `layer` | `layer` & `source` | Some layers were not attributes, but sources the data was derived from. This has been split out into a separate field (see Search/Layers below for full explanation). |
| `admin0` | `country` | Now with Human Readable:tm: |
| `admin1` | `region` | States and provinces |
| `alpha3` | `country_a` | Three-character abbreviation for country |
| `admin1_abbr` | `region_a` | Region abbreviation (such as NY = New York, usually two characters) |
| `locality` | `locality` | No change|
| `neighborhood` | `neighbourhood` | Note change in spelling |
| `category` | Deprecated | This functionality is in progress and should be available soon. |
| `address:{}` | | Address elements are no longer grouped into their own object |
| `address:{zip}` | `postalcode` | |
| `address:{number}` | `housenumber` | |
| `address:{street}` | `street` | |


## Changes to `/search`
Most parameters (and options) for search have been renamed:

| Used to be (Beta) | New parameter (V1) | New behavior (if any) |
| ---------- | ------------- | --------------------- |
| `input` | `text` | |
| `lat` / `lon` | `focus.point.lat` / `focus.point.lon` | Biases search results toward places nearby, without excluding global matches |
| `zoom` | `focus.viewport.min_lon`, `focus.viewport.min_lat`, `focus.viewport.max_lon`, `focus.viewport.max_lat` | Passing along information about how far out an end-user is looking is now accomplished by passing along the end-user's viewport. Why judge just from a centerpoint and a zoom level when you can see what the user's seeing? |
| `size` | `count` | Number of responses. Minimum: 1, maximum: 50 |
| `layers` | `layers` (SEE BELOW) | While the parameter remains the same, the options have changed. See the table below for a description.|
| `bbox` | `boundary.rect.min_lon`, `boundary.rect.min_lat`, `boundary.rect.max_lon`, `boundary.rect.max_lat`| Bounding box parameters are now individually specified to prevent error.|
| `details` | Deprecated (for the moment) | `details=false` used to respond with a minimized set of elements. We are reevaluating which elements of the response document make most sense for minimization. If you've got opinions, let us know at [search@mapzen.com](mailto:search@mapzen.com)|

`layers` were previously opaque about many of the kinds of places they represented (particularly the administrative layers). `layers` were also used to retrieve places from a particular source. `sources` is now a separate parameter from `layers` to facilitate clarity.

| Beta           |           V1 |       Represents |
| -------------- | ------------ | ---------------- |
| `layers=geoname` | `sources=geonames` or `sources=gn` | [All manners of places](http://www.geonames.org/export/codes.html) from Geonames |
| `layers=osmnode` | `layers=venue,address&sources=openstreetmap` | Venues (points of interest) and all places with addresses from OpenStreetMap|
| `layers=osmway` | `layers=venue,address&sources=openstreetmap` | Streets and highways with addresses |
| `layers=admin0` | `layers=country` | Countries|
| `layers=admin1` | `layers=region` | Provinces and states (for the most part) |
| `layers=admin2` | `layers=county` | Things within states that often aren't cities, but sometimes are.|
| `layers=neighborhood` | `layers=neighbourhood` | Neighbourhoods (within localities, may be [macrohoods](http://whosonfirst.mapzen.com/spelunker/placetypes/macrohood/), neighbourhoods, or [microhoods](http://whosonfirst.mapzen.com/spelunker/placetypes/microhood/)) |
| `layers=locality` | `layers=locality` | |
| `layers=local_admin` | `layers=localadmin` | Local administrative areas (such as New York City, encompassing the five boroughs of NYC, which are themselves independent counties)|
| `layers=osmaddresses` | `layers=addresses&source=openstreetmap` | Addresses from OpenStreetMap|
| `layers=openaddresses` | `source=openaddresses` | Addresses from OpenAddresses |
| `layers=poi` | `layers=venue` | Places with walls |
| `layers=admin` | `layers=coarse` | Shortcut for coarse geocoding layers (see below) |
| `layers=address` | `layers=address` | |

So the new, valid `layers` values are:

* `venue`
* `address`
* `neighbourhood`
* `localadmin`
* `locality`
* `county`
* `region`
* `country`
* `coarse`

And the `sources` values are:

* `openstreetmap` or `osm`
* `geonames` or `gn`
* `openaddresses` or `oa`
* `quattroshapes` or `qs`


## Additions
| New | What's it do? |
| ------------ | ------------- |
| `sources` parameter | Pick the data source (separate from `layers`) |
| `boundary.circle` | Bounding circle. Like a bounding box, but circular. Takes, `boundary.circle.lon`, `boundary.circle.lat`, and `boundary.circle.radius` (in kilometers) |
| `boundary.country` | Search only within a particular country. Takes Alpha-2 or Alpha-3 country code abbreviations.|

## Coarse search
Coarse search (looking for countries, regions, counties, localities, neighbourhoods), was previously available on `/search/coarse`. This is now handled as a layer on search.

A former query for a coarse geocode may have been:
`https://pelias.mapzen.com/search/coarse?input=<search-text>`

That same query would now be written as:
`https://search.mapzen.com/v1/search?text=<search-text>&layers=coarse&api_key=<search-xxxxxx>`

You can also call the coarse layers directly, namely, `country`, `region`, `county`, `locality`, `neighbourhood`, to restrict the kinds of results you'll get back.

Feel free to mix and match these layers with `boundary` parameters, particularly `boundary.country` if you want to restrict your results to a particular country.

## `/autocomplete` (formerly `/suggest`)
The `/autocomplete` endpoint serves as a renamed `/suggest` to indicate that these are not recommendations. It is subject to many of the same changes as `/search`:

| Used to be (Beta) | New parameter (V1) | New behavior (if any) |
| ---------- | ------------- | --------------------- |
| `input` | `text` | Required |
| `lat` / `lon` | `focus.point.lat` / `focus.point.lon` | Biases search results toward places nearby, without excluding global matches. No longer required for `/autocomplete` |
| `size` | Deprecated | Responds with 10 results every time |
| `zoom` | Deprecated |  |
| `layers` | Deprecated | |
| `bbox` | Deprecated | |
| `details` | Deprecated  | |

### Deprecated endpoints

- `/suggest/coarse`
- `/suggest/nearby`

## `/reverse`
Reverse geocoding finds the places closest to geospatial coordinates.

```
https://search.mapzen.com/v1/reverse?point.lon={longitude}&point.lat={latitude}&api_key=search-xxxxxx
```

Used to be (Beta) | New parameter (V1) | New behavior (if any) |
| ---------- | ------------- | --------------------- |
| `lat` / `lon` | `point.lon` / `point.lat` | Required |
| `layers` | `layers` | same set of layers as for `/search` |

New parameters:
- `boundary.circle` - use `boundary.circle.radius` to set the distance for a reverse point search in kilometers
- `boundary.country` - Restricts reverse geocodes to a particular country based on alpha2 or alpha3 country codes

### Reverse coarse geocoding
Reverse coarse geocoding is not a point-in-polygon lookup (finding the hierarchy for the polygon that the point falls in), but instead looks for the hierarchy of points nearby. To use reverse coarse geocoding, use:

```https://search.mapzen.com/v1/reverse?point.lon={longitude}&point.lat={latitude}&layers=coarse&api_key=search-xxxxxx
```

## `/place` (formerly `/doc`)
`/place` is used to retrieve the underlying place record behind a particular result.

If a search returns `id: "geonames:3544:adm1:fr:fra:paris"` as the matching ID for a record, the complete underlying place record can be returned with:
```
https://search.mapzen.com/v1/place?ids=geonames:3544:adm1:fr:fra:paris&api_key=search-xxxxxx
```

## Security

### In-browser cross-site scripting
If you were using Pelias from within a browser with client-side JavaScript (using Pelias on a domain that is different mapzen.com), you should know that Mapzen Search does not support JSONP requests to get around cross-site scripting limitations.

Instead, Mapzen Search supports [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) (CORS), which enables secure cross-site data transfers.

Mapzen Search is set to allow CORS requests from all domains.

### HTTPS
Mapzen Search continues to support HTTPS and traditional HTTP. We encourage you to use HTTPS in lieu of HTTP, especially when handling sensitive personal information (such as users' searches or users' location data).

## What's happening to pelias.mapzen.com?
The beta API available at pelias.mapzen.com will be available through the end of November, 2015. Starting December 1, 2015, you will only be able to use search.mapzen.com or your own hosted version of Pelias.

## Where to send comments and issues
Let us know.

Words go to: [search@mapzen.com](mailto:search@mapzen.com)

Issues go to [GitHub](https://github.com/pelias/pelias-doc/issues)
