
# Authors #

Put data about your authors in `data/authors.yml`.

An author entry looks like this:

```yml
siteAdmin:
  name: Site Admin
  slug: site-admin
  imageUrl: /assets/images/kyoto.jpg
  twitterUrl: https://twitter.com
  facebookUrl: https://facebook.com
  bio: This is my personal little blurb
```

Authors must have a name and slug. The object key is how your reference the
object in post metadata and the author slug is how the author appears as
part of URLs.

Some themes respect other things such as imageUrl, etc.
