# Structured geocoding

>**Note:** The structured endpoint is in _beta_. You may expereience issues as the structured endpoint has not been as thoroughly tested as the [`search` endpoint](search.md).

With structured geocoding, you can search for the individual parts of a location. Structured geocoding is an option on the [`search` endpoint](search.md), where a query takes the form of `/v1/search/structured`.

For example, you want to find `30 West 26th Street, New York, NY`. With the geocoding parameter for `search`, you can only enter the entire location as one string, such as `text=30 West 26th Street, New York, NY`. However, with `search/structured`, you can specify that this location is composed of a street address, a locality, and a region.

```
{
  address: '30 West 26th Street',
  locality: 'New York',
  region: 'NY'
}
```

Structured geocoding can improve how the items in your query are parsed and interpreted in a search. An address such as `10 Park Place North Charleston South Carolina` could be viewed as a city name containing a directional (North Charleston in South Carolina), or as a street with a post-directional (10 Park Place North). By separating the components of the search input, you are reducing ambiguity in your query. This is also helpful because addresses and postal codes around the world are often formatted and ordered differently.

One common use for structured geocoding is for geocoding a list or table of addresses, where each column represents a different portion of a location.

| address | city | state | country |
| ------- | ---- | ----- | ------- |
| 1600 Pennsylvania Ave | Washington | DC | US |
| 10 Downing Street | London | | GB |
| 55 Rue du Faubourg Saint-Honoré | Paris | | FR |
| Bulevardul Geniului 1 | Bucharest | | Romania |

With a regular `search` query, you would need to concatenate these columns into one string, but `search/structured` allows you to define a query that maintains the individual fields for address, city, state, and country.

## Structured geocoding parameters

You can use structured geocoding to search for the following parameters:

* address
* neighbourhood
* borough
* locality
* county
* region
* postalcode
* country

