# HTTP status codes

## Geocoding

The following status codes are returned from the geocoding service:

- `200 OK`: The request has succeeded.
- `400 Bad Request`: An input parameter was invalid. An error message is included in the response body with more details.
- `404 Not Found`: The URL is invalid or the path is no longer valid.
- `408 Request Timeout`: The Elasticsearch cluster took too long to respond.
- `500 Internal Server Error`: Generic fatal error.
- `502 Bad Gateway`: Connection was lost to the Elasticsearch cluster.

In all cases above, the response body will be valid GeoJSON.
