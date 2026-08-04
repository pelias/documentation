<p align="center">
  <img height="100" src="https://raw.githubusercontent.com/pelias/design/master/logo/pelias_github/Github_markdown_hero.png">
</p>
<h3 align="center">A modular, open-source search engine for our world.</h3>
<p align="center">Pelias is a geocoder powered completely by open data, available freely to everyone.</p>
<p align="center">
<a href="https://en.wikipedia.org/wiki/MIT_License"><img src="https://img.shields.io/github/license/pelias/api?style=flat&color=orange" /></a>
<a href="https://hub.docker.com/u/pelias"><img src="https://img.shields.io/docker/pulls/pelias/api?style=flat&color=informational" /></a>
<a href="https://gitter.im/pelias/pelias"><img src="https://img.shields.io/gitter/room/pelias/pelias?style=flat&color=yellow" /></a>
</p>
<p align="center">
	<a href="https://github.com/pelias/docker">Local Installation</a> ·
        <a href="https://geocode.earth">Cloud Webservice</a> ·
	<a href="https://github.com/pelias/documentation">Documentation</a> ·
	<a href="https://gitter.im/pelias/pelias">Community Chat</a>
</p>
<details open>
<summary>What is Pelias?</summary>
<br />
Pelias is a search engine for places worldwide, powered by open data. It turns addresses and place names into geographic coordinates, and turns geographic coordinates into places and addresses. With Pelias, you’re able to turn your users’ place searches into actionable geodata and transform your geodata into real places.
<br /><br />
We think open data, open source, and open strategy win over proprietary solutions at any part of the stack and we want to ensure the services we offer are in line with that vision. We believe that an open geocoder improves over the long-term only if the community can incorporate truly representative local knowledge.
</details>

# Pelias Documentation

Here is where you can find all documentation for the [Pelias geocoder](https://github.com/pelias/pelias/).

## Table of Contents

### Core Features and API Documentation

#### Endpoint descriptions
- [Forward geocoding](search.md) (**/v1/search**) to find a place by searching for an address or name
- [Reverse geocoding](reverse.md) (**/v1/reverse**) to find what is located at a certain coordinate location
- [Autocomplete](autocomplete.md) (**/v1/autocomplete**) to give real-time result suggestions without having to type the whole location
- [Structured Geocoding](structured-geocoding.md) (**/v1/search/structured**) (*beta*) to find a place with data already separated into housenumber, street, city, etc
- [Place endpoint](place.md) (**/v1/place**) for details on a place returned from a previous query

_Not sure which Endpoint to use? We have a [page](search-workflows.md) for that_

#### Query parameters and options
- [Global coverage with prioritized local results](search.md#prioritize-results-by-proximity)
- [Language support](language-codes.md) for seeing results in different languages

#### Response Properties

- [Full list of response properties](response.md)
- [Confidence scores, match\_types and other tools for determining result quality](result_quality.md)

### Data Sources
- [Pelias data sources](data-sources.md)

### Running your own Pelias
- [Getting started](getting_started_install.md) Start here if you're looking to install Pelias
- [Pelias from scratch](pelias_from_scratch.md) More in-depth instructions for installing Pelias
- [Full planet build considerations](full_planet_considerations.md) Special information on running a full planet Pelias build
- [Service descriptions](services.md) A description of all the Pelias services, and when they are used
- [Software Requirements](requirements.md) A list of all software requirements for Pelias

### Pelias project development
- [Developer guide](/development/guide.md). Guide to submitting changes to Pelias code.
- [Project infrastructure](/development/project_infra.md). Guide to Pelias build tools, continuous integration, Docker image, etc.
- [Contributor Status](/development/contributor.md). Repeat contributors to Pelias are granted additional permissions, explained here!
- [Release notes](release-notes.md). See notable changes in Pelias over time
- [Development roadmap](development/roadmap.md). Plans for future improvements to Pelias. Read this to see what's coming and how you can help

### Misc
- [Glossary of common terms](glossary.md)
