# Pelias Developer Guide

So, you want to help out with code changes to Pelias? Great!

This guide is meant to help you make effective, efficient changes that can be
accepted into the Pelias project.

## General Guidelines

### Use our test suites to help you

All Pelias modules come with a test suite to help ensure your changes do not break existing
functionality. We encourage you to extend the test suites for new features or bug fixes you submit.

Generally, these test suites fall into two categories: unit tests and functional (sometimes called
end-to-end or integration) tests.

Unit tests should run in just a few seconds, while functional tests may take a few minutes.

You can always run just a projects unit tests with:

```
npm test
```

You can run the functional tests with one of the following, depending on the repository

```
npm run functional
npm run integration
npm run end-to-end
```

The functional tests may take a few minutes to run, which is why we've separated them out.

### Take advantage of our pre-commit hooks

Most of our repositories use the [pre-commit](https://www.npmjs.com/package/pre-commit) Node.js
module to run various checks before allowing you to commit your code. Please follow these pre-commit hooks!

Currently our pre-commit hooks generally test:

- That the unit tests pass
- That there are no missing or extraneous NPM dependencies
- That the code passes our linter rules.

Note that if you really need to, you can bypass them with `git commit --no-verify`. This can be
useful if you want to test something out real quick, but plan to clean it up later before submitting
the change.

### Releases are driven by commit messages

We manage Pelias releases through commit message contents using [Semantic Release](https://github.com/semantic-release/semantic-release).

If you'd like, you can help us make that task easier by following our [release
tagging guide](./tagging_releases.md). But don't worry too much about it, the core
team can always make any needed tags before merging your pull request.

## Best practices for Pull Requests

### Reach out to us first before doing a lot of work

Nothing makes us more sad than saying no to a pull request that someone worked hard on.

If you're ever in doubt about whether or not making a change is worthwhile, ask us first. Open an
issue, email the core team, etc.

We'll discuss what makes sense and why, give you context about our ideas for
the project going forward that might influence your work, and discuss any plans
you have before you proceed.

We're also happy to review "draft" or unfinished PRs before they are done, so we can give input on
whether or not a particular approach is looking promising.

### Keep your pull requests small

We always appreciate small pull requests that focus on a specific change. This makes it easier to
test and review.

Whenever possible, we support your efforts to split one large pull request into several smaller
ones.

### Rebase against master

If other changes have been made while your Pull Request is in progress, please occasionally update
your PR to rebase against those new changes.

This helps ensure that we can review your changes effectively, that your changes will merge as
intended when the time comes, and, **most importantly**, that the project commit history is clean so
that its easy to figure out how and why changes came in when working in the future.

You can generally do this with `git rebase origin master`.

### Allow changes to your pull requests

GitHub allows maintainers to make changes to a pull request created by another user. Please [enable
this
functionality](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) as we often want to make little changes to your pull request rather than go back and forth over them.

## Commonly used tools

As a large project with many smaller components, we try to keep the Pelias
development process as consistent as possible.

This section lists various tools and utilities that are common in Pelias. Where
possible, use these tools.

If one of these tools isn't suitable for a particular purpose, ideally we would
settle on a new option for the entire project.

| Functionality | Pelias Standard |
| --- | --- |
| Javascript Linting | [JSHint](https://github.com/jshint/jshint/) |
| Test framework | [Tape](https://github.com/substack/tape) |
| Node.js stream library | [through2](https://github.com/rvagg/through2) |
| General utility library | [lodash](https://github.com/lodash/lodash) |
| SQLite library | [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3) |

