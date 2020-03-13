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

We use the wonderful [Semantic Release](https://github.com/semantic-release/semantic-release))
project to manage releasing new versions of all our projects.

Semantic Release looks for a [certain commit message format](https://github.com/semantic-release/semantic-release#commit-message-format) to decide when to release.

To help you decide which one to use, we'll list our general guidelines below. Feel free to include
these in your commit messages if you feel confident. If not, the core team will take care of it.

The general format is:

```
type(component): Message
```

Where `type` is one of the below commit message types, `component` is a description of what area of
the codebase affects, and `Message` is a normal commit message.

#### Chores

[Chores](https://blog.carbonfive.com/2020/02/24/what-are-these-chores-doing-in-my-backlog/) are
anything that don't affect the behavior of Pelias code, but help keep the project a healthy and
efficient place to work.

Another way to look at chores is they are changes to the codebase that would not warrant a new
release at all.

Good examples include:

- Fixing typos in documentation
- Updating settings in our CI infrastructure
- Removing dead or unused code

A commit message for a chore looks like this:

```
chore(CI): Remove deprecated Travis CI configuration option
```

#### Bug fixes

Bug fixes correct existing errors in the behavior of code.

A bugfix commit looks something like this:

```
fix(query): Ensure Elasticsearch queries handle empty value
```

#### Features

Features are the good stuff! They add new behavior that helps the project or improve how it behaves.

A feature commit usually looks like this:

```
feat(sql): Improve performance of SQL queries
```

#### Breaking Changes

Any of the above types of commits can also be marked as a breaking change. Breaking changes are used
to signal to users or modules that depend on the software that a backwards-incompatible change has
been made. In Pelias, this will trigger a new _major version_ release.

Breaking changes are created by ensuring that the term `BREAKING CHANGE:` occurs in the _body_ of
the commit message. This means you can't trigger a breaking change with something like `git commit
-m "my commit message"`, you have to run `git commit` and let it open your editor to write the
commit message.

Also, note the colon at the end of the string. We've often missed breaking changes because we only
wrote `BREAKING CHANGE`.

A breaking change commit looks like this:


```
feat(services): Add support for libpostal service

BREAKING CHANGE: this project now requires the Libpostal Service to be present in order to work
```

## Best practices for Pull Requests

#### Reach out to us first before doing a lot of work

Nothing makes us more sad than saying no to a pull request that someone worked hard on.

If you're ever in doubt about whether or not making a change is worthwhile, ask us first. Open an
issue, email the core team, etc.

We'll discuss with you what makes sense and why, give you context about our ideas for the project
going forward that might influence your work, and discuss any plans you have before you proceed.

We're also happy to review "draft" or unfinished PRs before they are done, so we can give input on
whether or not a particular approach is looking promising.

#### Keep your pull requests small

We always appreciate small pull requests that focus on a specific change. This makes it easier to
test and review.

Whenever possible, we support your efforts to split one large pull request into several smaller
ones.

#### Rebase against master

If other changes have been made while your Pull Request is in progress, please occasionally update
your PR to rebase against those new changes.

This helps ensure that we can review your changes effectively, that your changes will merge as
intended when the time comes, and, **most importantly**, that the project commit history is clean so
that its easy to figure out how and why changes came in when working in the future.

You can generally do this with `git rebase origin master`.

#### Allow changes to your pull requests

GitHub allows maintainers to make changes to a pull request created by another user. Please [enable
this
functionality](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) as we often want to make little changes to your pull request rather than go back and forth over them.
