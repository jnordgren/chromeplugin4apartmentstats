


// chrome.webRequest.onCompleted.addListener(function(details) {
//   /* Process the XHR response */
//   alert("Vi fångade något");
// }, {urls: ["<all_urls>"]});
//


/*Inject js to catch ajax data. kudos RobW st*/
/*Source: https://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script/9517879#9517879*/
var s = document.createElement('script');
s.src = chrome.extension.getURL('injection_script.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

//create a place where we can add info to DOMTree as a communication channel injected-> content->popup
var inject_div = document.createElement('div');
inject_div.id = 'special_l33t_inject_div';
inject_div.cssText = 'visibility:hidden'; //dont show it.
document.body.appendChild(inject_div);

document.addEventListener("DOMSubtreeModified", function() {
    // alert("DOMSubtreeModified fired!");
    if( document.getElementById('special_l33t_inject_div').innerHTML.length > 10 ){
      // alert("Nu har vi skopat upp data");
      chrome.runtime.sendMessage({
          type: 'closing_price',
          request: document.getElementById('special_l33t_inject_div').innerHTML
      }, function(data) {
          // Received message from background, pass to page
          var event = document.createEvent('Events');
          event.initEvent(EVENT_REPLY, false, false);
          transporter.setAttribute('result', JSON.stringify(data));
          transporter.dispatchEvent(event);
      });
    }
}, false);

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

  chrome.runtime.sendMessage({
      type: 'object_info',
      request: "object_info"
  }, function(data) {
      // Received message from background, pass to page
      var event = document.createEvent('Events');
      event.initEvent(EVENT_REPLY, false, false);
      transporter.setAttribute('result', JSON.stringify(data));
      transporter.dispatchEvent(event);
  });

  return info;
}
