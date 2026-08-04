## Tagging releases with Semantic Release

We use the wonderful [Semantic Release](https://github.com/semantic-release/semantic-release)
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
