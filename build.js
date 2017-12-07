
var fs = require('fs-extra');
var path = require('path');

var argparse = require('argparse');
var marked = require('marked');
var moment = require('moment');
var pug = require('pug')
var yaml = require('yamljs');
var _ = require('underscore');

var buildPost = require('./lib/build-post');
var getTemplateName = require('./lib/find-template');
var walk = require('./lib/walk');

var parser = argparse.ArgumentParser();
parser.addArgument('project');
var args = parser.parseArgs();

var replacements = null;

var projectDir = path.join(__dirname, 'projects', args.project);
var projectConfig = yaml.load(path.join(projectDir, 'config.yml'));
var themeDir = path.join(__dirname, 'themes', projectConfig.theme);
var outputDir = path.join(__dirname, 'out', args.project);

// set projectConfig defaults if they do not exist
if (!projectConfig.hasOwnProperty('pageSize')) projectConfig.pageSize = 10;

// allow custom marked instance
if (fs.existsSync(path.join(projectDir, 'marked.js'))) {
  marked = require(path.join(projectDir, 'marked'));
}
if (fs.existsSync(path.join(projectDir, 'replacements.js'))) {
  replacements = require(path.join(projectDir, 'replacements'));
}

if (!fs.existsSync(outputDir))
  fs.mkdirSync(outputDir);

if (projectConfig.hasOwnProperty('CNAME')) {
  fs.writeFileSync(path.join(outputDir, 'CNAME'), projectConfig.CNAME);
}

// gather categories
var categories = {};
if (fs.existsSync(path.join(projectDir, 'data', 'categories.yml'))) {
  categories = yaml.load(path.join(projectDir, 'data', 'categories.yml'));
}
for (var prop in categories) {
  categories[prop].permalink = `/archives/category/${categories[prop].slug}/`;
}

// gather authors
var authors = {};
if (fs.existsSync(path.join(projectDir, 'data', 'authors.yml'))) {
  authors = yaml.load(path.join(projectDir, 'data', 'authors.yml'));
}
for (var prop in authors) {
  authors[prop].permalink = `/archives/author/${authors[prop].slug}/`;
}

// gather posts and tags
var posts = [];
var pages = [];
var tags = {};

if (fs.existsSync(path.join(projectDir, 'posts'))) {

  posts = [];

  var postsDirListing = walk(path.join(projectDir, 'posts'));
  for (var i = 0; i < postsDirListing.length; ++i) {

    var filePath = postsDirListing[i];
    if (!filePath.endsWith('.yml')) continue;
    var splitFilePath = filePath.split('/');

    // assign slug
    var fileName = splitFilePath[splitFilePath.length - 1];
    var slug = fileName.substring(0, fileName.length - 4);

    var postConfig = yaml.load(filePath);
    postConfig.slug = slug;

    // assign categories
    if (postConfig.hasOwnProperty('category')) {

      var currentCategory = categories[postConfig.category];
      var postCategories = [currentCategory];
      while (currentCategory.hasOwnProperty('parent')) {
        currentCategory = categories[currentCategory.parent];
        postCategories.unshift(currentCategory);
      }

      postConfig.categories = postCategories;
    }

    // extract tags and reassign
    if (postConfig.hasOwnProperty('tags')) {

      var postTags = [];
      for (var j = 0; j < postConfig.tags.length; ++j) {

        var currentTag = postConfig.tags[j];
        var tagSlug = currentTag.replace(/\s/g, '-').toLowerCase();

        if (!tags.hasOwnProperty(tagSlug)) {
          tags[tagSlug] = {
            name: currentTag,
            slug: tagSlug,
            permalink: `/archives/tag/${tagSlug}/`
          };
        }
        postTags.push(tags[tagSlug]);
      }

      postConfig.tags = postTags;
    }

    // assign author
    if (postConfig.hasOwnProperty('author')) {
      postConfig.author = authors[postConfig.author];
    }

    // assign text and partialText
    var postText = marked(fs.readFileSync(filePath.substring(0, filePath.length - 4) + '.md').toString());
    postConfig.text = postText;
    if (replacements) postText = replacements(postText)
    var splitText = postText.split('<!--more-->');

    postConfig.partialText = splitText[0];
    posts.push(buildPost(postConfig));
  }
}

