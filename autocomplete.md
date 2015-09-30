# Search with autocomplete

If you are building an end-user application, you can enable `/autocomplete` alongside the `/search` to add real-time feedback to help users find what they are looking for more easily, without requiring them to type the entire search term. Typically, the user starts typing and a drop-down list appears where they can choose the term from the list.

To build a query with autocomplete, you need [a free, API developer key](https://mapzen.com/developers) and a `text` parameter, representing what a user has typed into your application so far.  Optionally, you can specify the number of results to return and where the search should be centered.  

To avoid overloading the Mapzen Search service, allow a reasonable amount of time between user keystrokes before querying. Querying Mapzen Search on every keystroke would result in a number of requests that would not respond in time to display results before the next request was sent.  A recommended practice is to allow a delay of `x` milliseconds before sending the entered text.  

## Available parameters

To center your search based upon a geographical area, such as a map or the user's current location, supply the parameters `focus.point.lat` and `focus.point.lon`. For example, the following request is centered on northeastern France and is searching for `Strasb`:

https://search.mapzen.com/v1/autocomplete?api_key=search-XXXXXXX&text=strasb&focus.point.lat=48.581755&focus.point.lon=7.745843

By default, an autocomplete request returns 10 results, but this can be overridden up to a maximum of 40 results by including the `size` parameter. Specifying a `size` value greater than 40 will set the value to 40 and return a warning in the response metadata.  

The following parameters are available for a search query with autocomplete.

Parameter | Type | Required | Default | Example
--- | --- | --- | --- | ---
`api_key` | string | yes | none | [get yours here!](https://mapzen.com/developers)
`text` | string | yes | none | `Strasbour`
`focus.point.lat` | floating point number | yes | none | `48.581755`
`focus.point.lon` | floating point number | yes | none | `7.745843`
`size` | integer | no | `10` | `3`
