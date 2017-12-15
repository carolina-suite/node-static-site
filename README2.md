
# Static Site Starter #

It is the "static-site" template used by the
[Carolina CLI](https://github.com/carolina-suite/carolina-cli).

It is a starter template for a static site generation project. It supports
having multiple sites with various themes. It is primarily focused on building
blogs or content-based web pages. Support for "books" is experimental.

## Getting Started #

Use this repository as a starting point for a static sites project.

### Installation #

**Via Carolina**

`carolina new static-site {dirName}`

**Via Git**

`git clone https://github.com/carolina-suite/node-static-site {dirName}`

After pulling the repository, navigated into the new directory and run
`npm i` to install dependencies.

You should also create a directory called "out".

### Usage #

This starts with a project called "blog". To test it out, run `node build blog`.

This will create the output directory `out/blog/`.

To test it out in the browser, it is recommended that you globally
install `http-server`.

```bash
# install http-server globally if you don't have it
npm i -g http-server
# This will server the output directory at http://localhost:8080/
http-server ./out/blog/
```

## Docs #

Brief docs and/or link to long docs.

## Files #

Overview of files in the repo.

## Contributing #

Guide to contributing and updating this repo.

## Acknowledgements #

### Authors #

* John F Marion

### Built With #

### Other #
