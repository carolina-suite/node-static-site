
# Writing Posts #

Your posts go in the `posts` directory for the project. Posts are written in
Markdown and their metadata is written in YAML. Each post is therefore split
into two files:

* `{postSlug}.yml`: The metadata
* `{postSlug}.md`: The content

These files can be nested however you want inside of the posts directory, but
they must be in the same directory as each other.

## Post Metadata #

The metadata file should look something like this:

```yml
title: Category Post
date: 2017-11-05T14:37:00
category: childCategory
```

The `title` and `date` values are required. Note that the date will be
interpreted as the date of publication.
A category is optional, but the referenced category must be a property of
your `data/categories.yml` file. See more on [Categories](./CATEGORIES.md).

Most themes will also support a URL value for `featuredImage`.

Other values may be added and depending on the theme. Extra, unused values
do not hurt, so feel free to put comments in this file.

## Post Content #

Post content is written in
[GitHub-flavored Markdown](https://github.github.com/gfm/)
(with some extensions, such as tables).
Note that the title is part of the metadata, so your markdown file should
begin directly with the content of your post
(in most cases, the theme will separately place the title on the page).

See the posts in the sample project for some examples.