if (fs.existsSync(path.join(projectDir, 'pages'))) {

  var pagesDirListing = walk(path.join(projectDir, 'pages'));
  for (var i = 0; i < pagesDirListing.length; ++i) {

    var filePath = pagesDirListing[i];
    if (!filePath.endsWith('.yml')) continue;
    var splitFilePath = filePath.split('/');

    // assign slug
    var fileName = splitFilePath[splitFilePath.length - 1];
    var slug = fileName.substring(0, fileName.length - 4);

    var pageConfig = yaml.load(filePath);
    pageConfig.slug = slug;

    // assign author
    if (pageConfig.hasOwnProperty('author')) {
      pageConfig.author = authors[pageConfig.author];
    }

    // assign text and partialText
    var pageText = marked(fs.readFileSync(filePath.substring(0, filePath.length - 4) + '.md').toString());
    if (replacements) pageText = replacements(pageText);
    pageConfig.text = pageText;
    pages.push(pageConfig);

    if (projectConfig.homePage != 'posts' && pageConfig.slug == projectConfig.homePage) {
      projectConfig.loadedHomePage = pageConfig;
    }
  }
}

posts = _.sortBy(posts, 'date').reverse();

// gather posts pages
var postPages = {};
var pageNumber = 1;

while (true) {

  var start = (pageNumber - 1) * projectConfig.pageSize;
  if (start >= posts.length) break;
  var thisPage = posts.slice(start, start + projectConfig.pageSize);

  postPages[pageNumber] = thisPage;
  ++pageNumber;
}

// build book
if (projectConfig.book) {
  for (var i = 0; i < projectConfig.book.parts.length; ++i) {
    var part = projectConfig.book.parts[i];
    part.slug = part.title.replace(/[\s\:]/g, '-');
    for(var j = 0; j < part.chapters.length; ++j) {
      var chapter = part.chapters[j];
      chapter.slug = chapter.title.replace(/[\s\:]/g, '-');
      chapter.partSlug = part.slug;
      chapter.link = `/book/${part.slug}/${chapter.slug}/`;
      if (chapter.hasOwnProperty('file')) {
        chapter.text = marked(fs.readFileSync(path.join(projectDir, 'book', chapter.file)).toString());
        if (replacements) chapter.text = replacements(chapter.text);
      }
      if (chapter.hasOwnProperty('sections')) {
        for (var k = 0; k < chapter.sections.length; ++k) {
          var section = chapter.sections[k];
          section.slug = section.title.replace(/[\s\:]/g, '-');
          if (section.hasOwnProperty('file')) {
            section.text = marked(fs.readFileSync(path.join(projectDir, 'book', section.file)).toString());
            if (replacements) section.text = replacements(section.text);
          }
          if (section.hasOwnProperty('subsections')) {
            for (var l = 0; l < section.subsections.length; ++l) {
              var subsection = section.subsections[l];
              subsection.slug = subsection.title.replace(/[\s\:]/g, '-');
              subsection.text = marked(fs.readFileSync(path.join(projectDir, 'book', subsection.file)).toString());
              if (replacements) subsection.text = replacements(subsection.text);
            }
          }
        }
      }
    }
    part.link = part.chapters[0].link;
  }
}

// build archives
var dateArchives = [];
var lastArchiveSlug = null;
var authorArchives = {};
var categoryArchives = {};
var tagArchives = {};

