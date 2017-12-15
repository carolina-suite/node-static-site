
# Static Site Setup #

When you first clone this repository, a sample project called "blog" is
included. If you want your own project to be called "blog", you could move
all the example posts somewhere else for reference or delete them and fill
the posts folder with your own posts. Or you could rename the sample project
and start a new one.

## New Project Contents #

To create a new project, create a directory with the following structure:

```
/
  assets/
  data/
    authors.yml
    categories.yml
  pages/
  posts/
  config.yml
```

Details on the relevant elements can be found elsewhere in the documentation,
but here is a summary:

* `assets/`: A directory for all public assets you want to include in your site.
* `data/`: Information about authors and categories for your site.
* `pages/`: A directory for your pages, organized however you want.
* `posts/`: A directory for your posts, organized however you want.
* `config.yml`: The configuration file for your site.
