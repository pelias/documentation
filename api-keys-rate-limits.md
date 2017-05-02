# API keys and rate limits

_Note: This page is deprecated and has been removed from the documentation on https://mapzen.com/ as of May 2017. For more information, see the [Mapzen developer overview](https://mapzen.com/documentation/overview/)._

## Get started

The Mapzen Search service requires an API key. In a request, you must append your own API key to the URL, following `?api_key=`.

See the [Mapzen developer overview](https://mapzen.com/documentation/overview/) for more on API keys and rate limits.

## Caching to improve performance

Mapzen Search uses caching to serve commonly requested content as quickly as possible. An edge cache, also known as a content delivery network (CDN), is a network of computers, geographically spread across the world, designed to shorten the physical distance data must travel to you so it can get there faster. If you have ever tried to access a common service and found that it is slow, it may be because the information must travel a large physical distance. Mapzen Search uses a CDN to help reduce this effect and limit the impact of common queries on its application servers.

When you send a request to Mapzen Search, it first goes to the CDN server that is the closest path from your internet service provider before it is forwarded onto a Mapzen Search application server. Mapzen Search uses [Fastly](https://www.fastly.com) for its CDN; you can look at this [network map](https://www.fastly.com/network-map) to see where your requests are likely being sent.

If your request is not found in the current CDN cache, the CDN server then passes it to one of the Mapzen Search application servers. When it comes back with a response to your API call, the CDN server keeps a copy of that response (minus any personal data to your application, including your API key). If you or another nearby user makes the identical API call, you will likely be sent to the same CDN server, which has the response in its local cache. From tests in the Mapzen offices in New York, this has the effect of shortening a query from 190ms to 21ms. Your speed improvements may vary, as requests from other locations and internet providers may be served by different edge cache servers.

Through edge caching, common searches, such as `/v1/search?text=new york`, often come back quickly for most users. This is especially useful with Autocomplete, where many places start with the same few root letters, such as the `new` in `new york`, `newark`, and `new jersey`.

Unless you have recently made a particular API call, you will not know ahead of time whether it will be served from the edge cache. After you make an API call, you can get more information in the HTTP headers of the response. HTTP headers are embedded metadata that tells your browser (or other software) how to make sense of the request.

These header entries are most helpful to determine whether caching was used:

- `X-Cache` indicates if your request was served from the Mapzen Search application server (`MISS`) or the cache server (`HIT`). This header should be there for any query you make to the Mapzen Search API. Any query with `X-Cache: MISS` is a query that counts toward your rate limit.
- `X-ApiaxleProxy-Qps-Left` is the number of queries per second remaining on your API key, and `X-ApiaxleProxy-Qpd-Left` is the remaining queries per day. These headers are only present when you see `X-Cache: MISS`.