for (var i = 0; i < posts.length; ++i) {

  var post = posts[i];
  var archiveSlug = post.date.format('YYYY/MM');

  if (archiveSlug != lastArchiveSlug) {
    dateArchives.push({
      slug: archiveSlug,
      name: post.date.format("MMMM YYYY"),
      posts: []
    });
    lastArchiveSlug = archiveSlug;
  }
  dateArchives[dateArchives.length - 1].posts.push(post);

  if (post.author) {
    if (!authorArchives.hasOwnProperty(post.author.slug)) {
      authorArchives[post.author.slug] = {
        author: post.author,
        slug: post.author.slug,
        posts: []
      }
    }
    authorArchives[post.author.slug].posts.push(post);
  }

  if (post.hasOwnProperty('categories')) {
    for (var j = 0; j < post.categories.length; ++j) {
      if (!categoryArchives.hasOwnProperty(post.categories[j])) {
        categoryArchives[post.categories[j].slug] = {
          category: post.categories[j],
          slug: post.categories[j].slug,
          posts: []
        }
      }
      categoryArchives[post.categories[j].slug].posts.push(post);
    }
  }

  if (post.hasOwnProperty('tags')) {
    for (var j = 0; j < post.tags.length; ++j) {
      if (!tagArchives.hasOwnProperty(post.tags[j])) {
        tagArchives[post.tags[j].slug] = {
          tag: post.tags[j],
          slug: post.tags[j].slug,
          posts: []
        }
      }
      tagArchives[post.tags[j].slug].posts.push(post);
    }
  }
}

// copy assets from theme and project
fs.ensureDirSync(path.join(outputDir, 'theme'));
fs.copySync(path.join(themeDir, 'assets'),
  path.join(outputDir, 'theme/assets'));
if (fs.existsSync(path.join(projectDir, 'assets'))) {
  fs.copySync(path.join(projectDir, 'assets'),
    path.join(outputDir, 'assets'));
}

// build allData object
var allData = {};
allData.allPosts = posts;
allData.allCategories = categories;
allData.dateArchives = dateArchives;
allData.authorArchives = authorArchives;
allData.categoryArchives = categoryArchives;
allData.tagArchives = tagArchives;

// Create paginated blog posts
fs.ensureDirSync(path.join(outputDir, 'posts'));
fs.ensureDirSync(path.join(outputDir, 'posts', 'page'));

// build posts pages
for (var i = 1; postPages.hasOwnProperty(i); ++i) {

  var meta = { isSingle: false, pageNumber: i };
  if (postPages.hasOwnProperty(i + 1)) meta.nextPage = i + 1;

  var postsPageText = pug.renderFile(getTemplateName({
    type: 'posts',
    project: projectConfig
  }, themeDir), {
    allData: allData,
    meta: meta,
    posts: postPages[i],
    project: projectConfig
  });

  fs.ensureDirSync(path.join(outputDir, 'posts', 'page', '' + i));
  fs.writeFileSync(path.join(outputDir, 'posts', 'page', '' + i, 'index.html'),
    postsPageText);
}

// create pages
for (var i = 0; i < pages.length; ++i) {

  var meta = { isSingle: false }
  var pagePageText = pug.renderFile(getTemplateName({
    type: 'page',
    page: pages[i],
    project: projectConfig
  }, themeDir), {
    allData: allData,
    meta: meta,
    page: pages[i],
    project: projectConfig
  });

  fs.ensureDirSync(path.join(outputDir, 'pages', pages[i].slug));
  fs.writeFileSync(path.join(outputDir, 'pages', pages[i].slug, 'index.html'),
    pagePageText);
}

// create book
if (projectConfig.hasOwnProperty('book')) {
  for (var i = 0; i < projectConfig.book.parts.length; ++i) {
    var part = projectConfig.book.parts[i];
    for (var j = 0; j < part.chapters.length; ++j) {
      var chapter = part.chapters[j];
      var chapterText = pug.renderFile(getTemplateName({
        type: 'book',
        project: projectConfig
      }, themeDir), {
        activeChapter: chapter,
        book: projectConfig.book,
        title: chapter.title,
        project: projectConfig
      });
      fs.ensureDirSync(path.join(outputDir, 'book', part.slug, chapter.slug));
      fs.writeFileSync(path.join(outputDir, 'book', part.slug, chapter.slug, 'index.html'),
        chapterText);
    }
  }
}

