# Data Sources

Mapzen Search is powered by several major open data sets and owes a tremendous debt of gratitude to
the individuals and communities which produced them.

## OpenStreetMap

[OpenStreetMap](https://www.openstreetmap.org/) is a community-driven, editable map of the world. It
prioritizes local knowledge and individual contributions over bulk imports, which often means it has
excellent coverage even in remote areas. OpenStreetMap contains information on landmarks, buildings,
roads, and much more.

## Quattroshapes

[Quattroshapes](http://quattroshapes.com/) provides geometry data for both administrative areas
(countries, states, cities, and so on), and neighborhoods. The administrative area boundaries are derived from
authoritative government data, while the neighborhoods are calculated from Foursquare check-ins, and
geo-tagging data from Flickr. Because of the size of the datasets from Flickr and Foursquare,
Quattroshapes provides a unique and global dataset for a difficult problem.

Because of its global coverage and high quality, Mapzen Search uses Quattroshapes to determine the
administrative regions for every data point from all datasets. This ensures that admin area data is
consistent across all datasets, whether that dataset has no admin area data(like OpenAddresses) or
may have its own (such as OpenStreetMap).

## OpenAddresses

[OpenAddresses](http://openaddresses.io/) is a collection of authoritatively sourced data for
addresses around the world. Unlike OpenStreetmap, OpenAddresses data comes exclusively from regional
authorities such as federal, state, or local governments. Because it consists of entirely bulk
imports, OpenAddreses is a large, global, and rapidly growing dataset. Many countries, particularly
in Europe, now have every address represented in OpenAddresses.

## Geonames

[Geonames](http://www.geonames.org/) is an aggregation of numerous authoritative and
non-authoritative datasets. It contains information on everything from country borders to airport
names to geographical features.


# Licensing & Attribution
