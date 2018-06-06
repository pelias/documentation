# Pelias Documentation

Here is where you can find all documentation for the [Pelias geocoder](https://github.com/pelias/pelias/).

## Table of Contents

### Core Features and API Documentation

#### Endpoint descriptions
- [Forward geocoding](search.md) (**/v1/search**) to find a place by searching for an address or name
- [Reverse geocoding](reverse.md) (**/v1/reverse**) to find what is located at a certain coordinate location
- [Autocomplete](autocomplete.md) (**/v1/autocomplete**) to give real-time result suggestions without having to type the whole location
- [Structured Geocoding](structured-geocoding.md) (**/v1/search/structured**) to find a place with data already separated into housenumber, street, city, etc
- [Place endpoint](place.md) (**/v1/place**) for details on a place returned from a previous query

_Not sure which Endpoint to use? We have a [page](search-workflows.md) for that_

#### Query parameters and options
- [Global coverage with prioritized local results](search.md#prioritize-results-by-proximity)
- [Language support](language-codes.md) for seeing results in different languages

#### Response Properties

- [Confidence scores, match\_types and other tools for determining result quality](result_quality.md)

### Data Sources
- [Pelias data sources](data-sources.md)

### Running your own Pelias
- [Pelias installation guide](https://github.com/pelias/pelias/blob/master/INSTALL.md)

### Pelias project development
- [Release notes](release-notes.md). See notable changes in Pelias over time

### Misc
- [Glossary of common terms](glossary.md)
