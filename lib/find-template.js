
var fs = require('fs-extra');
var path = require('path');

function getTemplateName(data, themeDir) {

  if (data.type == 'search') {
    if (fs.existsSync(path.join(themeDir, 'templates/search.pug'))) {
      return path.join(themeDir, 'templates/search.pug');
    }
  }
  else if (data.type == 'posts') {
    if (fs.existsSync(path.join(themeDir, 'templates/home.pug'))) {
      return path.join(themeDir, 'templates/home.pug');
    }
  }
  else if (data.type == 'book') {
    if (fs.existsSync(path.join(themeDir, 'templates/book.pug'))) {
      return path.join(themeDir, 'templates/book.pug');
    }
  }
  else if (data.type == 'home') {
    if (fs.existsSync(path.join(themeDir, 'templates/front-page.pug'))) {
      return path.join(themeDir, 'templates/front-page.pug');
    }
    if (data.project.homePage != 'posts') {
      return getTemplateName({
        type: 'page',
        project: data.project,
        page: data.project.loadedHomePage
      }, themeDir);
    }
    if (data.project.homePage == 'posts') {
      if (fs.existsSync(path.join(themeDir, 'templates/home.pug'))) {
        return path.join(themeDir, 'templates/home.pug');
      }
    }
  }
  else if (data.type == 'page') {
    if (data.page.hasOwnProperty('template')) {
      if (fs.existsSync(path.join(themeDir, `templates/${data.page.template}.pug`))) {
        return path.join(themeDir, `templates/${data.page.template}.pug`);
      }
    }
    else {
      if (fs.existsSync(path.join(themeDir, `templates/page-${data.page.slug}.pug`))) {
        return path.join(themeDir, `templates/page-${data.page.slug}.pug`);
      }
    }
    if (fs.existsSync(path.join(themeDir, 'templates/page.pug'))) {
      return path.join(themeDir, 'templates/page.pug');
    }
    if (fs.existsSync(path.join(themeDir, 'templates/singular.pug'))) {
      return path.join(themeDir, 'templates/singular.pug');
    }
  }
  else if (data.type == 'post') {
    if (data.post.hasOwnProperty('file')) {

      var splitFile = data.post.file.split('.');
      var extension = splitFile[splitFile.length - 1];

      if (data.post.hasOwnProperty('fileType')) {
        if (fs.existsSync(path.join(themeDir, `templates/${extension}-${data.post.fileType}.pug`))) {
          return path.join(themeDir, `templates/${extension}-${data.post.fileType}.pug`);
        }
        if (fs.existsSync(path.join(themeDir, `templates/${data.post.fileType}.pug`))) {
          return path.join(themeDir, `templates/${data.post.fileType}.pug`);
        }
      }
      if (fs.existsSync(path.join(themeDir, `templates/${extension}.pug`))) {
        return path.join(themeDir, `templates/${extension}.pug`);
      }
      if (fs.existsSync(path.join(themeDir, `templates/file.pug`))) {
        return path.join(themeDir, `templates/file.pug`);
      }
    }
    if (data.post.hasOwnProperty('template')) {
      if (fs.existsSync(path.join(themeDir, `templates/${data.post.template}.pug`))) {
        return path.join(themeDir, `templates/${data.post.template}.pug`);
      }
    }
    if (fs.existsSync(path.join(themeDir, 'templates/single.pug'))) {
      return path.join(themeDir, 'templates/single.pug');
    }
    if (fs.existsSync(path.join(themeDir, 'templates/singular.pug'))) {
      return path.join(themeDir, 'templates/singular.pug');
    }
  }
  if (data.type == 'archive') {
    if (data.archive.type == 'author') {
      if (fs.existsSync(path.join(themeDir, `templates/author-${data.archive.author}.pug`))) {
        return path.join(themeDir, `templates/author-${data.archive.author}.pug`);
      }
      if (fs.existsSync(path.join(themeDir, `templates/author.pug`))) {
        return path.join(themeDir, `templates/author.pug`);
      }
    }
    if (data.archive.type == 'category') {
      if (fs.existsSync(path.join(themeDir, `templates/category-${data.archive.category}.pug`))) {
        return path.join(themeDir, `templates/category-${data.archive.category}.pug`);
      }
      if (fs.existsSync(path.join(themeDir, `templates/category.pug`))) {
        return path.join(themeDir, `templates/category.pug`);
      }
    }
    if (data.archive.type == 'tag') {
      if (fs.existsSync(path.join(themeDir, `templates/tag-${data.archive.tag}.pug`))) {
        return path.join(themeDir, `templates/tag-${data.archive.tag}.pug`);
      }
      if (fs.existsSync(path.join(themeDir, `templates/tag.pug`))) {
        return path.join(themeDir, `templates/tag.pug`);
      }
    }
    if (data.archive.type == 'date') {
      if (fs.existsSync(path.join(themeDir, 'templates/date.pug'))) {
        return path.join(themeDir, 'templates/date.pug');
      }
    }
    if (fs.existsSync(path.join(themeDir, 'templates/archive.pug'))) {
      return path.join(themeDir, 'templates/archive.pug');
    }
  }

  return path.join(themeDir, 'templates/index.pug');
}
module.exports = getTemplateName;