Note that the other [`search` parameters](search.md/#available-search-parameters) can also be combined with these, allowing you to filter and prioritize your results.

### address

The `address` parameter can contain a full address with house number or only a street name.

_Examples_

* [201 Spear Street](http://pelias.github.io/compare/#/v1/search/structured%3Faddress=201%20Spear%20Street&locality=San%20Francisco&region=CA)
* [Rue de Rivoli](http://pelias.github.io/compare/#/v1/search/structured%3Faddress=Rue%20de%20Rivoli&locality=Paris&region=France)
* [Přílucká 1](http://pelias.github.io/compare/#/v1/search/structured%3Faddress=1%20P%C5%99%C3%ADluck%C3%A1&locality=%C5%BDelechovice%20nad%20D%C5%99evnic%C3%AD)

### neighbourhood

[Neighbourhoods](https://spelunker.whosonfirst.org/placetypes/neighbourhood/) are vernacular geographic entities that may not necessarily be official administrative divisions but are important nonetheless.

_Examples_

* [Notting Hill](https://pelias.github.io/compare/#/v1/search/structured%3Fneighbourhood=Notting%20Hill&locality=London) in London
* [Flatiron District](https://pelias.github.io/compare/#/v1/search/structured%3Fneighbourhood=Flatiron%20District&borough=Manhattan) in Manhattan
* [Le Marais](https://pelias.github.io/compare/#/v1/search/structured%3Fneighbourhood=Le%20Marais&locality=Paris) in Paris

### borough

[Boroughs](https://spelunker.whosonfirst.org/placetypes/borough/) are mostly known in the context of New York City, even though they may exist in other cities, such as [Mexico City](https://spelunker.whosonfirst.org/id/857683023/descendants/?exclude=nullisland&placetype=borough).

_Examples_

* [Manhattan](https://pelias.github.io/compare/#/v1/search/structured%3Fborough=Manhattan&locality=New%20York)
* [Iztapalapa](https://pelias.github.io/compare/#/v1/search/structured%3Fborough=Iztapalapa&locality=Mexico%20City)

A structured geocoding request for `/v1/search/structured?locality=Manhattan&region=NY`, returns boroughs along with localities.

### locality

[Localities](https://spelunker.whosonfirst.org/placetypes/locality/) are equivalent to what are commonly referred to as cities.

_Examples_

* [Bangkok](https://pelias.github.io/compare/#/v1/search/structured%3Flocality=Bangkok&country=Thailand)
* [Caracas](https://pelias.github.io/compare/#/v1/search/structured%3Flocality=Caracas&country=Venezuela)
* [Truth or Consequences](https://pelias.github.io/compare/#/v1/search/structured%3Flocality=Truth%20or%20Consequences&region=NM) in New Mexico

### county

[Counties](https://spelunker.whosonfirst.org/placetypes/county/) are administrative divisions between localities and regions.

_Examples_

* [Bucks](https://pelias.github.io/compare/#/v1/search/structured%3Fcounty=Bucks&region=PA) in Pennsylvania
* [Maui](https://pelias.github.io/compare/#/v1/search/structured%3Fcounty=Maui&region=HI)
* [Alb-Donau-Kreis](https://pelias.github.io/compare/#/v1/search/structured%3Fcounty=Alb-Donau-Kreis&country=DEU) in Germany

Counties are not as commonly used in geocoding as localities, but can be useful when attempting to disambiguate between localities. For instance, there are three cities named Red Lion in Pennsylvania but only one in each of three counties. Specifying a county disambiguates this list to a single result.

### region

[Regions](https://spelunker.whosonfirst.org/placetypes/region/) are normally the first-level administrative divisions within countries, analogous to states and provinces in the [United States](https://spelunker.whosonfirst.org/id/85633793/descendants/?exclude=nullisland&placetype=region) and [Canada](https://spelunker.whosonfirst.org/id/85633041/descendants/?exclude=nullisland&placetype=region), respectively, though most other countries contain regions as well.

_Examples_

* [Delaware](https://pelias.github.io/compare/#/v1/search/structured%3Fregion=Delaware)
* [Ontario](https://pelias.github.io/compare/#/v1/search/structured%3Fregion=Ontario)
* [Ardennes](https://pelias.github.io/compare/#/v1/search/structured%3Fregion=Ardennes)

Regions in the United States have [common abbreviations](https://en.wikipedia.org/wiki/List_of_U.S._state_abbreviations), such as PA for [Pennsylvania](https://spelunker.whosonfirst.org/id/85688481/) and NM for [New Mexico](https://spelunker.whosonfirst.org/id/85688493/).  The `region` parameter can be a full name or abbreviation, so specifying `/v1/search/structured?region=NM` is functionality equivalent to `/v1/search/structured?region=New Mexico`.

### postalcode

[Postal codes](https://spelunker.whosonfirst.org/placetypes/postalcode/) are used to aid in sorting mail with the format dictated by an administrative division, which is almost always countries.  Among other reasons, postal codes are unique within a country so they are useful in geocoding as a shorthand for a fairly granular geographical location.

_Examples_

* [90210](https://spelunker.whosonfirst.org/id/554783991/)
* [CV23 9SL](https://spelunker.whosonfirst.org/id/454261459/)
* [5439171](https://spelunker.whosonfirst.org/id/538904173/)

Keep in mind that you can search for `postalcode` exclusively. So requests like [/v1/search/structured?postalcode=87801]( https://pelias.github.io/compare/#/v1/search/structured?postalcode=87801) will return matching postalcode records.

### country

[Countries](https://spelunker.whosonfirst.org/placetypes/country/) are the highest-level administrative divisions supported in a search. In addition to full names, countries have common [two-](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) and [three-letter](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) abbreviations that are also supported values for the `country` parameter.

_Examples_

* [Liechtenstein](https://pelias.github.io/compare/#/v1/search/structured%3Fcountry=Liechtenstein)
* [CMR](https://pelias.github.io/compare/#/v1/search/structured%3Fcountry=CMR) ([Cameroon](https://spelunker.whosonfirst.org/id/85632245/))
* [Bermuda](https://pelias.github.io/compare/#/v1/search/structured%3Fcountry=Bermuda)

## Who's On First layer mappings reference

The [Who's on First](https://whosonfirst.org/) gazetteer is one of the datasets used as a source of search data. Use this table is a reference between the parameters for structured geocoding and the [types of places in Who's on First](https://whosonfirst.org/placetypes/).

| Structured geocoding parameter | Who's on First placetype |
| -------------------- | ------------------------- |
| `neighbourhood`        | [neighbourhood](https://spelunker.whosonfirst.org/placetypes/neighbourhood/)             |
| `borough`              | [borough](https://spelunker.whosonfirst.org/placetypes/borough/)                   |
| `locality`             | [locality](https://spelunker.whosonfirst.org/placetypes/locality/), [localadmin](https://spelunker.whosonfirst.org/placetypes/localadmin/) (and [borough](https://spelunker.whosonfirst.org/placetypes/borough/) if `borough` parameter is not supplied)      |
| `county`               | [county](https://spelunker.whosonfirst.org/placetypes/county/), [macrocounty](https://spelunker.whosonfirst.org/placetypes/macrocounty/)       |
| `region`               | [region](https://spelunker.whosonfirst.org/placetypes/region/), [macroregion](https://spelunker.whosonfirst.org/placetypes/macroregion/)       |
| `country`              | [dependency](https://spelunker.whosonfirst.org/placetypes/dependency/), [country](https://spelunker.whosonfirst.org/placetypes/country/)       |

For example, [Peach Bottom, Pennsylvania](https://spelunker.whosonfirst.org/id/404487863/) is only a `localadmin` place type and not a `locality` in Who's on First. For simplicity, if a structured geocoding request specifies `locality=Peach Bottom&region=Pennsylvania`, then `Peach Bottom` in both the `locality` and `localadmin` layers are searched.
