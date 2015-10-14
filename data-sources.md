# Data sources in Mapzen Search

Mapzen Search is powered by several major open data sets and owes a tremendous debt of gratitude to the individuals and communities which produced them.

## OpenStreetMap

[OpenStreetMap](https://www.openstreetmap.org/) is a community-driven, editable map of the world. It prioritizes local knowledge and individual contributions over bulk imports, which often means it has excellent coverage even in remote areas where no large-scale mapping efforts have been attempted. OpenStreetMap contains information on landmarks, buildings, roads, and natural features.

With its coverage of roads as well as rich metadata, OpenStreetMap is arguably the most valuable dataset used by Mapzen Search for general usage.

All OpenStreetMap data is licensed under the [ODbL](http://opendatacommons.org/licenses/odbl/), a [share-alike](https://en.wikipedia.org/wiki/Share-alike) license which also requires attribution.

## Quattroshapes

[Quattroshapes](http://quattroshapes.com/) provides global coverage of location data for:

- countries
- regions (states/provinces)
- counties
- localities (cities, towns, hamlets, villages)
- neighborhoods (in many places)

Originally assembled by Foursquare, Quattroshapes provides not only the organizational hierarchy for nearly any point or address worldwide (town > local government > province > country), but also the borders for each of these places.

Mapzen Search uses data from Quattroshapes to apply a consistent hierarchy to our data from other sources, so you can be sure that points of interest have consistent data about the cities, regions, and countries in which they are located.

Quattroshapes data is licensed [CC BY](http://creativecommons.org/licenses/by/2.0/), allowing its use for any purpose with proper attribution.

## OpenAddresses

[OpenAddresses](http://openaddresses.io/) is a collection of authoritatively sourced data for addresses around the world, with currently over 200 million addresses. OpenAddresses data comes exclusively from regional authorities such as federal, state, or local governments. Because it consists of entirely bulk imports, OpenAddresses is a large, global, and rapidly growing dataset. Many countries, particularly in Europe, now have every address represented in OpenAddresses.

OpenAddresses is by far the largest dataset by number of records used by Mapzen Search, so even though it only contains address data (i.e. no building names or other metadata), it's a great resource for global geocoding.

As OpenAddresses is sourced from regional governments, its data is in the public domain.

## Geonames

[Geonames](http://www.geonames.org/) is an aggregation of numerous authoritative and non-authoritative datasets. It contains information on everything from country borders to airport names to geographical features. While Geonames does not contain any shape data (such as country borders), it does have a powerful and well defined hierarchy to describe the relationships between different records. Currently, this custom hierarchy makes it harder to use in combination with data from other sources, but the Mapzen [Who's On First](http://whosonfirst.mapzen.com/) project will help by providing concordance between Geonames and other datasets.

In the meantime, Geonames still provides a wide variety of useful data that helps augment the other datasets used by Mapzen Search.

Geonames data is licensed [CC BY](http://creativecommons.org/licenses/by/3.0/).
