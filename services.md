# Pelias services

A running Pelias installation is composed of several different services. Each service is well suited
to a particular task.

## Service Use Cases

Here's a list of which services provide which features in Pelias. If you don't need everything Pelias
does, you may be able to get by without installing and running all the Pelias services

| Service       | /v1/search   | /v1/autocomplete | /v1/reverse  | /v1/reverse (coarse) | Multiple language support (any endpoint) |
| ------        | -----        | -----            | ---------    | -------              | ----- |
| API           | **required** | **required**     | **required** | **required**         | **required** |
| Placeholder   | **required** |                  |              |                      | **required** |
| Libpostal     | **required** |                  |              |                      | |
| PIP           |              |                  | recommended  | **required**         | |
| Interpolation | optional     |                  |              |                      | |

## Descriptions

### [API](https://github.com/pelias/api)

This is the core of Pelias. It talks to all other services (if available), Elasticsearch, and
provides the interface for all queries to Pelias.

### [Placeholder](https://github.com/pelias/placeholder)

Placeholder is used specifically to handle the relational component of geocoding. Placeholder
understands, for example, that Paris is a city in a country called France, but that there is another
city called Paris in the state of Texas, USA.

Placeholder also stores the translations of administrative areas in multiple languages. Therefore it
is required if any support for multiple languages is desired.

Currently, Placeholder is used only for forward geocoding on the `/v1/search` endpoint. In the
future, it will also be used for autocomplete.

### [Libpostal](https://github.com/pelias/libpostal-service)

Libpostal is a library that provides an address parser using a statistical natural language processing
model trained on OpenStreetMap, OpenAddresses, and other open data. It is quite good at parsing
fully specified input, but cannot handle autocomplete very well.

The data required for Libpostal to run is around 3GB, and has to be loaded into memory, so this
service is fairly expensive to run, even for small installations.

Unlike the other Pelias services, we didn't actually write a Pelias Libpostal service.  We recommend
using the [go-whosonfirst-libpostal](https://github.com/whosonfirst/go-whosonfirst-libpostal)
service created by the [Who's on First](https://whosonfirst.org) team.

For convenience, we've packaged the go-whosonfirst-libpostal service [using Docker](https://github.com/pelias/libpostal-service)
in a way that fits in well with the rest of the Pelias Docker packages.

## [Point-in-Polygon (PIP)](https://github.com/pelias/pip-service)

The PIP service loads polygon data representing the boundaries of cities, states, regions, countries
etc into memory, and can perform calculations on that geometric data. Its used to determine if a
given point lies in a particular polygon. Thus, it's highly recommended for reverse geocoding.

## [Interpolation](https://github.com/pelias/interpolation)

The interpolation service combines street geometries with known addresses and address ranges, to
allow estimating the position of addresses that might exist, but aren't in existing open
data sources. It is only used by the `/v1/search` endpoint, but [autocomplete support may be added in
the future](https://github.com/pelias/interpolation/issues/131).
