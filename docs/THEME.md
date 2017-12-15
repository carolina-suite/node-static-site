
## Choosing a Theme #

Each site project must declare a theme, which corresponds to a directory under
`themes/`. Several themes are included, which are based on various Bootswatch
flavors of Bootstrap CSS. They have somewhat different features too, based on
what I felt like doing.

In the themes directory, look under each theme (ignore directories that start
with an underscore) and you should see a README file which explains how to
use the theme, what features it has, and what configuration values it respects.

Once you decide a theme, set the `theme` value in `config.yml`

If you know that you will not use a theme, you can safely delete the theme's
directory. Don't delete the directories that start with underscores, because
several themes depend on the files therein.

Additionally, any themes that end in `_book` are not designed for normal blogs
or content sites. They are specifically for book projects.
