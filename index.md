[Mapzen Search](https://mapzen.com/projects/search) is a modern, geographic search service based entirely on open-source tools and powered entirely by open data. To start integrating Mapzen Search to your apps, you need a [developer API key](api-keys-rate-limits.md). You might use this functionality in any app that has a geographic element, including ones that deliver goods, locate hotels or venues, or even provide local weather forecasts.

Through a process known as [geocoding](search.md), Mapzen Search allows you to use natural language to find a particular place by entering an address or the name of a landmark or business, and then translates the result in to the geographic coordinates used by computers. Mapzen Search accesses [global databases](data-sources.md) of place names and locations, but you can receive more locally relevant search results by limiting the search to a particular radius around a location (such as a cell phone), region, or country. With text [autocompletion capabilities](autocomplete.md), you can search for places and match against Mapzen Search data in real-time.

Mapzen Search also enables the opposite workflow, known as [reverse geocoding](reverse.md), to transform latitude and longitude values in to a list of places. This process attempts to find the name and address of the place nearest a longitude and latitude pair. For example, you can click a position on the map to learn which business is located there.

## Features of Mapzen Search

- Forward geocoding to find a place by searching for an address or name
- Reverse geocoding to find what is located at a certain coordinate location
- Autocomplete to give real-time result suggestions without having to type the whole location
- Global coverage with prioritized local results
- Open-source software using open data sources
- Plug-in for embedding search in a Leaflet-based maps
- API with generous rate limits
