# Writing Acceptance Tests

One of the best ways to improve Pelias is to write tests that record desired behavior.

This can be for behavior that currently works as expected, to prevent future
regressions, or to aid in development of new features.

Pelias has a powerful, geocoding-specific acceptance test runner called the [fuzzy-tester](https://github.com/pelias/fuzzy-tester).

## Overview

The fuzzy-tester makes HTTP requests to a fully functional Pelias API, and
makes various assertions about the returned JSON responses.

Some of these features include:

 - Ensuring properties, such as `name`, `housenumber`, or `locality` match an expected value
 - Ensuring a specific result shows up high in the results
 - Ensuring a result is within a given distance of a coordinate
 - Testing an input against the autocomplete endpoint, one character at a time (as if it was being typed in)
 - Ignoring minor, geocoding-specific, differences in expected values (such as capitalization or common abbreviations)

## Getting Started

To get started, you first need to install the fuzzy-tester library. The easiest way is using [NPM](https://npmjs.com).

```shell
npm i pelias-fuzzy-tester
```

Next, you need a directory called `test_cases` where your tests will live.
```shell
mkdir -p test_cases
```

To configure where the fuzzy-tester will look for a running Pelias installation, edit `pelias.json` (usually in your home directory).
You will want a section that looks something like this:
```json
{
  "acceptance-tests": {
    "endpoints": {
      "mypelias": "http://my.pelias.instance"
    }
  }
}
```
Fill in the URL to the root path of your Pelias installation as you see fit.

Finally, you need a test suite, which contains one or more test cases. Fuzzy-tester test suites are JSON, with a flexible format.

A simple starting example looks like this:

```json
{
  "name": "My Test Suite",
  "tests": [{
    "in": {
      "text": "berlin"
    },
    "expected": {
      "properties": {
        "name": "Berlin",
        "country": "Germany"
      }
    }
  }]
}
```
Put this JSON in a file within the `test_cases` directory, for example `test_cases/my_test_suite.json`

Now, if you run `npx fuzzy-tester -e mypelias, you should see output like the following:

```
$ npx fuzzy-tester -e mypelias
Tests completed: 1/1 (retries: 0)
Tests for: https://api.geocode.earth/v1 (mypelias)

My Test Suite
  ✔ [0] "/v1/search?text=berlin"

Aggregate test results
Pass: 1
Improvements: 0
Fail: 0
Placeholders: 0
Regressions: 0
Took 579ms
Test success rate 100%

0 regressions detected. All good.
```

As you can see, the single test was executed, and (assuming your Pelias installation has data for Germany loaded), the test will pass.

## Expanding the tests

Lets say you are testing that Pelias can return many of the [cities named Berlin](https://en.wikipedia.org/wiki/Berlin_(disambiguation)) that exist in the world.

A reasonable next choice might be to test that we can find [Berlin, Connecticut](https://en.wikipedia.org/wiki/Berlin_(disambiguation)).

Add another entry to the array in the `tests` property, so that the full file looks like this:

```json
{
  "name": "My Test Suite",
  "tests": [{
    "in": {
      "text": "berlin"
    },
    "expected": {
      "properties": {
        "name": "Berlin",
        "country": "Germany"
      }
    }
  }, {
    "in": {
      "text": "berlin"
    },
    "expected": {
      "properties": {
        "name": "Berlin",
        "region": "Connecticut"
      }
    }
  }]
}
```

The output should now reflect that there are two tests:

```shell
$ npx fuzzy-tester -e mypelias
Tests completed: 1/1 (retries: 0)
Tests for: https://api.geocode.earth/v1 (mypelias)

My Test Suite
  ✔ [0] "/v1/search?text=berlin"
  ✔ [1] "/v1/search?text=berlin"

Aggregate test results
Pass: 2
Improvements: 0
Fail: 0
Placeholders: 0
Regressions: 0
Took 548ms
Test success rate 100%

0 regressions detected. All good.
```

### Adding a priority threshold

Returning results in a specific order is key with geocoding. The fuzzy-tester
can check whether a specific result is found no lower in results than a given
position using the `priorityThresh` parameter.

This parameter can be set as both a top level property in the test suite,
applying to every test in the test suite, or on any individual test case. In
that case the test case value overrides any set at the suite level.

The parameter should be set to the highest zero-indexed position that is deemed allowable.

For example, to ensure "Berlin, CT" is returned at least _second_ in the results, use `"priorityThresh": 1`.

Here's what _just_ the test case should look like after making that change:

```json
{
  "in": {
    "text": "berlin"
  },
  "expected": {
    "priorityThresh": 1,
    "properties": {
      "name": "Berlin",
      "region": "Connecticut"
    }
  }
}
```

Running the test suite again, it will now _fail_ because "Berlin, CT" is not returned second or higher.

```shell
$ npx fuzzy-tester -e mypelias
My Test Suite
  ✔ [0] "/v1/search?text=berlin"
  ✘ regression [1] "/v1/search?text=berlin": score 2 out of 3
  diff:
    priorityThresh is 1 but found at position 7

Aggregate test results
Pass: 1
Improvements: 0
Fail: 0
Placeholders: 0
Regressions: 1
Took 546ms
Test success rate 50%

FATAL ERROR: 1 regression(s) detected.
```

This test won't pass (at least as of this writing), because as it turns out there are a lot of Berlins.

There are many ways to resolve this, and in the real world we might add additional filtering parameters (such as `boundary.country`), use a less strict `priorityThresh`, or make changes to Pelias itself or the data it uses to improve the results.

However, for the purposes of showing off the fuzzy-tester's capabilities, we will mark this test as _expected to fail_.

### Recording expected failures

Testing a geocoder is more complicated than, for example, running a suite of
unit tests. For a variety of reasons, not all tests can pass all the time.

In order to get value out of test suites, while acknowledging that perfection
is impossible, fuzzy-tester test cases can be marked as expected to fail.

Expected failures won't fail the entire test run, so they're useful if the
fuzzy-tester is being run as part of a build process that doesn't allow
failures.

The "Berlin, CT" test can be marked as failing with `"status": "fail"`:

```json
{
  "status": "fail",
  "in": {
    "text": "berlin"
  },
  "expected": {
    "priorityThresh": 1,
    "properties": {
      "name": "Berlin",
      "region": "Connecticut"
    }
  }
}
```

Now, the output from `fuzzy-tester` is less frightening, even though the test still doesn't pass:

```shell
$ npx fuzzy-tester -e mypelias
Tests completed: 1/1 (retries: 0)
Tests for: https://api.geocode.earth/v1 (mypelias)

My Test Suite
  ✔ [0] "/v1/search?text=berlin"
  ✘ [1] "/v1/search?text=berlin": score 2 out of 3
  diff:
    priorityThresh is 4 but found at position 7

Aggregate test results
Pass: 1
Improvements: 0
Fail: 1
Placeholders: 0
Regressions: 0
Took 578ms
Test success rate 100%

0 regressions detected. All good.
```

Notably, the fuzzy-tester executable now returns a `0` exit code, so it won't
fail if run in a CI environment or anywhere else shell commands are expected to pass.

### Adding additional query parameters

The `in` property in a test case can take any parameter supported by Pelias.
Let see if we can make the "Berlin, CT" test pass by being a bit more specific:

```json
{
  "status": "fail",
  "in": {
    "text": "berlin",
    "layers": "localadmin",
    "boundary.country": "USA"
  },
  "expected": {
    "priorityThresh": 1,
    "properties": {
      "name": "Berlin",
      "region": "Connecticut"
    }
  }
}
```

The test now limits results to the `localadmin` layer, and only records from the United States.

Our previously failing test is now showing _improvement_:

```shell
$ npx fuzzy-tester -e mypelias
Tests completed: 2/2 (retries: 0)
Tests for: https://api.geocode.earth/v1 (mypelias)

My Test Suite
  ✔ [0] "/v1/search?text=berlin"
  ✔ improvement [1] "/v1/search?layers=localadmin&boundary.country=USA&text=berlin"

Aggregate test results
Pass: 1
Improvements: 1
Fail: 0
Placeholders: 0
Regressions: 0
Took 970ms
Test success rate 100%

0 regressions detected. All good.
```

Improvements are usually celebrated, for obvious reasons! They can be left
as-is, or to avoid future regressions, the test case status can be set back to `pass`.

### Asserting distance from a point

The fuzzy-tester can check that a given result is within a certain distance
from a point with the `coordinates` and `distanceThresh` properties:

Let's set a not quite close enough coordinate first, just to see the error message. Here's the test case:

```json
{
  "in": {
    "text": "berlin",
    "layers": "localadmin",
    "boundary.country": "USA"
  },
  "expected": {
    "priorityThresh": 4,
    "properties": {
      "name": "Berlin",
      "region": "Connecticut"
    },
    "coordinates": [ -72.7, 41.6 ]
  }
}
```

And the output:

```shell
$ npx fuzzy-tester -e mypelias
Tests completed: 2/2 (retries: 0)
Tests for: https://api.geocode.earth/v1 (mypelias)

My Test Suite
  ✔ [0] "/v1/search?text=berlin"
  ✘ regression [1] "/v1/search?layers=localadmin&boundary.country=USA&text=berlin": score 3 out of 4
  diff:
    'Berlin, CT, USA' is not close enough: distance is 6967m but should be under 500m

Aggregate test results
Pass: 1
Improvements: 0
Fail: 0
Placeholders: 0
Regressions: 1
Took 960ms
Test success rate 50%

FATAL ERROR: 1 regression(s) detected.
```

The default distance threshold for how close results should be is 500 meters.
This is probably a bit too strict when testing the location of a city.

City coordinates can and do vary over time as better centroids are chosen.
Let's pick a more accurate location and set a reasonable `distanceThresh` of 3
kilometers to avoid having a brittle test.

```json
{
  "in": {
    "text": "berlin",
    "layers": "localadmin",
    "boundary.country": "USA"
  },
  "expected": {
    "priorityThresh": 4,
    "distanceThresh": 3000,
    "properties": {
      "name": "Berlin",
      "region": "Connecticut"
    },
    "coordinates": [ -72.782, 41.611 ]
  }
}
```

Now our test should be back to passing.

### Ignoring insignificant differences using normalizers

Comparing expected values from tests with exact string matches is difficult.
Minor differences can cause tests to fail or become brittle, requiring
significant time updating acceptance tests because of unrelated changes in code
or data.

The fuzzy-tester includes
[normalizers](https://github.com/pelias/fuzzy-tester#normalizers) to account
for various geocoding-specific string differences that are not generally
relevant.

To show them off, let's first write a simple test case for an address:

```json
{
  "name": "Address Test",
  "tests": [{
    "in": {
      "text": "30 west 26 street, new york, ny"
    },
    "expected": {
      "properties": {
        "street": "w 26 street",
        "locality": "new york"
      }
    }
  }]
}
```

```shell
$ npx fuzzy-tester -e mypelias
Tests completed: 1/1 (retries: 0)
Tests for: https://api.geocode.earth/v1 (mypelias)

Address Test
  ✘ regression [0] "/v1/search?text=30 west 26 street, new york, ny": score 0 out of 2
  diff:
    street
      expected: w 26 street
      actual:   West 26th Street
    locality
      expected: new york
      actual:   New York

Aggregate test results
Pass: 0
Improvements: 0
Fail: 0
Placeholders: 0
Regressions: 1
Took 912ms
Test success rate 0%
```

Despite being clearly correct to human eyes, this test failed. Lets add some
normalizers so that the insignificant differences are removed:

```json
{
  "name": "Address Test",
  "normalizers": {
    "street": [ "toLowerCase", "removeOrdinals", "abbreviateDirectionals" ],
    "locality": [ "toLowerCase" ]
  },
  "tests": [{
    "in": {
      "text": "30 west 26 street, new york, ny"
    },
    "expected": {
      "properties": {
        "street": "w 26 street",
        "locality": "new york"
      }
    }
  }]
}
```

```shell
$ npx fuzzy-tester -e mypelias
Tests completed: 1/1 (retries: 0)
Tests for: https://api.geocode.earth/v1 (mypelias)

Address Test
  ✔ [0] "/v1/search?text=30 west 26 street, new york, ny"

Aggregate test results
Pass: 1
Improvements: 0
Fail: 0
Placeholders: 0
Regressions: 0
Took 587ms
Test success rate 100%

0 regressions detected. All good.
```

Now the tests pass, and will be more resilient against future minor changes in data.

### Where to go from here

Now that the basic functionality is out of the way, take a look at our existing test suites for ideas of what can be tested:

#### [Acceptance tests](https://github.com/pelias/acceptance-tests/)

Pelias acceptance tests are mostly hand-curated to cover representative
examples of all Pelias functionality, and should generally run with no
unexpected failures on an up to date full planet Pelias build.

#### [Fuzzy tests](https://github.com/pelias/fuzzy-tests/)

The Pelias fuzzy-tests repository, on the other hand, stores mostly
programmatically generated bulk tests.

Generally, we only look at the percentage of these tests that pass, and use
changes in that percentage to judge impact when evaluating changes.

The most useful test suites are for the
[capital cities of all countries](https://github.com/pelias/fuzzy-tests/blob/master/test_cases/capitalCities.json)
and a [list of major cities](https://github.com/pelias/fuzzy-tests/blob/master/test_cases/citySearch.json).

More test suites are always welcome!
