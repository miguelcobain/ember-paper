function vendorPrefixFunc(){
  var bodyStyle = document.body && document.body.style,
    vendorPrefix,
    vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;
  if (bodyStyle) {
    for (var prop in bodyStyle) {
      var match = vendorRegex.exec(prop);
      if (match){
        vendorPrefix = match[0];
        vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
        break;
      }
    }

    if (!vendorPrefix) {
      vendorPrefix = ('WebkitOpacity' in bodyStyle) && 'webkit';
    }
  }

  return vendorPrefix;
}

export default {
  vendorPrefix:vendorPrefixFunc()
};
