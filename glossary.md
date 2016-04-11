# Mapzen Search terminology

## Common search and geocoding terms

- **geocoding** - the process of converting an address or the name of a landmark or business into a latitude, longitude pair. Sometimes referred to as forward geocoding. Use the `search` endpoint to do this.
- **reverse geocoding** - the process of converting a latitude, longitude pair into the name and address of the nearest place. Use the `reverse` endpoint to do this.
- **coarse geocoding** - adds regions and administrative boundaries to the geocoding process. Forward coarse geocoding limits a search to a particular region, while reverse coarse geocoding converts a geographic coordinate pair into the administrative boundary hierarchy containing it, such as a from the neighbourhood to the local administrative area, and on up to the country level.
- **gazetteer** - a directory of geographical places, with a stable identifier and some number of descriptive properties about that location.

## Mapzen Search API and developer terms

- **API endpoint** - an architectural style for accessing web resources through a URL. In Mapzen Search, available endpoints include `search`, `reverse`, and `autocomplete`. You can construct a URL to send queries and receive responses from Mapzen Search.
- **API key** - a code that identifies the developer account without providing a password. Mapzen Search requires an API key to interact with the search service.
- **autocomplete** - enables real-time feedback when entering text for a search, typically, where users start typing and a drop-down list appears where they can choose the term from the list below. Use the `autocomplete` endpoint to do this.
- **data source** - the datasets available to Mapzen Search. Only data sources that have open-source licenses are used.
- **focus** - option to make places closer to a particular location be prioritized and appear higher in the search results list. After all nearby results have been found, additional results will come from the rest of the world, without any further location-based prioritization.
- **layer** - types of places available to Mapzen Search and arranged in a hierarchy, such as an address, a venue, a neighbourhood, or a country.
- **`place` search** - get details on a place if you know the data source, the type of place (such as a venue or address), and the identification number.

## Other mapping terms

- **bounding box** - a rectangular area defined by two longitudes and two latitudes (the minimum and the maximum latitude, longitude).
- **cross-origin resource sharing (CORS)** - standard allowing a web browser and server to accept requests across domains. Without CORS, browsers may not allow cross-site requests because they could be malicious.
- **latitude** - the distance of a point north or south of the equator. In Mapzen Search, latitudes are expressed in decimal degrees.
- **longitude** - the distance of a point east or west. In Mapzen Search, longitudes are in relation to the Prime Meridian and expressed in decimal degrees.
