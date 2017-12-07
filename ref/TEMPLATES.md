
# Template Resolution #

The template resolution system is similar to Wordpress's.

This documentation describes what information is passed to the template engine,
but it is up to the template to honor everything.

In all cases where templates cannot be found, `index.pug` will be used.

## Home Page #

The selected Home Page template will be passed:

* `project`: The project configuration.
* `posts`: The most recent `project.pageSize` (default 10) paginated posts.
* `page`: The page specified in `project.homePage` if specified to a value other than "posts".
* `meta.frontPage` will be true.
* `meta.pageNumber` will be 1.
* `meta.nextPage` will be 2 if there are more post pages.
* `meta.isSingle` will be true a homePage is loaded.

If `front-page.pug` exists in the template, it is used. It may ignore the
specified frontPage.

Otherwise, if `project.homePage` is "posts", `home.pug` will be used if it
exists.

If `project.homePage` is not the string "posts", it will be assumed to be
a reference to a page. The template will be selected according to the rules
for a static page.

## Book #

A book chapter will use `book.pug` if possible.

## Posts Page #

The selected Posts template will be passed.

* `project`: The project configuration.
* `posts`: A list of  `project.pageSize` (default 10) paginated posts corresponding to the current page.
* `meta.pageNumber` will be 1.
* `meta.nextPage` will be 2 if there are more post pages.

If `home.pug` exists it will be used.

## Static Page #

The selected Page template will be passed.

* `project`: The project configuration.
* `page`: The selected page.
* `meta.isSingle` will be true.

If the page config specifies a specific template name, then `${templateName}.pug`
will be used if it exists.

Otherwise, if `${pageSlug}.pug` (where pageSlug is the name of the yml file minus
the extension) exists, it will be used.

Otherwise, if `page.pug` exists it will be used.

Otherwise, if `singular.pug` exists it will be used.

## Single Post #

The selected Post template will be passed.

* `project`: The project configuration.
* `post`: The selected post (paginated with references to previous and next).
* `meta.isFile` will be true if it is a special file post.
* `fileContents`: The bytes of the file if it is a special file post.
* `meta.isSingle` will be true.

If the `post.file` has a value and the custom user-supplied `post.fileType` also
has a value, then `${extension}-${fileType}.pug` will be used if it exists.
For example, if the file extension is `.jpg` and the supplied file type is
`profilePicture`, then the file `jpg-profilePicture.pug` will be used as the
template. If that template file is not found, then `${fileType}.pug` will be
used if it exists. Otherwise, to include if `fileType` is not specified, the
template `${extension}.pug` (example: `jpg.pug`) will be used if it exists.
Otherwise, `file.pug` will be used if it exists.

Otherwise (to included if `file` is not specified), `${templateName}.pug` will
be used if it exists and `post.templateName` is specified.

Otherwise, `single.pug` will be used if it exists.

Otherwise, `singular.pug` will be used if it exists.

## Archives #

The selected Archive template will be passed:

* `project`: The project configuration.
* `posts`: The current `project.archivePageSize` (default `project.pageSize` or 10) number of posts.
* `author` will be the author info if it is an Author Archive.
* `date` will be moment object to whatever specificity the archive page is if it is a Date archive.
* `category` will be the category info if it is a Category Archive.
* `tag` will be the tag info of the tag if it is a Tag Archive.
* `meta.archiveType` will be the type of archive.

If it is an author archive, `author-${author.slug}.pug` will be used if it exists.
Otherwise, `author.pug` will be used if it exists.

If it is a date archive, `date.pug` will be used if it exists.

If it is a category archive, `category-${category.slug}.pug` will be used
if it exists. Otherwise, `category.pug` will be used.

If it is a tag archive, `tag-${tag.slug}.pug` will be used if it exists.
Otherwise, `tag.pug` will be used.

In all other cases, `archive.pug` will be used if it exists.
