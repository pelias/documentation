# Pelias Software requirements

This is the list of all software requirements for Pelias. We highly recommend using our
[Docker images](https://hub.docker.com/r/pelias/) to avoid having to even attempt to correctly
install all our dependencies yourself.

## Node.js

Version 10 or Version 12

Version 12 is recommended for best performance.

Most Pelias code is written in Node.js, so this is one of the most core dependencies of the project.

Pelias generally only adds support for even numbered [LTS](https://github.com/nodejs/Release#release-schedule) Node.js versions.
However we gladly accept patches and bug reports regarding issues with any Node.js version that has not reached end-of-life.

We recommend you always use the _latest_ minor and patch release of whichever major release line you
choose.

We strive to support any minor or patch version of our supported major release lines of Node.js, but on occasion this may not be possible and we'll offer additional guidance.

## Elasticsearch

Version 6.8+ or 7.5+

We recommend the latest in the 6.8 release line.

The core data storage for Pelias is Elasticsearch, and Elasticsearch makes major breaking changes
from release to release, so it's important to track these versions carefully.

## SQLite

Version 3.11 or newer

Some components of Pelias need a relational database, and Elasticsearch does not provide good
relational support. We use SQLite in these cases since it's simple to manage and quite performant.

## Libpostal

Pelias relies heavily on the [Libpostal](https://github.com/openvenues/libpostal#installation)
address parser. Libpostal requires about 4GB of disk space to download all the required data.

## Windows Support

Pelias is not well tested on Windows, but we do wish to support it, and will accept patches to fix
any issues with Windows support.
