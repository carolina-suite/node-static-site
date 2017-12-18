
# Shared Includes #

The themes directory has an `_includes` subdirectory. It has a few helper files.

## Bootstrap Helper Files #

**`_includes/bootstrap/head.pug`**

This header file includes the DOCTYPE and head of a page.
It sets the title approriately and links to
`theme/assets/bootstrap.min.css` and
`theme/assets/font-awesome/css/font-awesome.min.css`. It assumes that those
files exist in any theme using them. See some of the bootstrap themes for
examples.

**`_includes/bootstrap/script.pug`**

This file references all the JS files needed for Bootstrap to work.
It assumes that those
files exist in any theme using them. See some of the bootstrap themes for
examples.
