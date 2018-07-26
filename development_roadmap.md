# Development Roadmap

Pelias has a long list of features and improvements we wish to make. This is
where we keep track of them!

As an open-source project, we don't usually have a timeline or estimate for
when items on our roadmap will be completed, but this document does serve as a
roughly priority order of major changes we hope to make.

## Solve the "postal cities" challenge

Pelias uses strict geometric boundary decisions to determine what city (and
other administrative areas) a record belongs to. For various reasons, the real
world is not often so clear cut.

Often, the city people expect to see for a given place has more to do with the
nuonces of local postal service delivery than strict borders.

https://github.com/pelias/pelias/issues/396

## Improved Autocomplete

Pelias has recently made many improvements to the search endpoint (which
supports only completed inputs), but has not brought all of them to the
autocomplete endpoint. Some features to implement:

- Drop the requirement of commas to separate address components
- Better multi-language search support
- Improved handling of synonyms/abbreviations

## Elasticsearch 5 Support

Pelias is currently only compatible and well tested on Elasticsearch 2. While
the code changes required to support Elasticsearch 5 are minimal, testing and
validating Elasticsearch 5 as the default version is not complete and will
require significant work including testing full planet builds.

https://github.com/pelias/pelias/issues/461

## Improved importer speed

A full planet Pelias build currently generally takes 2-3 days. Many parts of
this import process can be sped up, and many more parts can be made more easily
parallelized.

In the near future, our target is for a full planet build to take less than 24
hours using under $100 of AWS EC2 instances.

## Expanded input language support

Overall, Pelias has a solid founation of language and internationalization
support. The Pelias data schema allows for records to have multiple name
values. These might include names in different langages, alternate names,
colloquial names, or common abbreviations (for example airport codes).

However, not all data importers currently add multiple names, even when they
are available in the source data. Futhermore, not all our queries use these
alternate names effectively.

Pelias currently supports querying for administrative areas in many languges on
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
polygons for point-in-polygon lookups when necessary, but cannot currnely send
these polygons in the response JSON so that users can use that geometry data.

https://github.com/pelias/whosonfirst/issues/19
