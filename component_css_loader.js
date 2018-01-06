var fs = require('fs');
var loaderUtils = require('loader-utils');
var path = require('path');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  var query = loaderUtils.parseQuery(this.query);
  var ext = query.ext || 'styl';

  var componentFileName = path.basename(this.resourcePath);
  var componentExt = path.extname(componentFileName);
  if(componentExt === "") {
    return source;
  }
  var styleFileName = componentFileName.replace(componentExt, '.' + ext);
  var stylePath = this.resourcePath.replace(componentFileName, styleFileName);

  try {
    var stats = fs.statSync(stylePath);
    if (stats.isFile()) {
      return "require('./" + styleFileName + "');\n" + source;
    }
  } catch(e) {}

  return source;
};

