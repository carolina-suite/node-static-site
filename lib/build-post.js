
var moment = require('moment');

function buildPost(postData) {
  if (postData.hasOwnProperty('date')) {
    postData.date = moment(postData.date);
  }
  else {
    postData.date = moment();
  }
  postData.permalink = `/${postData.date.format("YYYY[/]MM[/]DD")}/${postData.slug}/`;
  return postData;
}

module.exports = buildPost;
