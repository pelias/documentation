# Get started with Mapzen Search

[Mapzen Search](https://mapzen.com/projects/search) is a modern geographic search service based entirely on open-source tools and powered by entirely open data.

The [source code is open](https://github.com/pelias/pelias) to view, modify, and contribute to. It's called Pelias, an experimental, community focused geocoder from Mapzen. Pelias is available for free and licensed for both commercial and non-commercial use.

With Mapzen Search you can transform the natural language that we use to describe places in to geographic coordinates that computer systems can understand. You can also do the opposite and turn a latitude and longitude values in to a list of nearby places.

Mapzen Search can be used to:
> - quickly localize your users so they can discover locally relevant content.
> - provide a super-fast typeahead solution which feels intuitive for non technical users.
> - improve your database by adding geographic columns, such as `home_city` and `country` to your users table.
> - store numeric co-ordinate data instead of strings, for later use in reporting, analytics and machine learning.
> - improve existing geographic data by augmenting it with information about the enveloping `country`, `city` or `state`.

Mapzen Search offers:
- Forward Geocoding for Addresses + Venues: Used to find a particular place based on the rules of an address, or the name of a landmark or business
- Forward Coarse Geocoding for Neighbourhoods, Localities, regions, and countries: Used to find and localize a service to a particular area or region. Searches only for these places, but with worldwide coverage
- Restricting searches to a known area or radius
- Focusing a search: Searches all known places, but prioritizes places closer to the user (when the user's current location or approximate location is known)
- Autocomplete searches for forward geocoding: Allows a developer to build interfaces where an end-user can search for places and match against Mapzen Search's data in real-time
- Limiting results to a particular country: Allows the scoping of results to a particular country
- Reverse geocoding addresses + venues: Tries to find the name/address of the closest matching place to a geographic coordinate pair (a longitude and latitude). This can be used to take abstract location data (e.g. an end-user's device location) and find the closest address (often used in a weather or deliver app on someone's phone)
- Coarse reverse geocoding: Converts a geographic coordinate pair into the regional hiearchy for that particular place (e.g neighbourhood > locality (city/town) > Local Administrative Area (County, Prefecture) > Region (state/province) > country). This can be used to determine the general region of geographic data and can be quite useful in filtering for places in non-geographic databases that represent things that happen in places
