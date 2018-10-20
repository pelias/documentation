# Considerations for full-planet builds

Pelias is designed to work with data ranging from a small city to the entire planet. Small cities do
not require particularly significant resources and should be easy. However, full planet builds
present many of their own challenges.

Current [full planet builds](https://pelias-dashboard.geocode.earth) weigh in at around 550 million
documents, and require about 375GB total storage in Elasticsearch.

Fortunately, because of services like AWS and the scalability of Elasticsearch, full planet builds
are possible without too much extra effort. The process is no different, it just requires more
hardware and takes longer.

To set expectations, a cluster of 4 [r4.xlarge](https://aws.amazon.com/ec2/instance-types/) AWS
instances (30GB RAM each) running Elasticsearch, and one m4.4xlarge instance running the importers
and PIP service can complete a full planet build in about two days.

## Recommended processes

### Use Docker containers and orchestration

We strongly recommend using Docker to run Pelias. All our services include Dockerfiles and the
resulting images are pushed to [Docker Hub](https://hub.docker.com/r/pelias/) by our CI. Using these
images will drastically reduce the amount of work it takes to set up Pelias and will ensure you are
on a known good configuration, minimizing the number of issues you will encounter.

Additionally, there are many great tools for managing container workloads. Simple ones like
[docker-compose](https://github.com/pelias/docker/) can be used for small installations, and more
complex tools like [Kubernetes](https://github.com/pelias/kubernetes) can be great for larger
installations. Pelias is extensively tested on both.

### Use separate Pelias installations for indexing and production traffic

The requirements for performant and reliable Elasticsearch clusters are very different for importing
new data compared to serving queries. It is _highly_ recommended to use one cluster to do imports,
save the resulting Elasticsearch index into a snapshot, and then load that snapshot into the cluster
used to perform actual geocoding.

### Shard count

Historically, Mapzen Search has used 24 Elasticsearch shards for its builds. However, the latest
[guidance from the Elasticsearch team](https://www.elastic.co/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster) is that shards should be no larger than 50GB, but otherwise
having as few shards as possible is best. At [geocode.earth](https://geocode.earth) we are
experimenting with 12 shard builds, and may eventually move to 6. We would appreciate performance
feedback from anyone doing large builds.

The `elasticsearch` section of `pelias.json` can be used to configure the shard count.

```js
{
  "elasticsearch": {
    "settings": {
      "index": {
        "number_of_shards": "5",
      }
    }
  }
}
```

### Force merge your Elasticsearch indices

Pelias Elasticserach indices are generally static, as we do not recommend querying from and
importing to an Elasticsearch cluster simultaneously. In such cases, the highest levels of
performance can be achieved by [force-merging](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-forcemerge.html) the Elasticsearch index.

## Recommended hardware

For a production ready instance of Pelias, capable of supporting a few hundred queries per second
across a full planet build, a setup like the following should be sufficient.

### Elasticsearch cluster for importing

The main requirement of Elasticsearch is that it has lots of disk. 400GB across the
cluster is a good minimum. Increased CPU power is useful to achieve a higher throughput for queries,
but not as important as RAM.


### Elasticsearch cluster for querying

For queries, essentially the only bottleneck is CPU, although more RAM is helpful so Elasticsearch
data can be cached. On AWS, `c5` instances are significantly more performant than even the `c4`
instances, and should be used if high performance is needed.

_Example configuration:_ 4 `c5.4xlarge` (16 CPU, 32GB RAM) to serve 250 RPS

### Importer machine

The importers are each single-threaded Node.js processes, which require around 8GB of RAM
each with admin lookup enabled. Faster CPUs will help increase the import speed. Running multiple
importers in parallel is recommended if the importer machine has enough RAM and CPU to support them.

_Example configuration:_ 1 `c4.4xlarge` (16 CPU, 30GB RAM), running two parallel importers

### Pelias services

Each Pelias service has different memory and CPU requirements. Here are some rough guidelines:

#### API
RAM: 200MB per instance
CPU: Single threaded, one instance can serve around 500 RPS
Disk: None

#### Placeholder
RAM: 200MB per instance
CPU: Single threaded, supports [clustering](https://nodejs.org/api/cluster.html)
Disk: Requires about 2GB for a full planet index

#### Libpostal
RAM: 3GB per instance
CPU: Multi-threaded, but extremely fast. A single core can serve 8000+ RPS
Disk: about 2-3GB of data storage required

### PIP
RAM: ~6GB
CPU: 2 cores per instance recommended, which is enough to serve 5000-7000 RPS

### Interpolation
RAM: 3GB per instance currently (please follow our efforts to [un-bundle
libpostal](https://github.com/pelias/interpolation/issues/106) from the interpolation service)
CPU: Single core. One instance can serve around 200RPS
Disk: 40GB needed for a full planet interpolation dataset
