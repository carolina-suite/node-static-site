
# Pug Templates for Themes #

Pug templates for a theme go in the `templates/` directory of the theme.

When the build process is run, for each page that is going to be written
as part of the site, a template is chosen. See the
[Template Hierarchy](../ref/TEMPLATES.md) for details.

## Template Data #

### Values Passed to Templates #

The template will be passed the following values:

* `allData`: All the data for the site.
  * `allData.allPosts`: An array of post objects.
  * `allCategories`: An object representation of the site's `data/categories.yml` file.
  * `dateArchives`: An array of post collection objects each pertaining to a month of posts.
  * `authorArchives`: An object of auther slugs to author archive objects.
  * `categoryArchives`: An object of category slugs to category archive objects.
  * `tagArchives`: An object of tags to tag archive objects.
* `fileContents`: The read Buffer of the file for special file posts.
* `meta`: An object with various metadata.
  * `fileType`: The file type for special file posts.
  * `isFile`: Will be true if the page is for a special file post.
  * `isSingle` will be false if the page is for a collection of posts and it will be true if the page is for a single post or page.
  * `pageNumber`: The pagination page number if the page being rendered is part of a paginated archive.
* `posts`: An array of post objects that are intended to be displayed on the page.
* `project`: An object representation of the site's `config.yml`.
* `title`: The title of the page (derived from the archive type or post/page title).

### Object Schemas #

**Post/Page Object**

The post/page object is a representation of the YAML metadata for that
post or page with two additional keys:

* `text`: The HTML text rendered from the markdown file.
* `partialText` (post only): All text up to the first `<!--more-->` found.

**Category Objects**

A category object is the representation of the YAML for a category with
the added property `permalink`.

**Author Objects**

An author object is the representation of the YAML for an author with the
added property `permalink`.

**Archives**

Archives have the properties `slug`,`posts` (array of post objects) and
if applicable `author` (author object), `category` (category object),
or `tag` (tag object). Date archives have a `name` which is the string
representation of the month and year.