// create posts
for (var i = 0; i < posts.length; ++i) {

  var meta = { isSingle: false }
  var fileContents = null;
  if (posts[i].isFile) {
    meta.isFile = true;
    meta.fileType = posts[i].fileType;
    fileContents = fs.readFileSync(path.join(projectDir, 'files', posts[i].file));
  }
  var postPageText = pug.renderFile(getTemplateName({
    type: 'post',
    post: posts[i],
    project: projectConfig
  }, themeDir), {
    allData: allData,
    fileContents: fileContents,
    meta: meta,
    post: posts[i],
    project: projectConfig
  });

  fs.ensureDirSync(path.join(outputDir, `${posts[i].date.format("YYYY[/]MM[/]DD")}/${posts[i].slug}/`));
  fs.writeFileSync(path.join(outputDir, `${posts[i].date.format("YYYY[/]MM[/]DD")}/${posts[i].slug}/`, 'index.html'),
    postPageText);
}

// create archives
for (var i = 0; i < dateArchives.length; ++i) {

  var meta = { archiveType: 'date', isSingle: false };
  var archive = dateArchives[i];

  var archivePageText = pug.renderFile(getTemplateName({
    archive: { type: 'date' },
    type: 'archive',
    project: projectConfig
  }, themeDir), {
    allData: allData,
    date: moment(archive.slug, 'YYYY/MM'),
    meta: meta,
    posts: archive.posts,
    project: projectConfig
  });

  fs.ensureDirSync(path.join(outputDir, 'archives', 'date', archive.slug));
  fs.writeFileSync(path.join(outputDir, 'archives', 'date', archive.slug, 'index.html'),
    archivePageText);
}
for (var prop in authorArchives) {

  var meta = { archiveType: 'author', isSingle: false };
  var archive = authorArchives[prop];

  var archivePageText = pug.renderFile(getTemplateName({
    archive: { type: 'author', author: archive.author },
    type: 'archive',
    project: projectConfig
  }, themeDir), {
    allData: allData,
    author: archive.author,
    meta: meta,
    posts: archive.posts,
    project: projectConfig
  });

  fs.ensureDirSync(path.join(outputDir, 'archives', 'author', archive.slug));
  fs.writeFileSync(path.join(outputDir, 'archives', 'author', archive.slug, 'index.html'),
    archivePageText);
}
for (var prop in categoryArchives) {

  var meta = { archiveType: 'category', isSingle: false };
  var archive = categoryArchives[prop];

  var archivePageText = pug.renderFile(getTemplateName({
    archive: { type: 'category', category: archive.category },
    type: 'archive',
    project: projectConfig
  }, themeDir), {
    allData: allData,
    category: archive.category,
    meta: meta,
    posts: archive.posts,
    project: projectConfig
  });

  fs.ensureDirSync(path.join(outputDir, 'archives', 'category', archive.slug));
  fs.writeFileSync(path.join(outputDir, 'archives', 'category', archive.slug, 'index.html'),
    archivePageText);
}
for (var prop in tagArchives) {

  var meta = { archiveType: 'tag', isSingle: false };
  var archive = tagArchives[prop];

  var archivePageText = pug.renderFile(getTemplateName({
    archive: { type: 'tag', tag: archive.tag },
    type: 'archive',
    project: projectConfig
  }, themeDir), {
    allData: allData,
    tag: archive.tag,
    meta: meta,
    posts: archive.posts,
    project: projectConfig
  });

  fs.ensureDirSync(path.join(outputDir, 'archives', 'tag', archive.slug));
  fs.writeFileSync(path.join(outputDir, 'archives', 'tag', archive.slug, 'index.html'),
    archivePageText);
}

// Create index.html
var indexMeta = { frontPage: true, pageNumber: 1, isSingle: false };

if (postPages.hasOwnProperty(2)) {
  indexMeta.nextPage = 2;
}

var indexHtmlText = pug.renderFile(getTemplateName({
    type: 'home',
    project: projectConfig
  }, themeDir), {
    allData: allData,
    meta: indexMeta,
    page: projectConfig.loadedHomePage,
    posts: postPages[1],
    project: projectConfig
  }
);
fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtmlText);
