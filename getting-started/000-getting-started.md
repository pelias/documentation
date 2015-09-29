Get started with Mapzen Search

Mapzen Search is a modern geocoding and place search service based on [Pelias](https://github.com/pelias/pelias), an experimental, open geocoder from [Mapzen](https://mapzen.com) and powered by open data. It's used to transform the way people talk about places - with names and addresses - into geographic coordinates, and to translate geographic coordinates into recognizable names of places.

Mapzen Search can be used to:
- geocode addresses, points of interest, neighbourhood, cities, and regions
- power real-time search autocomplete for places
- turn a list of addresses into coordinates that can be plotted on a map or computed
- Take location coordinates and turn them into human readable places, like an address
- find the neighbourhood, cities, states, and countries of location coordinates to quickly classify where your data is coming from

Mapzen Search offers:
- Forward Geocoding for Addresses + Venues: Used to find a particular place based on the rules of an address, or the name of a landmark or business
- Forward Coarse Geocoding for Neighbourhoods, Localities, regions, and countries: Used to find and localize a service to a particular area or region. Searches only for these places, but with worldwide coverage
- Restricting searches to a known area or radius
- Focusing a search: Searches all known places, but prioritizes places closer to the user (when the user's current location or approximate location is known)
- Autocomplete searches for forward geocoding: Allows a developer to build interfaces where an end-user can search for places and match against Mapzen Search's data in real-time
- Limiting results to a particular country: Allows the scoping of results to a particular country
- Reverse geocoding addresses + venues: Tries to find the name/address of the closest matching place to a geographic coordinate pair (a longitude and latitude). This can be used to take abstract location data (e.g. an end-user's device location) and find the closest address (often used in a weather or deliver app on someone's phone)
- Coarse reverse geocoding: Converts a geographic coordinate pair into the regional hiearchy for that particular place (e.g neighbourhood > locality (city/town) > Local Administrative Area (County, Prefecture) > Region (state/province) > country). This can be used to determine the general region of geographic data and can be quite useful in filtering for places in non-geographic databases that represent things that happen in places
