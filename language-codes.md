# Language codes

Search results can be returned in a different language (where available) by specifying a target language code when making the request.

The default behaviour is to return responses in the default locale of the dataset, in some cases this is the local dialect and for other datasets this defaults to English.

If you explicitly specify a language code during the request then the system will attempt to return place names in that language, in the case that the requested language is unavailable then the default language will be returned instead.

## Requesting a different language

Users can specify the target language via two methods, in both cases the BCP47 standard is used to specify the target language code.

BCP47 language tags can contain three parts:
   1. A language subtag (en, zh).
   2. A script subtag (Hant, Latn).
   3. A region subtag (US, CN).

At this time we only use the `language subtag` information to select the target language, this behaviour may change in the future as we import more data which contains text with `script subtag` and `region subtag` variants.

### Querystring

Specify the language code using a URL parameter named 'lang'.
> eg. /v1/search?lang=de-ch

### HTTP Header

Specify the language code using the `Accept-Language` HTTP request header.
> eg. Accept-Language: de-ch

### Precedence

Note that language codes are provided in the `querystring` take precedence over those provided in the `header`.

If either the `querystring` or `header` language codes are invalid then a warning will be emitted, we will attempt to use a valid code if one is available, otherwise we will fall back to default behaviour.
