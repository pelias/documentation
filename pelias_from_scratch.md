# Installing Pelias from Scratch

These instructions will help you set up the Pelias geocoder from scratch. We strongly recommend
using our [Docker](http://github.com/pelias/docker/) tools for your first Pelias installation.

However, for more in-depth usage, or to learn more about the internals of Pelias, use this guide.

It assumes some knowledge of the command line and Node.js, but we'd like as many people as possible
to be able to install Pelias, so if anything is confusing, please don't hesitate to reach out. We'll
do what we can to help and also improve the documentation.

## Installation Overview

These are the steps for fully installing Pelias:
1. [Check that the hardware and software requirements are met](#system-requirements)
1. [Decide which datasets to use and download them](#choose-your-datasets)
1. [Download the Pelias code](#download-the-pelias-repositories)
1. [Customize Pelias Configuration file `~/pelias.json`](#customize-pelias-config)
1. [Install the Elasticsearch schema using pelias-schema](#set-up-the-elasticsearch-schema)
1. [Use one or more importers to load data into Elasticsearch](#run-the-importers)
1. [Install and start the Pelias services](#install-and-start-the-pelias-services)
1. [Start the API server to begin handling queries](#start-the-api)


## System Requirements

See our [software requirements](requirements.md) and insure all of them are installed before moving forward

### Hardware recommendations
* At a minimum 50GB disk space to download, extract, and process data
* 8GB RAM for a local build, 16GB+ for a full planet build. Pelias needs a little RAM for Elasticsearch, but much more for storing [administrative data](https://github.com/pelias/wof-admin-lookup) during import
* As many CPUs as you can provide. There's no minimum, but Pelias builds are highly paralellizable, so more CPUs will help make it faster.

## Choose your datasets
Pelias can currently import data from [four different sources](data-sources.md), using five different importers.

Only one dataset is _required_: [Who's on First](https://whosonfirst.org/). This dataset is used to enrich all data imported into Pelias with [administrative information](glossary.md). For more on this process, see the [wof-admin-lookup](https://github.com/pelias/wof-admin-lookup) documentation.

**Note:** You don't have to run the `whosonfirst` importer, but you do have to have Who's on First
data available on disk for use by the other importers.

Here's an overview of how to download each dataset.

### Who's on First

The [Who's on First](https://github.com/pelias/whosonfirst#downloading-the-data) importer can download all the Who's
on First data quickly and easily.

### Geonames

The [pelias/geonames](https://github.com/pelias/geonames/#installation) importer contains code and
instructions for downloading Geonames data automatically. Individual countries, or the entire planet
(1.3GB compressed) can be specified.

### OpenAddresses

The Pelias Openaddresses importer can [download specific files from
OpenAddresses](https://github.com/pelias/openaddresses/#data-download).

Additionally, the [OpenAddresses](https://results.openaddresses.io/) project includes numerous download options,
all of which are `.zip` downloads. The full dataset is just over 6 gigabytes compressed (the
extracted files are around 30GB), but there are numerous subdivision options.

### OpenStreetMap

OpenStreetMap (OSM) has a nearly limitless array of download options, and any of them should work as long as
they're in [PBF](http://wiki.openstreetmap.org/wiki/PBF_Format) format. Generally the files will
have the extension `.osm.pbf`. Good sources include [download.geofabrik.de](http://download.geofabrik.de/), [Nextzen Metro Extracts](https://metro-extracts.nextzen.org/), [Interline OSM Extracts](https://www.interline.io/osm/extracts/), and planet files listed on the [OSM wiki](http://wiki.openstreetmap.org/wiki/Planet.osm).
A full planet PBF file is about 41GB.

#### Street Data (Polylines)

To download and import [street data](https://github.com/pelias/polylines#download-data) from OSM, a separate importer is used that operates on a preprocessed dataset
derived from the OSM planet file.

## Installation

### Download the Pelias repositories

At a minimum, you'll need
1. [Pelias schema](https://github.com/pelias/schema/)
2. The Pelias [API](https://github.com/pelias/api/) and other Pelias services
3. Importer(s)


Here's a bash snippet that will download all the repositories (they are all small enough that you don't
have to worry about the space of the code itself) and install all the node module dependencies.

```bash
for repository in schema whosonfirst geonames openaddresses openstreetmap polylines api placeholder interpolation pip-service; do
	git clone https://github.com/pelias/${repository}.git # clone from Github
	pushd $repository > /dev/null                         # switch into importer directory
	npm install                                           # install npm dependencies
	popd > /dev/null                                      # return to code directory
done
```

### Customize Pelias Config

Nearly all configuration for Pelias is driven through a single config file: `pelias.json`. By
default, Pelias will look for this file in your home directory, but you can configure where it
looks. For more details, see the [pelias-config](https://github.com/pelias/config) repository.

#### Where on the network to find Elasticsearch

Pelias will by default look for Elasticsearch on `localhost` at port 9200 (the standard
Elasticsearch port).
Take a look at the [default config](https://github.com/pelias/config/blob/master/config/defaults.json#L2). You can see the Elasticsearch configuration looks something like this:

```js
{
  "esclient": {
  "hosts": [{
    "host": "localhost",
    "port": 9200
  }]

  ... // rest of config
}
```

If you want to connect to Elasticsearch somewhere else, change `localhost` as needed. You can
specify multiple hosts if you have a large cluster. In fact, the entire `esclient` section of the
config is sent along to the [elasticsearch-js](https://github.com/elastic/elasticsearch-js) module, so
any of its [configuration options](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html)
are valid.

#### Where to find the downloaded data files
The other major section, `imports`, defines settings for each importer.  `adminLookup` has it's own section and its value applies to all importers. The defaults look like this:

```json
{
  "imports": {
    "adminLookup": {
      "enabled": true
    },
    "geonames": {
      "datapath": "/mnt/pelias/geonames",
    },
    "openstreetmap": {
      "datapath": "/mnt/pelias/openstreetmap",
      "leveldbpath": "/tmp",
      "import": [{
        "filename": "planet.osm.pbf"
      }]
    },
    "openaddresses": {
      "datapath": "/mnt/pelias/openaddresses",
      "files": []
    },
    "whosonfirst": {
      "datapath": "/mnt/pelias/whosonfirst"
    },
    "polyline": {
      "datapath": "/mnt/pelias/polyline",
      "files": []
    }
  }
}
```

Note: The datapath must be an _absolute path._
As you can see, the default datapaths are meant to be changed.

### Install Elasticsearch

Please refer to the [official 5.6 install docs](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/setup.html) for how to install Elasticsearch.

Be sure to modify the Elasticsearch [heap size](https://www.elastic.co/guide/en/elasticsearch/guide/2.x/heap-sizing.html) as appropriate to your machine.

Make sure Elasticsearch is running and connectable, and then you can continue with the Pelias
specific setup and importing. Using a plugin like [Sense](https://github.com/bleskes/sense) [(Chrome extension)](https://chrome.google.com/webstore/detail/sense-beta/lhjgkmllcaadmopgmanpapmpjgmfcfig?hl=en), [head](https://mobz.github.io/elasticsearch-head/)
or [Marvel](https://www.elastic.co/products/marvel) can help monitor Elasticsearch as you import
data.

### Set up the Elasticsearch Schema

Pelias requires specific configuration settings for both performance and accuracy reasons. Fortunately, now that your `pelias.json` file is configured with how to connect to Elasticsearch,
the schema repository can automatically create the Pelias index and configure it exactly as needed.

```bash
cd schema                      # assuming you have just run the bash snippet to download the repos from earlier
./bin/create_index
```
The Elasticsearch Schema is analogous to the layout of a table in a traditional relational database,
like MySQL or PostgreSQL. While Elasticsearch attempts to auto-detect a schema that works when
inserting new data, it doesn't do a great job. Pelias requires specific schema settings or it won't work at all.

### Run the importers

Now that the schema is set up, you're ready to begin importing data.

For each importer, you can start the import process with the `npm start` command:

```bash
cd importer_directory; npm start
```

Depending on how much data you've imported, now may be a good time to grab a coffee.
You can expect up to 7000 records per second per importer.

The order of imports does not matter. Multiple importers can be run in parallel to speed up the setup process.
Each of our importers operates independent of the data that is already in Elasticsearch.
For example, you can import OSM data without importing WOF data first.

#### Aside: When to delete the data already in Elasticsearch

If you have previously run a build, and are looking to start another one, it generally a good idea
to delete the existing Pelias index and re-create it. Here's how:

```bash
# !! WARNING: this will remove all your data from pelias!!
node scripts/drop_index.js      # it will ask for confirmation first
./bin/create_index
```

When is this necessary? Here's a guideline: when in doubt, delete the index, re-create it, and start
fresh.

This is because Elasticsearch has no analog to a schema migration like a relational database, and
all the importers start over when re-run.

The only time when restarting importers without deleting is recommended is if all the following conditions are true:
1. You are trying to re-import the exact same data again (for example, because the build failed, or
   you are testing changes to an importer)
2. The Pelias schema has not changed
3. You are not concerned with ensuring maximum performance. Elasticsearch
   internally does not actually perform updates: it deletes old versions of a
   record and creates a new one. So re-writing the same or similar documents
   repeatedly can create a larger Elasticsearch index that has slightly worse
   performance

## Install and start the Pelias Services

Pelias is made up of several different services, each providing specific functionality.

The [list of Pelias services](services.md) describes the functionality of each service, and can be
used to determine if you need to install that service. It also includes links to setup instructions
for each service.

When in doubt, install everything except the interpolation engine (it requires a long download and
build process).

### Configure `pelias.json` for services

The Pelias API needs to know about each of the other services available to it. Once again, this is
configured in `pelias.json`. The following section will tell the API to use all services running
locally and on their default ports.

```js
{
  "api": {
    "services": {
      "placeholder": {
        "url": "http://localhost:3000"
      },
      "libpostal": {
        "url": "http://localhost:8080"
      },
      "pip": {
        "url": "http://localhost:3102"
      },
      "interpolation": {
        "url": "http://localhost:3000"
      }
    }
  }
}
```

### Start the API

Now that the API knows how to connect to Elasticsearch and all other Pelias services, all that is
required to start the API is:

```
npm start
```

## Geocode with Pelias

Pelias should now be up and running and will respond to your queries.

For a quick check, a request to `http://localhost:3100` should display a link to the documentation
for handy reference.

*Here are some queries to try:*

[http://localhost:3100/v1/search?text=london](http://localhost:3100/v1/search?text=london): a search
for the city of London.

[http://localhost:3100/v1/autocomplete?text=londo](http://localhost:3100/v1/autocomplete?text=londo): another query for London, but using the autocomplete endpoint which supports partial matches and is intended to be sent queries as a user types (note the query is for `londo` but London is returned)

[http://localhost:3100/v1/reverse?point.lon=-73.986027&point.lat=40.748517](http://localhost:3100/v1/reverse?point.lon=-73.986027&point.lat=40.748517): a reverse geocode for results near the Empire State Building in New York City.

For information on everything Pelias can do, see our [documentation
index](README.md).

Happy geocoding!
