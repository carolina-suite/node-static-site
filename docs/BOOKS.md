
# Writing Books #

To make a book project, the project should have a `book` dir.
All references in `config.yml` are from the book dir.

The `config.yml` for a book should look like this:

```
title: My Book
description: This is my book.
theme: bsDoc
# if homePage is not "posts", it should be the slug of a page
homePage: welcome
pageSize: 2
menu:
  - title: Home
    link: /
  - title: Book
    link: /book/Part-1/Chapter-1/
  - title: GitHub
    link: https://github.com/
book:
  parts:
    - title: Part 1
      description: This is Part 1 of the book.
      chapters:
        - title: Introduction
          description: K
          file: basics/introduction.md
        - title: Chapter 1
          description: K
          file: basics/ch1.md
          sections:
            - title: Sec 1
              file: sections/sec1.md
              subsections:
                - title: Sec 1.1
                  file: sections/sec1-1.md
```

Parts must have chapters, but all other levels are optional and can include
a file and sub-parts.

The themes for books are separate from the themes for blog projects.
Themes for books end in `_book`.
