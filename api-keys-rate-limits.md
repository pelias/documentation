# API keys and rate limits

## Obtain an API key

To use the Mapzen Search service, you must first obtain a free developer API key. Sign in at https://mapzen.com/developers to create and manage your API keys.

1. Go to https://mapzen.com/developers.
2. Sign in with your GitHub account. If you have not done this before, you need to agree to the terms first.
3. Create a new key for Mapzen Search, and optionally, give it a name so you can remember the purpose of the project.
4. Copy the key into your code.

## Rate limits
Because Mapzen Search is a free, shared service, there are limitations on the numbers of requests to prevent individual users from degrading the overall system performance.

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
Mapzen Search works over HTTPS, in addition to HTTP. You are strongly encouraged to use HTTPS for all requests, especially for queries involving potentially sensitive information, such as a user's location or search query.

## Content Delivery Network, Edge Caching, and Rate Limit Count
Mapzen Search uses an "edge cache" in order to serve frequently requested content to our users as quickly as possible. This affects the way we calculate hits against your rate limit, as queries that are served out of the edge cache do not count against your limit of Requests per Second or Requests per Day (though they are reflected in your [Developer's Dashboard](https://mapzen.com/developers/)).

An edge cache (also known as a "Content Delivery Network" or CDN) is a network of computers, geographically spread across the world, designed to shorten the physical distance data must travel from us to you so it can get there faster. If you've ever tried to access a common service on the other side of the world and wondered why its so slow, it's because the physical distance the information must travel is that much further. We use a content delivery network to help alleviate this effect and to limit the impact of common queries on our application servers.

When you send a request to Mapzen Search, it first goes to the CDN server that is the closest path from your internet service provider before its forwarded onto a Mapzen Search application server (you can see a [map of locations](https://www.fastly.com/network-map) from our CDN, [Fastly](https://www.fastly.com) to see where your requests are likely being sent). If it's the first time that CDN server has seen that request in several days (we update our cache at least once every 7 days), the CDN server then passes your API call on to one of our Mapzen Search application servers. When it comes back with a response to your API call, that nearby CDN server keeps a copy of that response around (minus any personal data to your application, like your API key). If you or another nearby user makes that same API call, you'll likely be sent to the same CDN server, which has kept a copy of the response in its local cache. From our offices in New York, this has the effect of shortening a query to Mapzen Search from 190ms to 21ms. Your speed improvements may vary.

What this means is, especially for common queries, like we see on `/autocomplete`, users will get a significant speed boost by sharing [...].

Because these cached queries are so much faster and don't increase the impact to our application servers, we do not count them as part of the 

We will do a "soft purge" of our cache at least once every 7 days as well as after every update to the service (//TODO DO WE DO THIS?).
