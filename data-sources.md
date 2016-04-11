# Data sources in Mapzen Search

Mapzen Search is powered by several major open data sets and owes a tremendous debt of gratitude to the individuals and communities which produced them.

Attribution is required for many of the Mapzen Search data providers. Some license information is listed here, but you are responsible for researching each project to follow their license terms.

## OpenAddresses

`sources=openaddresses` | `sources=osm`

Layers:
- `address`

[OpenAddresses](http://openaddresses.io/) is a collection of over 200 million addresses around the world. Data in OpenAddresses only comes from national, state, and local governments, so this data is highly authoritative. Because it consists of entirely bulk imports, OpenAddresses is a large, global, and rapidly growing dataset. Many countries, particularly in Europe, now have every address represented in OpenAddresses.

OpenAddresses is by far the largest dataset by number of records used by Mapzen Search. Even though it only contains address data (as in no building names or other metadata), it's a great resource for global geocoding.

Many of the sources used in OpenAddresses require [attribution (LINK NOT LIVE)](https://www.mapzen.com/copyright/openaddresses). Mapzen Search _does not_ import OpenAddresses sources marked as Share-Alike by the OpenAddresses project.

## Who's on First

`sources=whosonfirst` | `sources=wof`

Layers:
- `country`
- `region`
- `county`
- `locality`
- `localadmin`
- `neighbourhood`
- `coarse` (alias for simultaneously using all the above)

[Who's on First](https://whosonfirst.mapzen.com) is an open-data directory of worldwide administrative places. Created by Mapzen, it is the primary provider of:
- Countries
- Regions (for example: states, provinces)
- Counties
- Localities (cities, towns, hamlets)
- Neighbourhoods

Additionally, for addresses, venues, and points of interest coming from OpenStreetMap, Geonames, and OpenAddresses, Mapzen Search uses Who's on First to provide standardized fields for the country, region, locality, and neighbourhood. Other matching levels the place may fall within `macro-county` or `macro-region` taxonomy from Who's on Firsts.

[License](https://github.com/whosonfirst/whosonfirst-data/blob/master/LICENSE.md)

## OpenStreetMap

`sources=openstreetmap` | `sources=osm`

Layers:
- `address`
- `venue`

[OpenStreetMap](https://www.openstreetmap.org/) is a community-driven, editable map of the world. It prioritizes local knowledge and individual contributions over bulk imports, which often means it has excellent coverage even in remote areas where no large-scale mapping efforts have been attempted. OpenStreetMap contains information on landmarks, buildings, roads, and natural features.

With its coverage of roads as well as rich metadata, OpenStreetMap is arguably the most valuable dataset used by Mapzen Search for general usage.

All OpenStreetMap data is licensed under the [ODbL](http://opendatacommons.org/licenses/odbl/), a [share-alike](https://en.wikipedia.org/wiki/Share-alike) license which also requires attribution.

## Geonames

`sources=geonames` | `sources=gn`

Layers:
- `venue`
- `country`
- `region`
- `county`
- `locality`
- `localadmin`
- `neighbourhood`
- `coarse` (alias for simultaneously using all the above)

[Geonames](http://www.geonames.org/) is an aggregation of many authoritative and non-authoritative datasets. It contains information on everything from country borders to airport names to geographical features. While Geonames does not contain any shape data (such as country borders), it does have a powerful and well defined hierarchy to describe the relationships between different records. This custom hierarchy makes it harder to use in combination with data from other sources, but the Mapzen [Who's On First](http://whosonfirst.mapzen.com/) project will help by providing concordance between Geonames and other datasets.

In the meantime, Geonames still provides a wide variety of useful data that helps augment the other datasets used by Mapzen Search.

Geonames data is licensed [CC-BY-3.0](http://creativecommons.org/licenses/by/3.0/).

# Deprecated sources
Certain data sources used to be supported by Mapzen Search but are no longer offered part of the core service and have been superseded by a new data source.

## Quattroshapes

`sources=quattroshapes` | `sources=qs`

Quattroshapes used to be supported by Mapzen Search and its use was discontinued in April 2016.

It has been replaced by Who's on First, which continues to provide global administrative place data (countries, regions, counties, cities) and administrative lookup (_"what country, region, and city is this address part of?"_).

Quattroshapes data is licensed [CC-BY-2.0](http://creativecommons.org/licenses/by/2.0/).
