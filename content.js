// /* Listen for messages */
// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//   alert("First: "+ document.getElementsByClassName("property__price")[0].innerText);
//     /* If the received message has the expected format... */
//     if (msg.text && (msg.text == "report_back")) {
//         /* Call the specified callback, passing
//            the web-pages DOM content as argument */
//     sendResponse(document.getElementsByClassName("property__price")[0].innerText);
//     }
// });
// var fromDOM = $('h1.name').text();
console.log("LOG");
document.body.bgColor='blue';
getInfo();

function getInfo(){
  // console.log("---" + info);
  document.body.bgColor='red';
  console.log("LOL");
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
// // alert("IM IN CONTENT.JS");
// chrome.runtime.sendMessage({method:'setTitle',title:fromDOM});
