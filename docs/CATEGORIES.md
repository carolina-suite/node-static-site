
# Categories #

Information about categories is located in the `data/categories.yml` file.
This file must exist.

Here is an example:

```yml
category1:
  name: Category 1
  slug: category1
category2:
  name: Category 2
  slug: category2
```

Each category must have a name and a slug. The category label should
usually be the same of the slug, but it is not required. The object label is
how the category is referenced by posts and the slug is how the category
will appear in URLs.

It is possible for other information to be added to categories and to write
themes that would use that information.
