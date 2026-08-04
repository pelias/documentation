# Pelias Project Infrastructure

The Pelias project utilizes lots of outside services to aid in development.

## Continuous Integration

All branches and pull requests opened on Pelias projects run our test suites through TravisCI.

This includes both unit tests, which run quickly, and the longer-running functional tests.

## Docker images

Any branch created in a Pelias GitHub repository will have several [Docker images created](https://github.com/pelias/ci-tools#build-docker-images).

The images will be tagged in the following formats, including the Pelias repository, the branch name, the date the image was built, and the full git commit hash.

```
pelias/repository:branch
pelias/repository:branch-date-commit
```

## Future work: full end to end testing

In the future, we hope to build systems for running complete end to end tests of a small Pelias build using our [docker projects](https://github.com/pelias/docker). For some ideas, see our discussion on [city acceptance tests](https://github.com/pelias/pelias/issues/718).
