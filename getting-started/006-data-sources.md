Data Sources
=============

Mapzen Search is powered by several major open data sets and owes a tremendous debt of gratitude to
the individuals and communities which produced them.

# Data Sources

## OpenStreetMap

[OpenStreetMap](https://www.openstreetmap.org/) is a community-driven, editable map of the world. It
prioritises local knowledge and individual contributions over bulk imports, which often means it has
excellent coverage even in remote areas. OpenStreetMap contains information on landmarks, buildings,
roads, and much more.

## Quattroshapes

[Quattroshapes](http://quattroshapes.com/) provides geometry data for both administrative areas
(countries, states, cities, etc), and neighborhoods. The admin area boundaries are derived from
authoritative government data, while the neighborhoods are calculated from Foursquare checkins, and
geo-tagging data from Flickr. Because of the size of the datasets from Flickr and Foursquare,
Quattroshapes provides a unique and global dataset for a difficult problem.

Because of its global coverage and high quality, Mapzen Search uses Quattroshapes to determine the
administrative regions for every data point from all datasets. This ensures that admin area data is
consistent across all datasets, whether that dataset has no admin area data(like Openaddresses) or
may have its own (such as OpenStreetMap).

## Openaddresses

[Openaddresses](http://openaddresses.io/) is a collection of authoritatively sourced data for
addresses around the world. Unlike OpenStreetmap, Openaddresses data comes exclusively from regional
authorities such as federal, state, or local governments. Because it consists of entirely bulk
imports, Openaddreses is a large, global, and rapidly growing dataset. Many countries, particularly
in Europe, now have _every_ address represented in Openaddresses.

## Geonames

[Geonames](http://www.geonames.org/) is an aggregation of numerous authoritative and
non-authoritative datasets. It contains information on everything from country borders to airport
names to geographical features.


# Licensing & Attribution
