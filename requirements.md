# Pelias Sofware requirements

This is the list of all software requirements for Pelias. We highly recommend using our
[Docker images](https://hub.docker.com/r/pelias/) to avoid having to even attempt to correctly
install all our dependencies yourself.

## Node.js

Version 6 or newer

Most Pelias code is written in Node.js. Node.js 8 is recommended.
Node.js 10 is not as well tested with Pelias yet, but should offer notable performance increases and
may become the recommendation soon.

We will probably drop support for Node.js 6 in the near future, so that we can use the many features
supported only in version 8 and above.

## Elasticsearch

Version 2.3 or 2.4

The core data storage for Pelias is Elasticsearch. We recommend the latest in the 2.4 release line.

We do not _yet_ support Elasticsearch 5 or 6, but work is [ongoing](https://github.com/pelias/pelias/issues/461)

## SQLite

Version 3.11 or newerr

Some components of Pelias need a relational database, and Elasticsarch does not provide good
relational support. We use SQLite in these cases since it's simple to manage and quite performant.

## Libpostal

Pelias relies heavily on the [Libpostal](https://github.com/openvenues/libpostal#installation)
address parser. Libpostal requires about 4GB of disk space to download all the required data.

## Windows Support

Pelias is not well tested on Windows, but we do wish to support it, and will accept patches to fix
any issues with Windows support.
