
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

For more details see the [docs](./docs/README.md).

## Files #

### `docs/` #

This is the documentation files for this repository.

### `lib/` #

This directory contains js files used by the build process for making the
output.

### `out/` #

This is where your output project will go when you run the build process.

### `projects/` #

Place your projects here. This repository comes with a sample project called
blog, but you can have any number of projects.

### `ref/` #

#### `ref/TEMPLATES.md` #

A reference file for the template hierarchy.

### `themes/` #

Themes go in here. Directories starting with an underscore are not themes,
and directories ending in `_book` are special themes just for book projects.

### `build.js` #

This is the file to run to execute the build process.

`node build <projectName>`

## Contributing #

Guide to contributing and updating this repo.

## Acknowledgements #

### Authors #

* John F Marion

### Built With #

### Other #
