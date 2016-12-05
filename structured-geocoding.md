# Structured Geocoding

The Mapzen search team is happy to announce that we've just promoted structured geocoding out of beta into production to accommodate applications that have different inputs than a single string of text.  Structured geocoding is now available at: [http://search.mapzen.com/v1/search/structured](http://search.mapzen.com/v1/search/structured)

## One Size Doesn't Fit All

Until now, Mapzen has only supported geocoding and searching using a single text input that contained all the search and location data.  Sometimes this isn't the best way to geocode since an application's needs may not have information in this format.  Consider a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file full of addresses to be geocoded:

| address | city | state | country |
| ------- | ---- | ----- | ------- |
| 1600 Pennsylvania Ave | Washington | DC | US |
| 10 Downing Street | London | | GB |
| 55 Rue du Faubourg Saint-Honoré | Paris | | FR |
| Bulevardul Geniului 1 | Bucharest | | Romania |

Or, in another use case, say for some reason you recently decided to [move to Canada](http://www.wikihow.com/Move-to-Canada) and your GPS device needs to geocode your new home address.  The ambiguity of a single text input isn't ideal in this situation, so you'll most likely be presented with a multi-field prompt in which to enter your new address:

| address | city | state | country |
| ------- | ---- | ----- | ------- |
| 9 Queen Elizabeth Way | Fort Erie | ON | CA |

Without structured parameters the application would have to concatenate the address fields together into a single input to Pelias.  While this task may seem fairly pedestrian, this is problematic for several reasons.  

First, ambiguity can be introduced with concatenation.  For example, `10 Park Place North Charleston South Carolina` can be legitimately interpreted by an address analyzer as a city name containing a directional ([North Charleston](https://whosonfirst.mapzen.com/spelunker/id/101720751/) actually is a city in South Carolina):

```
{
   "address": "10 Park Place",
   "locality": "North Charleston",
   "region": "South Carolina"
}
```

or as a street with a post-directional:

```
{
  "address": "10 Park Place North",
  "locality": "Charleston",
  "region": "South Carolina"
}
```

Second, it's not always clear _how_ to concatenate the fields of an address.  The United States places the zip code after the state (e.g. `801 Leroy Place, Socorro, NM 87801`) whereas Germany formats addresses with the postal code between the street address and city (e.g. `Otto-Dürr-Straße 1, 70435 Stuttgart, Germany`).  

Third, the [dizzying variety of address formats](https://github.com/OpenCageData/address-formatting/blob/master/conf/countries/worldwide.yaml) and [edge cases](https://www.mjt.me.uk/posts/falsehoods-programmers-believe-about-addresses/) mean that [address parsing](https://github.com/openvenues/libpostal) is tricky business.  [libpostal](https://github.com/openvenues/libpostal) is a fantastic address analyzer but a geocoder should not introduce ambiguity where application data contains little to none.

In any case, forcing the user to concatenate multiple fields into one for single input geocoding puts an undue burden upon the application developer.  

## Parameters

As the name hopefully implies, _structured_ geocoding means the requesting application has geographic data already split up into its constituent parts.  Structured geocoding has been deployed to the `/v1/search/structured` endpoint and accepts one or more of the following parameters:

* address
* neighbourhood
* borough
* locality
* county
* region
* postalcode
* country

Along with the new parameters, structured geocoding supports all the other [search parameters](https://mapzen.com/documentation/search/search/#available-search-parameters) that you've grown to love, like `boundary.country` and `size`.  

### address

The `address` parameter can contain a full address including house number or just a street name.  Pelias stores addresses as separate number and street fields so libpostal is utilized to parse the number and street values.  

_Examples_

* 201 Spear Street
* Rue de Rivoli

### neighbourhood

[Neighbourhoods](https://whosonfirst.mapzen.com/spelunker/placetypes/neighbourhood/) are vernacular geographic entities that may not necessarily be official administrative divisions but are important nonetheless.  

_Examples_

* [Notting Hill](https://whosonfirst.mapzen.com/spelunker/id/85789533/) in London
* [Flatiron District](https://whosonfirst.mapzen.com/spelunker/id/85869245/) in Manhattan
* [Le Marais](https://whosonfirst.mapzen.com/spelunker/id/420782743/) in Paris

### borough

[Boroughs](https://whosonfirst.mapzen.com/spelunker/placetypes/borough/) are a bit of an oddity in the realm of spatial data.  For the most part they fit in between neighbourhoods and localities but are mostly only recognizable within the context of New York City.  In fact, they're commonly thought of as cities themselves rather than as subordinate to [New York City](https://whosonfirst.mapzen.com/spelunker/placetypes/borough/?&region_id=85688543).  

_Examples_

* [Manhattan](https://whosonfirst.mapzen.com/spelunker/id/421205771/)
* [Iztapalapa](https://whosonfirst.mapzen.com/spelunker/id/890535765/)

We don't expect our users to understand or appreciate the hierarchical distinction in our data between boroughs and localities, so if a structured geocode request passed `/v1/search/structured?locality=Manhattan&region=NY`, Pelias will search boroughs along with localities.  

### locality

[Localities](https://whosonfirst.mapzen.com/spelunker/placetypes/locality/) are equivalent to what are commonly referred to as cities, but can range anywhere in size from the smallest hamlet to the most populated metropolis on the planet.  

_Examples_

* [Bangkok](https://whosonfirst.mapzen.com/spelunker/id/102025263/)
* [Caracas](https://whosonfirst.mapzen.com/spelunker/id/890442147/)
* [Truth or Consequences](https://whosonfirst.mapzen.com/spelunker/id/85976585/)

### county

[Counties](https://whosonfirst.mapzen.com/spelunker/placetypes/county/) are administrative divisions between localities and regions.  

_Examples_

* [Bucks](https://whosonfirst.mapzen.com/spelunker/id/102080987/)
* [Maui](https://whosonfirst.mapzen.com/spelunker/id/102085577/)
* [Alb-Donau-Kreis](https://whosonfirst.mapzen.com/spelunker/id/102063309/)

Counties are not as commonly-used in geocoding as localities but can be useful when attempting to disambiguate between localities.  For instance, there are 3 cities named Red Lion in Pennsylvania but only 1 in each of 3 counties.  Specifying a county disambiguates this list to a single result.  

### region

[Regions](https://whosonfirst.mapzen.com/spelunker/placetypes/region/) are normally the first-level administrative divisions within countries, analogous to states and provinces in the [United States](https://whosonfirst.mapzen.com/spelunker/id/85633793/descendants/?exclude=nullisland&placetype=region) and [Canada](https://whosonfirst.mapzen.com/spelunker/id/85633041/descendants/?exclude=nullisland&placetype=region), respectively, though most other countries contain regions as well.  

_Examples_

* [Delaware](https://whosonfirst.mapzen.com/spelunker/id/85688611/)
* [Ontario](https://whosonfirst.mapzen.com/spelunker/id/85682057/)
* [Ardennes](https://whosonfirst.mapzen.com/spelunker/id/85683309/)

Regions in the United States have common abbreviations, such as PA for [Pennsylvania](https://whosonfirst.mapzen.com/spelunker/id/85688481/) and NM for [New Mexico](https://whosonfirst.mapzen.com/spelunker/id/85688493/).  These abbreviations are searched for the region parameter value, so specifying `/v1/search/structured?region=NM` is functionality equivalent to `/v1/search/structured?region=New Mexico`.  

### postalcode

[Postal codes](https://whosonfirst.mapzen.com/spelunker/placetypes/postalcode/) are used to aid in sorting mail with the format dictated by an administrative division (almost always countries).  Among other reasons, postal codes are unique within a country so they're useful in geocoding as a shorthand for a fairly granular geographical location.

_Examples_

* [90210](https://whosonfirst.mapzen.com/spelunker/id/554783991/)
* [CV23 9SL](https://whosonfirst.mapzen.com/spelunker/id/454261459/)
* [5439171](https://whosonfirst.mapzen.com/spelunker/id/538904173/)

Pelias doesn't currently import postal codes, though addresses from [OpenAddresses](https://openaddresses.io/) and [OpenStreetMap](https://www.openstreetmap.org/) are sometimes annotated with postal codes which are used for scoring.  

### country

[Countries](https://whosonfirst.mapzen.com/spelunker/placetypes/country/) are the highest-level administrative divisions supported by Pelias.  In addition to full names, countries have common [2-](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) and [3-letter](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) abbreviations which are also supported in the `country` parameter.  

_Examples_

* [Liechtenstein](https://whosonfirst.mapzen.com/spelunker/id/85633267/)
* [Cameroon](https://whosonfirst.mapzen.com/spelunker/id/85632245/)
* [Bermuda](https://whosonfirst.mapzen.com/spelunker/id/85632731/)

The more astute geocoding blog reader that has spent entirely too much time perusing [Who's on First](https://whosonfirst.mapzen.com/) would have noticed that Bermuda is actually a [British Overseas Territory](https://en.wikipedia.org/wiki/British_Overseas_Territories) (a `dependency`, in Who's on First nomenclature) and not a country, similar the relationshiop [Puerto Rico](https://whosonfirst.mapzen.com/spelunker/id/85633729/) and [New Caledonia](https://whosonfirst.mapzen.com/spelunker/id/85632473/) have to the [United States](https://whosonfirst.mapzen.com/spelunker/id/85633793/descendants/?exclude=nullisland&placetype=dependency#4/2.92/-170.78) and [France](https://whosonfirst.mapzen.com/spelunker/id/85633147/), respectively.  To reduce the number of parameters and potential confusion about data organization, [dependencies](https://whosonfirst.mapzen.com/spelunker/placetypes/dependency/) are searched for using the `country` parameter value.  

## Caveats

Any combination of the above parameters can be sent as structured geocoding request **with the exception of postalcode-only** as Pelias does not currently import postal codes as separate records, only as augmenting address data.  For example, a request consisting only of `/v1/search/structured?postalcode=87801` is not valid at this time and an error will be returned to the caller.  

## Fallback Behaviors

Structured geocoding, much like the single-input `/v1/search` endpoint, falls back to less granular geocodes if the exact input as specified returns no results.  This topic has already been covered in [The Next Chapter of Search](https://mapzen.com/blog/the-next-chapter-of-search/) so it won't be covered here except for a quick recap.  

A key concept of geocoding is to not return things other than what the user asked for.  If the geocode request is for `14 Horseshoe Pond Lane, Concord, New Hampshire` and that address either isn't a point in the data or can't be interpolated, don't return something that's close like `16 Horseshoe Pond Lane, Concord, New Hampshire`.  The geocoder should fall back to the most granular level available.  If a street result for `Horseshoe Pond Lane, Concord, New Hampshire` is in the data, return that.  Otherwise return `Concord, New Hampshire` or even `New Hampshire` as a last resort.  

## Get in touch!

If you have any questions, concerns, enhancement requests, or bug reports, please don't hesitate to [file an issue](https://github.com/pelias/pelias/issues)! Happy geocoding, everyone!  
