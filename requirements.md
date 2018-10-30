# Pelias Sofware requirements

This is the list of all software requirements for Pelias. We highly recommend using our
[Docker images](https://hub.docker.com/r/pelias/) to avoid having to even attempt to correctly
install all our dependencies yourself.

## Node.js

Most Pelias code is written in Node.js.

Version 8 or newer is required, version 10 is recommended for improved performance.

Pelias generally only adds support for even numbered [LTS](https://github.com/nodejs/Release#release-schedule) Node.js versions.
However we gladly accept patches and bug reports regarding issues with any Node.js version that has not reached end-of-life.

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
