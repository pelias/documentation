`SEARCH`, or Looking for Places
=======

Geospacial search, frequently reffered to as **geocoding** is the process of matching an address to its corresponding geographic coordinates. There's nothing inherent in the words we use to describe an address that conveys its location at some coordinates on earth, i.e. *[lat,lon]*. Making the leap from text to coordinates is an intricate and challenging process. Lucky for you, we've done all the hard work and made it accessible via a really simple and free web service.

:school: :barber: :bank: :us: :house_with_garden: :hospital: ......... :computer:

## Search the World

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/world_all.png)

In the simplest search, all you provide is the text you'd like to match in any part of the location details. So to accomplish this, you just set the `text` parameter to whatever you want to find. Let's see a few examples.

#### Example time

Let's search for **YMCA**. Here's what you'd need to append to the base URL of the service, **search.mapzen.com**.

> [/v1/search?api_key={YOUR-KEY}&___text=YMCA___](https://search.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=YMCA)

Note the parameter values are set as follows:

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |

If you clicked on the query link above, you probably saw some cool **GeoJSON**, more on that later, with the following set of places in the results:

> * YMCA, Bargoed Community, United Kingdom
* YMCA, Nunspeet, Gelderland
* YMCA, Belleville, IL
* YMCA, Forest City, IA
* YMCA, Fargo, ND
* YMCA, Taipei, Taipei City
* YMCA, Orpington, Greater London
* YMCA, Frisco, TX
* YMCA, Jefferson, OH
* YMCA, Belleville, IL

Note that the results are spread out throughout the world. Since we haven't told the service anything about our current location or any other geographic context.

## Narrowing your Search...
Sometimes it's necessary to limit the search to a portion of the world. This can be useful if you're looking for places in a particular region, or country, or only want to look in the immediate viscinity of a user with a known location. Different usecases call for different specifications of this bounding region. We currently support three types: **rectangle**, **circle**, and **country**.

### ...to a specific country

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/world_country.png)

Sometimes your usecase might require that all the search results are from a particular country. Well, we've got that covered! You just need to set the `boundary.country` parameter value to the **alpha-2** or **alpha-3** [ISO-3166 country code](https://en.wikipedia.org/wiki/ISO_3166-1).

#### Example time
Let's search for **YMCA** again, but this time only in **Great Britain**. We'll need to know that the **alpha-3** code for **Great Britain** is ***GBR*** and set the parameters like this:

| parameter | value |
| :--- | :--- |
| `api_key` | [get yours here](https://mapzen.com/developers) |
| `text` | YMCA |
| `boundary.country` | ***GBR*** |

> [/v1/search?api_key={YOUR-KEY}&text=YMCA&___boundary.country=GBR___](http://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=YMCA&boundary.country=GBR)

Note that all the results reside within Great Britain:

> * YMCA, Bargoed Community, United Kingdom
* YMCA, Orpington, Greater London
* YMCA, Erdington, West Midlands
* YMCA, Malvern CP, United Kingdom
* YMCA, Ancoats, Greater Manchester
* YMCA, Carmarthen Community, United Kingdom
* YMCA, Halebank, Cheshire
* YMCA, Brightlingsea CP, United Kingdom
* YMCA, Lenton Abbey, Nottinghamshire
* YMCA, Old Clee, Lincolnshire

Now you can try the same search request with different country codes and see the results change.

> [/v1/search?api_key={YOUR-KEY}&text=YMCA&___boundary.country=USA___](http://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=YMCA&boundary.country=USA)

Results in the United States:

> * YMCA, Belleville, IL
* YMCA, Forest City, IA
* YMCA, Fargo, ND
* YMCA, Frisco, TX
* YMCA, Jefferson, OH
* YMCA, Belleville, IL
* YMCA, Chapel Hill, NC
* YMCA, West Lampeter, PA
* YMCA, Bremerton, WA
* YMCA, Westerly, RI


### ... to a rectangular region

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/world_rect.png)
 
In the case where you need to specify the boundary using a rectangle, all we need is a pair of coordinates on earth. Here are a few examples:

#### Example time
Let's say you wanted to find museums in the state of **Texas**. You'd need to set the `boundary.rect.*` parameter grouping to values representing the bounding box around **Texas**: min_lon=-106.65 min_lat=25.84 max_lon=-93.51 max_lat=36.5

***PRO TIP:*** *You can lookup a bounding box for a known region [here](http://boundingbox.klokantech.com/)

| parameter | value |
| :--- | :--- |
| `text` | YMCA |
| `boundary.rect.min_lat` | ***25.84*** |
| `boundary.rect.min_lon` | ***-106.65*** |
| `boundary.rect.max_lat` | ***36.5*** |
| `boundary.rect.max_lon` | ***-93.51*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&text=YMCA&___boundary.rect.min_lat=25.84&boundary.rect.min_lon=-106.65&boundary.rect.max_lat=36.5&boundary.rect.max_lon=-93.51___](https://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=YMCA&boundary.rect.min_lat=25.84&boundary.rect.min_lon=-106.65&boundary.rect.max_lat=36.5&boundary.rect.max_lon=-93.51)

Below is the region that will be searched. YMCA located outside of this highlighted region will **NOT** be included in the results. The museums returned will be sorted based on how well they matched the `text` parameter, in this case **museum**.

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/boundary_london.png)

##### Or you wanted to find an address, such as *28 Main Ave*, in New York City?

| parameter | value |
| :--- | :--- |
| `text` | 28 Main Ave |
| `boundary.rect.min_lat` | ***51.286839*** |
| `boundary.rect.min_lon` | ***-74.258904*** |
| `boundary.rect.max_lat` | ***40.477421*** |
| `boundary.rect.max_lon` | ***-73.700378*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&text=28 Main Ave&___boundary.rect.min_lat=51.286839&boundary.rect.min_lon=-74.258904&boundary.rect.max_lat=40.477421&boundary.rect.max_lon=-73.700378___](http://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=28 Main Ave&boundary.rect.min_lat=51.286839&boundary.rect.min_lon=-74.258904&boundary.rect.max_lat=40.477421&boundary.rect.max_lon=-73.700378)

 
#### ...circular region

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/world_circle.png)

Sometimes you don't have a rectangle to work with, but you you've got instead a point on earth, for example your location coordinates, and a maximum distance within which acceptable results can be located.

##### Find all *Starbucks* locations within a *3km* radius of a spot in *Madrid*
This time, we'll use the `boundary.circle.*` parameter grouping to get the job done. `boundary.circle.lat` and `boundary.circle.lon` should be set to your location in **Madrid**, while `boundary.circle.radius` should be set to the acceptable distance from that location. Note that the `boundary.circle.radius` parameter is always specified in **kilometers**.

| parameter | value |
| :--- | :--- |
| `text` | starbucks |
| `boundary.circle.lat` | ***40.414149*** |
| `boundary.circle.lon` | ***-3.703755*** |
| `boundary.circle.radius` | ***3*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&text=starbucks&___boundary.circle.lat=40.414149&boundary.circle.lon=-3.703755&boundary.circle.radius=3___](http://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=starbucks&boundary.circle.lat=40.414149&boundary.circle.lon=-3.703755&boundary.circle.radius=3)



#### Boundary issues

If you're going to attempt using multiple boundary types in a single search request, be aware that the results will come from the **intersection** of all the boundaries! So if you provide regions that don't overlap, you'll be looking at an empty set of results. You've been warned. Here's a visual of how it works:

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/overlapping_boundaries.gif)


