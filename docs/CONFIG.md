
## Configuration #

Each site's configuration is in the `config.yml` file. At a minimum, it should
have the following attributes:

```yml
title: My Blog
description: This is my blog.
theme: bw-sandstone
# if homePage is not "posts", it should be the slug of a page
homePage: home
pageSize: 5
CNAME: mysite.mydomain.com
menu:
  - title: Home
    link: /
  - title: About
    link: /pages/about/
```

The builder and themes assume that these values exist. Other values can be
added, however.

The next section will be about themes.

The `homePage` value should either be "posts" or it should be the filename of
a page.

`pageSize` is the number of posts to show in regular pagination.

The `menu` is used by most themes to populate a top-level links menu.

The `CNAME` value is optional, but it will be used to populate a CNAME file,
which can useful for custom domains with github.io "hosting".
