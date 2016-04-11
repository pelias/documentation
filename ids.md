# IDs in Mapzen Search

Depending on how you use the service, system identifiers can play play a big part in how you use Mapzen Search / Pelias. All places in Mapzen Search have a _global identifier_, known as a `gid`. Each matching record returned from a [`/search`](search), [`/autocomplete`](autocomplete), or [`/reverse`](reverse) geocoding request will have a `gid` field that corresponds to that place's information in the system.

Identifiers in Mapzen Search may change from week-to-week. They should not be considered stable, unless otherwise noted in the sources section below. Because of the nature of some of the data sources we work with, IDs may change without notice at any given time.

A record's `gid`'s in Mapzen Search looks like:
`"gid": "whosonfirst:locality:101750367",`


## Rules for using `gid`'s

**1. Do not use Mapzen Search `gid`'s as permanent identifiers for places.**

`gid`'s in Mapzen Search can change because several of our data sources also lack permanent IDs. Some of our sources do not provide ways to track [...].


**2. The structure of identifiers in Mapzen Search may change.**


## Source-specific `gid` structures

<table>
<th> <td>Source</td> <td>Examples</td> <td>Structure</td> <td>Notes</td> </th>
  <tr>
    <td> <em>Who's on First</em></td>
    <td>
      <ul><li>`whosonfirst:locality:101750367`</li><li>`whosonfirst:country:85633793`</li></ul>
    </td>


  </tr>
</table>


| Source | Examples | Structure | Notes |
| ------ | --------- | ----------- | -------- |
| _Who's on First_ | <ul><li>`whosonfirst:locality:101750367`</li><li>`whosonfirst:country:85633793`</li></ul> | whosonfirst


### _Who's on First_ | `whosonfirst`

`"gid": "whosonfirst:locality:101750367"`

A Who's on First identifier consists of 3 elements, it's source (`whosonfirst`), its [placetype](https://github.com/whosonfirst/whosonfirst-placetypes), and the number that is its [unique 64-bit numeric ID](https://github.com/whosonfirst/whosonfirst-data/#portability).

[Placetypes](https://github.com/whosonfirst/whosonfirst-placetypes) are consistent between Mapzen Search and Who's on First.

The numeric identifier at the end of a Who's on First `gid` _may be considered a stable identifier_ for the corresponding Who's on First record, and is likely to be used as an identifier for other systems using Who's on First. However, Mapzen Search requires that a record's type be known before the record may be retrieved from `/place`.

> ✅ Valid: [`/v1/place?ids=whosonfirst:country:85633793`](http://pelias.github.io/compare/#/v1/place%3Fids=whosonfirst:country:85633793)

> ❌ Invalid (missing placetype): [`/v1/place?ids=whosonfirst:85633793`](http://pelias.github.io/compare/#/v1/place%3Fids=whosonfirst:85633793)

### OpenStreetMap | `openstreetmap`

Results coming from OpenStreetMap take the form of:

### OpenAddresses | `openaddresses`

### Geonames | `geonames`




## How we use `gid`'s in Mapzen Search

### Why does each record have multiple multiple fields with `gid`?

### Why does each record have an `id` field in addition to `gid`?
