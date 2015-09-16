Search
=======
Turning place names we can say into geographic coordinates computers can use
_____________________________________________________________________________________

Geocoding is the process of matching an address to its corresponding geographic coordinates. There's nothing inherent in the words "10 Downing Street, London, United Kingdom" that inherently conveys its location at the coordinates 51.503396, -0.12764. Instead this process [...].


# Using Search
## Looking For Places - Getting Started
{search text, global, no options}

`https://search.mapzen.com/v1/search?text={123 Fake Street, Springfield}&api_key={YOUR_API_KEY}`

- Response is GeoJSON FeatureCollection
 - The FeatureCollection is an ordered array, ranked in order of likleyhood
 - Use directly in your application or test at GeoJSON.io

## Sizing Your Results
 - Example: size=1 for batch geocoding
 - Example: size=40 to store lots of results

## Looking in a Particular Place (Using Boundaries)
[Means to limit the scope of where you're looking, and to look only within a particular area. This can be useful if you're looking for places in a particular region, or country, or only want to look in the immediate viscinity of a user with a known location.]

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

{layer options}


### Coarse Geocoding (Neighborhoods, Cities, States, Countries)
There are many cases where you're after not a point, but a general area, whether it's the name of a town, a neighborhood, a county, or a country.



- Coarse general
- Select cities
- Select localities in a country (with boundary.country)




# Using Autocomplete & Search Together
