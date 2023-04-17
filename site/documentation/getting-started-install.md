## Getting started with Pelias

Looking to install and set up Pelias? You've come to the right place. We have several different
tools and pieces of documentation to help you.

### Installing for the first time?

We _strongly_ recommend using our [Docker](http://github.com/pelias/docker/) based installation for
your first install. It removes the need to deal with most of the complexity and dependencies of
Pelias. On a fast internet connection you should be able to get a small city like Portland, Oregon
installed in under 30 minutes.

### Want to go more in depth?

The Pelias docker installation should work great for any small area, and is great for managing the
different Pelias services during development. However, we understand not everyone can or wants to
use Docker, and that people want more details on how things work.

For this, we have our [from scratch installation guide](pelias-from-scratch.md)

### Installing in production?

By far the most well tested way to install Pelias is to use [Kubernetes](https://github.com/pelias/kubernetes).
Kubernetes is perfect for managing systems that have many different components, like Pelias.

We would love to add additional, well tested ways to install Pelias in production. Reach out to us
if you have something to share or want to get started.

### Doing a full planet build?

Running Pelias for a city or small country is pretty easy. However, due to the amount of data
involved, a full planet build is harder to pull off.

See our [full planet build guide](full-planet-considerations.md) for some recommendations on how to
make it easier and more performant.
