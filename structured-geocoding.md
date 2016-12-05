# Structured geocoding

With [structured geocoding](https://search.mapzen.com/v1/search/structured), you can search for individual components by specifying that the item you are searching for is an address, a city, or one or more types of locations.

For example, if you have a table of addresses where each column represents a different part of an location, use structured geocoding. With the `text` parameter for `search`, you would need to concatenate these fields into one string.

| address | city | state | country |
| ------- | ---- | ----- | ------- |
| 1600 Pennsylvania Ave | Washington | DC | US |
| 10 Downing Street | London | | GB |
| 55 Rue du Faubourg Saint-Honoré | Paris | | FR |
| Bulevardul Geniului 1 | Bucharest | | Romania |

Structured geocoding allows you to specify exactly how to interpret a location, as concatenating fields introduces ambiguity in your data. For example, `10 Park Place North Charleston South Carolina` could be a city name containing a directional (North Charleston in South Carolina), or as or as a street with a post-directional (10 Park Place North). In addition, addresses and postal codes around the world are often formatted differently.

## Structured geocoding parameters

You can use structured geocoding on any of these parameters, as well as the other [search parameters](https://mapzen.com/documentation/search/search/#available-search-parameters).

* address
* neighbourhood
* borough
* locality
* county
* region
* postalcode
* country

### address

The `address` parameter can contain a full address including house number or just a street name.  Pelias stores addresses as separate number and street fields so libpostal is utilized to parse the number and street values.  

_Examples_

* [201 Spear Street](http://search.mapzen.com/v1/search/structured?address=201%20Spear%20Street&locality=San%20Francisco&region=CA)
* [Rue de Rivoli](http://search.mapzen.com/v1/search/structured?address=Rue de Rivoli&locality=Paris&region=France)
* [Přílucká 1](http://search.mapzen.com/v1/search/structured?address=1 Přílucká&locality=Želechovice nad Dřevnicí)

### neighbourhood

[Neighbourhoods](https://whosonfirst.mapzen.com/spelunker/placetypes/neighbourhood/) are vernacular geographic entities that may not necessarily be official administrative divisions but are important nonetheless.  

_Examples_

* [Notting Hill](http://search.mapzen.com/v1/search/structured?neighbourhood=Notting+Hill&locality=London) in London
* [Flatiron District](http://search.mapzen.com/v1/search/structured?neighbourhood=Flatiron District&borough=Manhattan) in Manhattan
* [Le Marais](http://search.mapzen.com/v1/search/structured?neighbourhood=Le Marais&locality=Paris) in Paris

### borough

[Boroughs](https://whosonfirst.mapzen.com/spelunker/placetypes/borough/) are a bit of an oddity in the realm of spatial data.  For the most part they fit in between neighbourhoods and localities but are mostly identifiable to the general public in the context of New York City even though other cities such as [Mexico City](https://whosonfirst.mapzen.com/spelunker/id/857683023/descendants/?exclude=nullisland&placetype=borough) have them, too.  In fact, they're commonly thought of as cities themselves rather than as subsidiaries of [New York City](https://whosonfirst.mapzen.com/spelunker/placetypes/borough/?&region_id=85688543).  

_Examples_

* [Manhattan](http://search.mapzen.com/v1/search/structured?borough=Manhattan&locality=New+York+City)
* [Iztapalapa](http://search.mapzen.com/v1/search/structured?borough=Iztapalapa&locality=Mexico City)

### locality

[Localities](https://whosonfirst.mapzen.com/spelunker/placetypes/locality/) are equivalent to what are commonly referred to as cities, but can range anywhere in size from the [smallest hamlet](https://whosonfirst.mapzen.com/spelunker/id/85977019/) to the [most populous metropolis](https://whosonfirst.mapzen.com/spelunker/id/102031307/) on the planet.  

_Examples_

* [Bangkok](http://search.mapzen.com/v1/search/structured?locality=Bangkok&country=Thailand)
* [Caracas](http://search.mapzen.com/v1/search/structured?locality=Caracas&country=Venezuela)
* [Truth or Consequences](http://search.mapzen.com/v1/search/structured?locality=Truth+or+Consequences&region=NM) in New Mexico

### county

[Counties](https://whosonfirst.mapzen.com/spelunker/placetypes/county/) are administrative divisions between localities and regions.  

_Examples_

* [Bucks](http://search.mapzen.com/v1/search/structured?county=Bucks&region=PA) in Pennsylvania
* [Maui](http://search.mapzen.com/v1/search/structured?county=Maui&region=HI)
* [Alb-Donau-Kreis](http://search.mapzen.com/v1/search/structured?county=Alb-Donau-Kreis&country=DEU) in Germany

Counties are not as commonly used in geocoding as localities but can be useful when attempting to disambiguate between localities.  For instance, there are 3 cities named Red Lion in Pennsylvania but only 1 in each of 3 counties.  Specifying a county disambiguates this list to a single result.  

### region

[Regions](https://whosonfirst.mapzen.com/spelunker/placetypes/region/) are normally the first-level administrative divisions within countries, analogous to states and provinces in the [United States](https://whosonfirst.mapzen.com/spelunker/id/85633793/descendants/?exclude=nullisland&placetype=region) and [Canada](https://whosonfirst.mapzen.com/spelunker/id/85633041/descendants/?exclude=nullisland&placetype=region), respectively, though most other countries contain regions as well.  

_Examples_

* [Delaware](http://search.mapzen.com/v1/search/structured?region=Delaware)
* [Ontario](http://search.mapzen.com/v1/search/structured?region=Ontario)
* [Ardennes](http://search.mapzen.com/v1/search/structured?region=Ardennes)

Regions in the United States have [common abbreviations](https://en.wikipedia.org/wiki/List_of_U.S._state_abbreviations), such as PA for [Pennsylvania](https://whosonfirst.mapzen.com/spelunker/id/85688481/) and NM for [New Mexico](https://whosonfirst.mapzen.com/spelunker/id/85688493/).  The `region` parameter can be a full name or abbreviation, so specifying `/v1/search/structured?region=NM` is functionality equivalent to `/v1/search/structured?region=New Mexico`.  

### postalcode

[Postal codes](https://whosonfirst.mapzen.com/spelunker/placetypes/postalcode/) are used to aid in sorting mail with the format dictated by an administrative division (almost always countries).  Among other reasons, postal codes are unique within a country so they're useful in geocoding as a shorthand for a fairly granular geographical location.

_Examples_

* [90210](https://whosonfirst.mapzen.com/spelunker/id/554783991/)
* [CV23 9SL](https://whosonfirst.mapzen.com/spelunker/id/454261459/)
* [5439171](https://whosonfirst.mapzen.com/spelunker/id/538904173/)

Pelias doesn't currently import postal codes, though addresses from [OpenAddresses](https://openaddresses.io/) and [OpenStreetMap](https://www.openstreetmap.org/) are sometimes annotated with postal codes and used for scoring.  

### country

[Countries](https://whosonfirst.mapzen.com/spelunker/placetypes/country/) are the highest-level administrative divisions supported by Pelias.  In addition to full names, countries have common [2-](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) and [3-letter](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) abbreviations which are also supported values for the `country` parameter.  

_Examples_

* [Liechtenstein](http://search.mapzen.com/v1/search/structured?country=Liechtenstein)
* [CMR](http://search.mapzen.com/v1/search/structured?country=CMR) ([Cameroon](https://whosonfirst.mapzen.com/spelunker/id/85632245/))
* [Bermuda](http://search.mapzen.com/v1/search/structured?country=Bermuda)

The more astute geocoding blog reader that has spent entirely too much time perusing [Who's on First](https://whosonfirst.mapzen.com/) would have noticed that [Bermuda](https://whosonfirst.mapzen.com/spelunker/id/85632731/) is actually a [British Overseas Territory](https://en.wikipedia.org/wiki/British_Overseas_Territories) (a `dependency`, in Who's on First nomenclature) and not a country, similar to the relationship [Puerto Rico](https://whosonfirst.mapzen.com/spelunker/id/85633729/) and [New Caledonia](https://whosonfirst.mapzen.com/spelunker/id/85632473/) have to the [United States](https://whosonfirst.mapzen.com/spelunker/id/85633793/descendants/?exclude=nullisland&placetype=dependency#4/2.92/-170.78) and [France](https://whosonfirst.mapzen.com/spelunker/id/85633147/), respectively.  To reduce the number of parameters and potential confusion about data organization, [dependencies](https://whosonfirst.mapzen.com/spelunker/placetypes/dependency/) are searched for using the `country` parameter value.  

## Caveats

Any combination of the above parameters can be sent as structured geocoding requests **with the exception of postalcode-only** as Pelias does not currently import postal codes as separate records, only as augmenting address data.  For example, a request consisting only of [/v1/search/structured?postalcode=87801](http://search.mapzen.com//v1/search/structured?postalcode=87801) is not valid at this time and an error will be returned to the caller.  

## Who's On First Layer Mappings

This section is for people who are well-versed in the nuances of Who's on First place types in or have spent a bit of time looking at data in it.  

As stated previously, we don't expect our users to understand the [complexities of Who's on First layer mappings](https://whosonfirst.mapzen.com/placetypes/).  While there are very good reasons why our gazetteer supports both `locality` and `localadmin`, it would be pretty cumbersome to include both as parameters, so we have added some convenience mappings to make structured geocoding easier:

| structured geocoding parameter | Who's on First placetype(s) |
| -------------------- | ------------------------- |
| `neighbourhood`        | [neighbourhood](https://whosonfirst.mapzen.com/spelunker/placetypes/neighbourhood/)             |
| `borough`              | [borough](https://whosonfirst.mapzen.com/spelunker/placetypes/borough/)                   |
| `locality`             | [locality](https://whosonfirst.mapzen.com/spelunker/placetypes/locality/), [localadmin](https://whosonfirst.mapzen.com/spelunker/placetypes/localadmin/) (and [borough](https://whosonfirst.mapzen.com/spelunker/placetypes/borough/) if `borough` parameter is not supplied)      |
| `county`               | [county](https://whosonfirst.mapzen.com/spelunker/placetypes/county/), [macrocounty](https://whosonfirst.mapzen.com/spelunker/placetypes/macrocounty/)       |
| `region`               | [region](https://whosonfirst.mapzen.com/spelunker/placetypes/region/), [macroregion](https://whosonfirst.mapzen.com/spelunker/placetypes/macroregion/)       |
| `country`              | [dependency](https://whosonfirst.mapzen.com/spelunker/placetypes/dependency/), [country](https://whosonfirst.mapzen.com/spelunker/placetypes/country/)       |

For example, [Peach Bottom, Pennsylvania](https://whosonfirst.mapzen.com/spelunker/id/404487863/) is only a `localadmin` place type and not a `locality` in Who's on First, but we don't expect the user to know the distinction, so if a structured geocoding request specifies `locality=Peach+Bottom&region=Pennsylvania`, then Pelias will lookup `Peach Bottom` in both the `locality` and `localadmin` layers.  
