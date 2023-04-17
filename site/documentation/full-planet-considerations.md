# Considerations for full-planet builds

Pelias is designed to work with data ranging from a small city to the entire planet. Small cities do
not require particularly significant resources and should work out of the box on even modest personal computers. However, full planet builds present many of their own challenges and require planning regarding compute infrastructure in order to have success.

Current [full planet builds](https://pelias-dashboard.geocode.earth) weigh in at over 600 million
documents, and require about 450GB total storage in Elasticsearch.

The best performance for full planet import comes when using a single machine with fast, local
NVMe SSDs, a fast internet connection for downloading data, and many CPUs for parallel processing.

To set expectations, a 36 core machine can complete a Pelias build in about 16 hours.

## Recommended processes

### Use Docker containers and orchestration

We strongly recommend using Docker (either through our provided
[pelias/docker](http://github.com/pelias/docker/) repository or otherwise) to
run Pelias. All our services include Dockerfiles and the resulting images are
pushed to [Docker Hub](https://hub.docker.com/r/pelias/) by our CI. Using these
images will drastically reduce the amount of work it takes to set up Pelias and
will ensure you are on a known good configuration, minimizing the number of
issues you will encounter.

Additionally, there are many great tools for managing container workloads. Simple ones like
[docker-compose](https://github.com/pelias/docker/) can be used for small installations, and more
complex tools like [Kubernetes](https://github.com/pelias/kubernetes) can be great for larger
installations. Pelias is extensively tested on both.

### Use separate Pelias installations for indexing and production traffic

The requirements for performant and reliable Elasticsearch clusters are very different for importing
new data compared to serving queries. It is _highly_ recommended to use one cluster to do imports,
save the resulting Elasticsearch index into a [snapshot](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html), and then load that snapshot into the cluster
used to perform actual geocoding.

### Shard count

Shard count is a balance between several factors. In general, higher shard
counts allow more parallelism, at the cost of slightly lower efficiency.

The latest [guidance from the Elasticsearch team](https://www.elastic.co/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster)
is that shards should be no larger than 50GB, but otherwise having as few
shards as possible is best. The most well tested full planet build
configuration is to use 12 shards. If you run performance comparisons at
different shard counts, be sure to share your findings!

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

### Elasticsearch Heap Size

The elasticsearch heap size can be set in docker-compose.yaml.

```
  elasticsearch:
    environment: [ "ES_JAVA_OPTS=-Xmx8g" ]
```

8GB is a well proven heap size for a full planet build. It meets the official [recommendations](https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html) from Elastic: big enough to fit all required data, but small enough to avoid long garbage collection times, and under the 31GB threshold where JVM memory usage becomes less efficient.

### Force merge your Elasticsearch indices

Pelias Elasticserach indices are generally static, as we do not recommend querying from and
importing to an Elasticsearch cluster simultaneously. In such cases, the highest levels of
performance can be achieved by [force-merging](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-forcemerge.html) the Elasticsearch index.

This process takes a while, around 5 hours in our experience, but for a snapshot that will be queried heavily later, it can be worth it.

## Recommended hardware

For a production ready instance of Pelias, capable of supporting a few hundred queries per second
across a full planet build, a setup like the following should be sufficient.

### Elasticsearch cluster for importing

The main requirement of Elasticsearch is that it has enough disk for a full build. 600GB across the
cluster is a good minimum. Increased CPU power is useful to achieve a higher
throughput for queries: a full planet build with all importers running in
parallel can easily utilize 16 cores or more.

### Elasticsearch cluster for querying

For queries, essentially the only bottleneck is CPU, although more RAM is helpful so Elasticsearch
data can be cached. On AWS, `c5` instances are significantly more performant than even the `c4`
instances, and should be used if high performance is needed.

_Example configuration:_ 2 `m5.2xlarge` (8 CPU, 32GB RAM) to serve 250 RPS

### Importer machine

The importers are each single-threaded Node.js processes, which require around 8GB of RAM
each with admin lookup enabled. Faster CPUs will help increase the import speed. Running multiple
importers in parallel is recommended if the importer machine has enough RAM and CPU to support them.

_Example configuration:_ 1 `c5.9xlarge` (36 CPU, 72GB RAM), running all importers in parallel

### Pelias services

Each Pelias service has different memory and CPU requirements. Here are some rough guidelines:

#### API

* RAM: 200MB per instance
* CPU: Single threaded, one instance can serve at least 500 RPS
* Disk: None

#### Placeholder
* RAM: 200MB per instance
* CPU: Single threaded, supports [clustering](https://nodejs.org/api/cluster.html)
* Disk: Requires about 5GB for a full planet SQLite DB

#### Libpostal
* RAM: 3GB per instance
* CPU: Multi-threaded, and extremely fast. A single core can serve 8000+ RPS
* Disk: about 4GB of data storage required

### PIP
* RAM: ~8GB
* CPU: 2 cores per instance recommended. Cannot effectively use more than 2 cores, but will serve at least 7000RPS
* Disk: A full planet Who's on First SQLite DB requires about 30GB

### Interpolation
* RAM: 3GB per instance currently (please follow our efforts to [un-bundle
libpostal](https://github.com/pelias/interpolation/issues/106) from the interpolation service)
* CPU: Single core. One instance can serve around 200RPS
* Disk: 50GB needed for a full planet interpolation dataset