## Prioritizing Nearby Places
Many usecases call for the ability to surface nearby results to the front of the list, while still allow important matches from further away to be visible. If that's your conundrum, here's what you've got to do.

### Focus on a point
Search will focus on a given point anywhere on earth, and results within **~100km** will be prioritized, thereby surfacing highest in the list. Once all the nearby results have been found, additional results will come from the rest of the world, without any further location-based prioritization.

![](https://github.com/dianashk/pelias-doc/blob/master/getting-started/focus_point.png)

#### Let's find *City Hall* near the center of *Washington, DC*

| parameter | value |
| :--- | :--- |
| `text` | city hall |
| `focus.point.lat` | ***38.8993488*** |
| `focus.point.lon` | ***-77.0145665*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&text=city hall&___focus.point.lat=38.8993488&focus.point.lon=-77.0145665___](http://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=city hall&focus.point.lat=38.8993488&focus.point.lon=-77.0145665)





- focus viewport api example (e.g. union square)
- focus point api example (NY union square)






## Results
Now that you've seen some examples of search, let's examine the results closer.
When requesting search results you will always get back `GeoJSON` results, unless something goes terribly wrong, in which case you'll get a really helpful error.

> _You can go [here](link.to.geojson.spec.com) to learn more about the `GeoJSON` data format specification.
> We'll assume you're familiar with the general layout and only point out some important details here._

You will find the following top-level structure to every response:

```javascript
{
  "geocoding":{...},
  "type":"FeatureCollection",
  "features":[...],
  "bbox":[...]
}
```

For the purposes of getting started quickly, let's keep our focus on the **features** property of the result.
This is where you will find the list of results that best matched your input parameters.

Each item in this list will contain all the information needed to identify it in human-readable format in the `properties` block, as well as computer friendly coordinates in the `geometry` property. Note the `label` property, which is a human-friendly representation of the place, ready to be displayed to an end-user.

```javascript
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
we had to split it out into its own section.
[Read more about the response format.](https://github.com/dianashk/pelias-doc/edit/master/getting-started/response.md)

## Result count

You may have noticed that there were **10** places in the results for all the previous search examples.
That's the _default_ number of results the API will return, unless otherwise specified. 

#### Want a *single* result?

Just set the `size` parameter to the desired number:

| parameter | value |
| :--- | :--- |
| `text` | stinky beach |
| `size` | ***1*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |

> [/v1/search?api_key={YOUR-KEY}&text=stinky beach&___size=1___](https://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=stinky beach&size=1)


#### How about *25* results?

| parameter | value |
| :--- | :--- |
| `text` | stinky beach |
| `size` | ***25*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |
 
> [/v1/search?api_key={YOUR-KEY}&text=stinky beach&___size=25___](https://pelias.bigdev.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=stinky beach&size=25)

 

# TBD

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



### **cApiTaliZAtioN**
You may have noticed already that cApiTaliZAtioN isn't a big deal for search.
You can type **yankee stadium** or **Yankee Stadium** or even **YANKEE STADIUM** if you're really excited about finding it. See for yourself by comparing the results of the previous search to the following:

| parameter | value |
| :--- | :--- |
| `text` | ***YANKEE STADIUM*** |
| `api_key` | [get yours here](https://mapzen.com/developers) |


> [/v1/search?api_key={YOUR-KEY}&___text=YANKEE STADIUM___](https://search.mapzen.com/v1/search?api_key={YOUR_API_KEY}&text=YANKEE STADIUM)


