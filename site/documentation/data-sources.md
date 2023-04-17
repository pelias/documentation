# Data sources with supported importers

Pelias is built with a mostly data-agnostic architecture: any datasource that can be converted into the Elasticsearch document format used by Pelias can be imported and geocoded against. Of course, building a good importer takes time. Pelias currently has official support for five importers from four different open data projects. We owe a tremendous debt of gratitude to the individuals and communities which produced these datasets.

Attribution is required for many of data providers. Some license information is listed here, but you are responsible for researching each project to follow their license terms.

## OpenAddresses

[OpenAddresses](http://openaddresses.io/) is a collection of over 300 million addresses around the world. Data in OpenAddresses only comes from national, state, and local governments, so this data is highly authoritative. Because it consists of entirely bulk imports, OpenAddresses is a large, global, and rapidly growing dataset. Many countries, particularly in Europe, now have every address represented in OpenAddresses.

OpenAddresses is by far the largest dataset by number of records used by Pelias. Even though it only contains address data (as in no building names or other metadata), it's a great resource for global geocoding.

The license for each individual source within OpenAddresses differs. Many of the sources require attribution, and many others have a share-alike clause.
*Note:* Pelias does _not_ currently return license information directly, but the license and attribution requirements for each source within OpenAddresses can be determined from the machine-readable [state.txt](http://results.openaddresses.io/state.txt) file published on the OpenAddresses website.

## Who's on First

[Who's on First](https://www.whosonfirst.org/) is an open-data directory of worldwide administrative places. Originally started at Mapzen, it is the primary provider of:

- Countries
- Macroregions (for example, England is a Macroregion within the United Kingdom)
- Regions (for example, states, provinces)
- Macro-counties (for example, [Departments of France](https://en.wikipedia.org/wiki/Departments_of_France))
- Counties
- Localities (cities, towns, hamlets)
- Neighbourhoods

Additionally, for addresses, venues, and points of interest coming from OpenStreetMap, Geonames, and OpenAddresses, Pelias uses Who's on First to provide standardized fields for the country, region, locality, and neighbourhood.

[License](https://github.com/whosonfirst/whosonfirst-data/blob/master/LICENSE.md)

## OpenStreetMap

[OpenStreetMap](https://www.openstreetmap.org/) is a community-driven, editable map of the world. It prioritizes local knowledge and individual contributions over bulk imports, which often means it has excellent coverage even in remote areas where no large-scale mapping efforts have been attempted. OpenStreetMap contains information on landmarks, buildings, roads, and natural features.

With its coverage of roads as well as rich metadata, OpenStreetMap is arguably the most valuable dataset used by Pelias for general usage.

All OpenStreetMap data is licensed under the [ODbL](http://opendatacommons.org/licenses/odbl/), a [share-alike](https://en.wikipedia.org/wiki/Share-alike) license which also requires attribution.

**Note:** There are _two_ importers for OSM data. The main importer, [pelias/openstreetmap](https://github.com/pelias/openstreetmap/), handles venues and addresses. The [pelias/polylines](https://github.com/pelias/polylines) importer handles streets, since dealing with line geometry is a special challenge.

## Geonames

[Geonames](http://www.geonames.org/) is an aggregation of many authoritative and non-authoritative datasets. It contains information on everything from country borders to airport names to geographical features. While Geonames does not contain any shape data (such as country borders), it does have a powerful and well defined hierarchy to describe the relationships between different records. This custom hierarchy makes it harder to use in combination with data from other sources, but the  [Who's On First](https://www.whosonfirst.org) project will help by providing concordance between Geonames and other datasets.

In the meantime, Geonames still provides a wide variety of useful data that helps augment the other datasets used by Pelias.

Geonames data is licensed [CC-BY-3.0](http://creativecommons.org/licenses/by/3.0/).

# Deprecated sources
Certain data sources used to be supported by Pelias but are no longer offered part of the core service and have been superseded by a new data source.

## Quattroshapes

Quattroshapes used to be supported by Pelias and its use was discontinued in April 2016. The importer can still be found at [pelias-deprecated/quattroshapes](https://github.com/pelias-deprecated/quattroshapes).

It has been replaced by Who's on First, which continues to provide global administrative place data (countries, regions, counties, cities) and administrative lookup (_"what country, region, and city is this address part of?"_).

To help make the transition seamless, any queries that specify quattroshapes in the `sources` parameter will see results from Who's on First instead. Who's on First contains all the data from Quattroshapes, plus more data, and has continuous updates and fixes. All existing queries for Quattroshapes will continue to work without modification.

Quattroshapes data is licensed [CC-BY-2.0](http://creativecommons.org/licenses/by/2.0/).
