

getInfo();

function getInfo(){

  var info = {model:"500"};
  info.color = "grey";

  var scripts = document.getElementsByTagName('script');

  // Find the correct script tag containing all the data we want!
  for( i=0; i < scripts.length; i++){
    if (scripts[i].text.search('dataLayer') > 0 ){
        var t  = (scripts[i].innerHTML.slice(0,scripts[i].text.search('dataLayer.push'))).replace('dataLayer = ','');
        n = t.lastIndexOf(';');
        info.datalayer= JSON.parse(t.substring(0,n));
        break;
    }
  }

  return info;
}
