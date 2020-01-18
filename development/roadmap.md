# Development Roadmap

Pelias has a long list of features and improvements we wish to make. This is
where we keep track of them!

As an open-source project, we don't usually have a timeline or estimate for
when items on our roadmap will be completed, but this document does serve as a
roughly priority order of major changes we hope to make.

## Solve the "postal cities" challenge

Pelias uses strict geometric boundary decisions to determine what city (and
other administrative areas) a record belongs to. For various reasons, the real
world is often not so clear cut.

Often, the city people expect to see for a given place has more to do with the
nuances of local postal service delivery than strict borders.

https://github.com/pelias/pelias/issues/396

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

## Fuzzy matching/typo correction for autocomplete

The Pelias autocomplete endpoint currently supports extremely limited typo
correction. However, this support is really a result of implementation details,
and not a result of a concerted effort.

By adding such a feature in a deliberate way we can greatly increase the
usability of the autocomplete endpoint.

## Support for returning polygon data

Pelias often returns records such as cities, states, countries, etc which have
polygons associated with them representing their boundaries. Pelias uses these
polygons for point-in-polygon lookups when necessary, but cannot currently send
these polygons in the response JSON so that users can use that geometry data.

https://github.com/pelias/whosonfirst/issues/19
