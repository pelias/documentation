# Development Roadmap

Pelias has a long list of features and improvements we wish to make. This is
where we keep track of them!

As an open-source project, we don't usually have a timeline or estimate for
when items on our roadmap will be completed, but this document does serve as a
roughly priority order of major changes we hope to make.

## Fuzzy matching/typo correction for autocomplete

The Pelias autocomplete endpoint currently supports extremely limited typo
correction. However, this support is really a result of implementation details,
and not a result of a concerted effort.

By adding such a feature in a deliberate way we can greatly increase the
usability of the autocomplete endpoint.

## Integrate the new Spatial service for improved geospatial capabilities

Pelias currently has a component called the [PIP
service](https://github.com/pelias/pip-service) for performing point in polygon
calculations, but it's architecture and capabilities have become a huge
limiting factor for Pelias.

Over the past year, we have been working on a more powerful and efficient
replacement, the [Spatial service](https://github.com/pelias/spatial).

The spatial service will allow advanced functionality such as custom
administrative areas, using administrative data from OpenStreetMap, [returning
polygon data in Pelias responses](https://github.com/pelias/whosonfirst/issues/19),
or [adding postalcodes to more records based on a geometry](https://github.com/pelias/pelias/issues/111).

## Expanded input language support

Overall, Pelias has a solid foundation of language and internationalization
support. The Pelias data schema allows for records to have multiple name
values. These might include names in different languages, alternate names,
colloquial names, or common abbreviations (for example airport codes).

However, not all data importers currently add multiple names, even when they
are available in the source data. Furthermore, not all our queries use these
alternate names effectively.

Pelias currently supports querying for administrative areas in many languages on
the `/v1/search` endpoint.

For autocomplete, the queries are not currently able to utilize multiple
administrative area names.

Additionally, due to limitations in the polylines data format, no streets
imported from OSM include alternate names, even if they are available in OSM.
