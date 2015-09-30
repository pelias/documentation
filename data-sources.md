# Data sources in Mapzen Search

Mapzen Search is powered by several major open data sets and owes a tremendous debt of gratitude to the individuals and communities which produced them.

## OpenStreetMap

[OpenStreetMap](https://www.openstreetmap.org/) is a community-driven, editable map of the world. It prioritizes local knowledge and individual contributions over bulk imports, which often means it has excellent coverage even in remote areas. OpenStreetMap contains information on landmarks, buildings, roads, and much more.

## Quattroshapes

[Quattroshapes](http://quattroshapes.com/) provides global coverage of location data for:
- countries
- regions (states/provinces)
- counties
- localities (cities, towns, hamlets, villages)
- neighborhoods (in many places)

Originally assembled by Foursquare, Quattroshapes provides not only the organizational hierarchy for nearly any point or address worldwide (town > local government > province > country), but also the borders for each of these places. Mapzen Search uses data from Quattroshapes to apply a consistent hierarchy to our data from other sources, so you can be sure that points of interest have consistent data about the cities, regions, and countries in which they are located.

## OpenAddresses

[OpenAddresses](http://openaddresses.io/) is a collection of authoritatively sourced data for addresses around the world, with currently over 200 million addresses. OpenAddresses data comes exclusively from regional authorities such as federal, state, or local governments. Because it consists of entirely bulk imports, OpenAddresses is a large, global, and rapidly growing dataset. Many countries, particularly in Europe, now have every address represented in OpenAddresses.

## Geonames

[Geonames](http://www.geonames.org/) is an aggregation of numerous authoritative and non-authoritative datasets. It contains information on everything from country borders to airport names to geographical features. Geonames represents all places as a single point (not shapes encompassing their geography), and carries with it its own distinct hierarchy data that is not uniformly compatible with all data from other sources. Don't worry, as this should be resolved in the near future.
