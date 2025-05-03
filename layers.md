
# Layers

The type of record is referred to as its `layer`. All records are indexed into the following layers:

|layer|description|
|----|----|
|`venue`|points of interest, businesses, things with walls|
|`address`|places with a street address|
|`street`|streets,roads,highways|
|`country`|places that issue passports, nations, nation-states|
|`macroregion`|a related group of regions. Mostly in Europe|
|`region`|states and provinces|
|`macrocounty`|a related group of counties. Mostly in Europe.|
|`county`|official governmental area; usually bigger than a locality, almost always smaller than a region|
|`locality`|towns, hamlets, cities|
|`localadmin`|local administrative boundaries|
|`borough`| a local administrative boundary, currently only used for New York City|
|`neighbourhood`|social communities, neighbourhoods|
|`coarse`|alias for simultaneously using all administrative layers (everything except `venue` and `address`)|
|`postalcode`|postal code used by mail services|

> /v1/autocomplete?__layers=coarse__&text=starbuck

with `layers=coarse` you will see only administrative areas with names containing Starbuck

```
1) Starbuckville, NY, USA
2) Starbuck, MN, USA
3) Starbuck, WA, USA
```

with `layers=venue` you will see only the venues by that name

```
1) Starbucks, Braunschweig, Germany
2) Starbucks, Islip, NY, USA
3) Starbucks, Austin, TX, USA
```
