`SEARCH`, or Looking for Places
=======

Geocoding is the process of matching an address to its corresponding geographic coordinates. There's nothing inherent in the words "10 Downing Street, London, United Kingdom" that conveys its location at the coordinates `[ 51.503396,  -0.12764 ]`. Instead this process [...].

:school: :barber: :bank: :us: :house_with_garden: :hospital: ......... :computer:


## The most basic scenario

You just set the `text` parameter to whatever you want to find.

### Let's say you wanted to find *Stinky Beach*

You would set the following parameters in your query url:

_____________________________________________________________________________________

| parameter | value |
| :--- | :--- |
| `text` | ***stinky beach*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&___text=stinky beach___](https://search.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=stinky beach)

_...go ahead, and click that link, we'll wait_
_____________________________________________________________________________________

### Maybe you'd like to find an address

Here's an example:

_____________________________________________________________________________________

| parameter | value |
| :--- | :--- |
| text | 30 west 26th street |
| api_key | [get yours here](https://mapzen.com/developers) |


> [/v1/search?api_key={YOUR-KEY}&___text=30 west 26th street___](https://search.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=30 west 26th street)
_____________________________________________________________________________________


### Or maybe a landmark, like *Yankee Stadium*
_____________________________________________________________________________________

| parameter | value |
| :--- | :--- |
| `text` | ***yankee stadium*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |


> [/v1/search?api_key={YOUR-KEY}&___text=yankee stadium___](https://search.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=yankee stadium)
_____________________________________________________________________________________


### **cApiTaliZAtioN**

You may have noticed already that cApiTaliZAtioN isn't a big deal for search.
You can type **yankee stadium** or **Yankee Stadium** or even **YANKEE STADIUM** if you're really excited about finding it. See for yourself by comparing the results of the previous search to the following:
_____________________________________________________________________________________

| parameter | value |
| :--- | :--- |
| `text` | ***YANKEE STADIUM*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |


> [/v1/search?api_key={YOUR-KEY}&___text=YANKEE STADIUM___](https://search.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=YANKEE STADIUM)
_____________________________________________________________________________________

## Results

Now that you've seen some examples of search, let's examine the results closer.
When requesting search results you will always get back `GeoJSON` results, unless something goes terribly wrong, in which case you'll get a really helpful error.

> _You can go [here](link.to.geojson.spec.com) to learn more about the `GeoJSON` data format specification.
> We'll assume you're familiar with the general layout and only point out some important details here._

You will find the following top-level structure to every response:

```
{
  "geocoding":{...},
  "type":"FeatureCollection",
  "features":[...],
  "bbox":[...]
}
```

For the purposes of getting started quickly, let's keep our focus on the **features** property of the result.
This is where you will find the list of results that best matched your input parameters.

Each item in this list will contain all the information needed to identify it in human-readable format in the `properties` block, 
as well as computer friendly coordinates in the `geometry` property. Note the `label` property, which is a human-friendly
representation of the place, ready to be displayed to an end-user.

```
{  
  "type":"Feature",
  "properties":{  
    "gid":"...",
    "layer":"address",
    "source":"osm",
    "name":"30 West 26th Street",
    "housenumber":"30",
    "street":"West 26th Street",
    "postalcode":"10010",
    "country_a":"USA",
    "country":"United States",
    "region":"New York",
    "region_a":"NY",
    "county":"New York County",
    "localadmin":"Manhattan",
    "locality":"New York",
    "neighbourhood":"Flatiron District",
    "confidence":0.9624939994613662,
    "label":"30 West 26th Street, Manhattan, NY"
  },
  "geometry":{  
    "type":"Point",
    "coordinates":[  
      -73.990342,
      40.744243
    ]
  }
}
```

There is so much more to tell you about the plethora of data being returned for each search,
we had to split it out into its own document.
[Read more about the response format.](https://github.com/dianashk/pelias-doc/edit/master/getting-started/response.md)

#### Result count

You may have noticed that there were **10** places in the results for our **Stinky Beach** search.
That's the _default_ number of results the API will return, unless otherwise specified. 

**Want a single result?**

| parameter | value |
| :--- | :--- |
| text | stinky beach |
| size | 1 |
| api_key | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&text=stinky beach&___size=1___](https://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=stinky beach&size=1)

**How about 25 results?**

| parameter | value |
| :--- | :--- |
| text | stinky beach |
| size | 25 |
| api_key | [get yours here](https://mapzen.com/developers) |
 
> [/v1/search?api_key={YOUR-KEY}&text=stinky beach&___size=25___](https://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=stinky beach&size=25)
 
 
### Narrowing your Search

All this time you've been searching the entire world...

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/world_all.png)

#### What if you need results from only...

Sometimes it's necessary to limit the search to a portion of the world. This can be useful if you're looking for places in a particular region, or country, or only want to look in the immediate viscinity of a user with a known location. Different usecases call for different specifications of this bounding region. We currently support three types: **rectangle**, **circle**, and **country**.

#### ...rectangular region

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/world_rect.png)
 
In the case where you need to specify the boundary using a rectangle, all we need is a pair of coordinates on earth. Here are a few examples:

**What if you wanted to find museums in London?**

| parameter | value |
| :--- | :--- |
| text | museum |
| boundary.rect.min_lat | 51.286839 |
| boundary.rect.min_lon | -0.51035 |
| boundary.rect.max_lat | 51.692322 |
| boundary.rect.max_lon | 0.33403 |
| api_key | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&text=museum&___boundary.rect.min_lat=51.286839&boundary.rect.min_lon=-0.51035&boundary.rect.max_lat=51.692322&boundary.rect.max_lon=0.33403___](https://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=tower&boundary.rect.min_lat=51.286839&boundary.rect.min_lon=-0.51035&boundary.rect.max_lat=51.692322&boundary.rect.max_lon=0.33403)

Below is the region that will be searched. Museums located outside of this highlighted region will **NOT** be included in the results. The museums returned will be sorted based on how well they matched the `text` parameter, in this case **museum**.

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/boundary_london.png)

**Or you wanted to find an address, such as 28 Main Ave., in New York City?**

| parameter | value |
| :--- | :--- |
| text | 28 Main Ave |
| boundary.rect.min_lat | 51.286839 |
| boundary.rect.min_lon | -74.258904 |
| boundary.rect.max_lat | 40.477421 |
| boundary.rect.max_lon | -73.700378 |
| api_key | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&text=28 Main Ave&___boundary.rect.min_lat=51.286839&boundary.rect.min_lon=-74.258904&boundary.rect.max_lat=40.477421&boundary.rect.max_lon=-73.700378___](http://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=28 Main Ave&boundary.rect.min_lat=51.286839&boundary.rect.min_lon=-74.258904&boundary.rect.max_lat=40.477421&boundary.rect.max_lon=-73.700378)

 
#### ...circular region

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/world_circle.png)
 
 
#### ...specific country

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/world_country.png)






# TBD
 
Boundaries are mutually exclusive

- Country (country code)
- Rectangle (bbox)
- Circle (point, radius)

All results outside of the area will be discarded.

## Focusing Results Near Your End-Users
Mapzen Search can let your users search globally, while providing them with search results for the closest matching places first. All you have to do is provide Mapzen Search with some location context about where the search should be focused.

In many cases, you may have the location of the user's device (either through Device Location APIs or the HTML5 Location API) or the area of a map that the user is looking at (the map viewport).

- focus viewport api example (e.g. union square)
- focus point api example (NY union square)


### Combining Focused Results with Boundaries
- Focus within country example

- Focus within large bounding box example (e.g. maximum distance a user is willing to travel)


## Selecting Datasets

Mapzen search offers two types of options for selecting the dataset you want back:
1. the originating source of the data (`sources`)
2. the kind of place you're looking to geocode against (`layers`)

### Selecting `Sources`
{list sources, not different licenses}
{combine source listing, e.g. open addresses + Geonames}

### Selecting Layers


|Layer Name|Represents|
|----|----|
|`venue`|Points of interest, businesses, things with walls|
|`address`|Places with a street address|
|`country`|Places that issue passports, nations, nation-states|
|`region`|States and provinces|
|`county`|Official governmental area; usually bigger than a locality, almost always smaller than a region|
|`locality`|Towns, hamlets, cities, etc.|
|`localadmin`|    |
|`neighbourhood`||
|`coarse`|Alias for simultaneously using `country`, `region`, `county`, `locality`, `localadmin`, and `neighbourhood`||

Our layers are derived from the hierarchy created by the gazetteer [Who's on First](https://github.com/whosonfirst/whosonfirst-placetypes/blob/master/README.md) and can be used to facilitate coarse geocoding.



### Coarse Geocoding (Neighborhoods, Cities, States, Countries)
There are many cases where you're after not a point, but a general area, whether it's the name of a town, a neighborhood, a county, or a country.



- Coarse general
- Select cities
- Select localities in a country (with boundary.country)


# Using Autocomplete & Search Together
For end-user applications, `/autocomplete` is intended to be used alongside `/search` to facilitate real-time feedback for user s
