# API keys and rate limits

## Get an API key

To use the Mapzen Search service, you must first get a free developer API key. Sign in at https://mapzen.com/developers to create and manage your API keys.

1. Go to https://mapzen.com/developers.
2. Sign in with your GitHub account. If you have not done this before, you need to agree to the terms first.
3. Create a new key for Mapzen Search, and optionally, give it a name so you can remember the purpose of the project.
4. Copy the key into your code.

## Rate limits
Because Mapzen Search is a free, shared service, there are limitations on the numbers of requests to prevent individual users from degrading system performance.

Mapzen Search allows you a maximum of:

- 6 requests per second
- 30,000 requests per day

If you need more capacity, contact [search@mapzen.com](mailto:search@mapzen.com). You can also set up your own instance of [Pelias](https://github.com/pelias/pelias), which has access to the same data used in Mapzen Search.

## Failing to provide an `api_key`
If you fail to supply the `api_key` parameter, the service will respond with the status code `403 Forbidden`:
```bash
{
  "meta": {
    "version": 1,
    "status_code": 403
  },
  "results": {
    "error": {
      "type": "KeyError",
      "message": "No api_key specified."
    }
  }
}
```

## Exceeding your limits
If you exceed your limits, the service will respond with the status code `429 Too Many Requests`:
```bash
{
  "meta": {
    "version": 1,
    "status_code": 429
  },
  "results": {
    "error": {
      "type": "QpsExceededError",
      "message": "Queries per second exceeded: Queries exceeded (6 allowed)."
    }
  }
}
```

## Security
Mapzen Search works over HTTPS and HTTP. You are strongly encouraged to use HTTPS for all requests, especially for queries involving potentially sensitive information, such as a user's location or search query.

## Caching to improve performance

Mapzen Search uses caching to serve commonly requested content as quickly as possible. An edge cache, also known as a content delivery network (CDN), is a network of computers, geographically spread across the world, designed to shorten the physical distance data must travel to you so it can get there faster. If you have ever tried to access a common service and found that it is slow, it may be because the information must travel a large physical distance. Mapzen Search uses a CDN to help reduce this effect and limit the impact of common queries on its application servers.

Queries that are served out of the edge cache do not count against your limit of queries per second or queries per day, although this is not reflected in your [dashboard](https://mapzen.com/developers/).

When you send a request to Mapzen Search, it first goes to the CDN server that is the closest path from your internet service provider before it is forwarded onto a Mapzen Search application server. Mapzen Search uses [Fastly](https://www.fastly.com) for its CDN; you can look at this [network map](https://www.fastly.com/network-map) to see where your requests are likely being sent. 

If your request is the first time that CDN server has received that request in several days (the Mapzen Search cache is updated at least once a week), the CDN server then passes your API call to one of the Mapzen Search application servers. When it comes back with a response to your API call, that nearby CDN server keeps a copy of that response around (minus any personal data to your application, including your API key). If you or another nearby user makes that same API call, you will likely be sent to the same CDN server, which has kept a copy of the response in its local cache. From tests in the Mapzen office in New York, this has the effect of shortening a query to Mapzen Search from 190ms to 21ms. Your speed improvements may vary, and they may vary from location to location, as requests from different places and different internet providers may be served by different edge cache servers.

Common searches, such as `/v1/search?text=new york`, often come back quickly for most users, and sometimes, not count toward your rate limit. This is especially useful with Autocomplete, where many places all start with the same few root letters, such as `new` as the start of `new york`, `newark`, and `new jersey`).

Unless you have made a particular API call right before, you won't know ahead of time whether it will be served from the edge cache. After you make an API call, you can get more information in the HTTP headers of the response. HTTP headers are embedded metadata that tells your browser (or other software) how to make sense of the request.

* `X-Cache` indicates if your request was served from the Mapzen Search application server (`MISS`) or the cache server (`HIT`). This header should be there for any query you make to the Mapzen Search API. Any query with `X-Cache: MISS` is a query that counts against your rate limit.
* `X-ApiaxleProxy-Qps-Left` is the number of queries per second remaining on your API key, and `X-ApiaxleProxy-Qpd-Left` is the remaining queries per day. These headers are only present when you see `X-Cache: MISS`. 
