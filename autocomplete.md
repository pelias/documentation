# Search with autocomplete

If you are building an end-user application, you can enable `/autocomplete` alongside the `/search` to add real-time feedback to help users find what they are looking for more easily, without requiring them to type the entire search term. Typically, the user starts typing and a drop-down list appears where they can choose the term from the list.

To get started with autocomplete, you need only a developer key and a `text` parameter,  representing what a user has typed into your application so far.  Optionally, you can specify the number of results to return and where the search should be centered.  

### Size

The default number of results that an autocomplete request will return is 10, but this can be overridden using the `size` parameter.  The default value for `size` is `10` and the maximum value is `40`. Specifying a value greater than `40` will override to `40` and return a warning in the response metadata.  

### Focus.point.lat and Focus.point.lon

To center your search based upon a geographical area, such as a map or the user's current location, supply the parameters `focus.point.lat` and `focus.point.lon`.  The following request is centered on northeastern France and is searching for `Strasb`:

http://search.mapzen.com/v1/autocomplete?api_key=search-XXXXXXX&text=strasb&focus.point.lat=48.581755&focus.point.lon=7.745843


### Parameters

Parameter | Type | Required | Default | Example
--- | --- | --- | --- | ---
`api_key` | string | yes | none | [get yours here!](https://mapzen.com/developers)
`text` | string | yes | none | `Strasbour`
`focus.point.lat` | floating point number | yes | none | `48.581755`
`focus.point.lon` | floating point number | yes | none | `7.745843`
`size` | integer | no | `10` | `3`
