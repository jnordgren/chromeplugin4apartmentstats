// chrome.runtime.sendMessage({method:'getTitle'}, function(response){
//   document.getElementById('status').textContent = response
// });
// // Copyright (c) 2014 The Chromium Authors. All rights reserved.
// // Use of this source code is governed by a BSD-style license that can be
// // found in the LICENSE file.
// // Called when the user clicks on the browser action.
// console.log("IM HERE NOW");
// chrome.browserAction.onClicked.addListener(function() {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   // chrome.tabs.executeScript({
//   //   code: 'document.body.style.backgroundColor="red"'
//   // });
//
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(tabs[0].id, {file: "content.js"}, function(data) {
//       // Data is an array of values, in case it was executed in multiple tabs/frames
//       download(data[0], "download.html", "text/html");
//     });
//   });
//
// });
function getStatData(kommun,callback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var statUrl = 'http://www.maklarstatistik.se/usercontrols/statistik/LineChart.aspx?Months=24&LK=117&Main=V%C3%A4rmd%C3%B6&Extra1=8888&Extra2=8888&Typ=Boratterkurvdata'
  // var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
  //   '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var req = new XMLHttpRequest();

  req.open('GET', statUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  req.overrideMimeType('text/xml');

  req.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = req.responseXML;
    if (!response || !response || response.getElementsByTagName('set').length != response.getElementsByTagName('category').length || response.getElementsByTagName('category').length == 0) {
      console.log('SNetwork error.');

      return;
    }
    console.log(req);
    console.log("---->");
    console.log(response.getElementsByTagName('set')[0].getAttribute('value'));
    console.log(response.getElementsByTagName('category')[0].getAttribute('label'));

    var p = response.getElementsByTagName('set');
    var m = response.getElementsByTagName('category');

    var data = { labels:[], series:[]};
    var tmp = []
    for(i = 0; i<p.length; i++){
      tmp.push(parseFloat(p[i].getAttribute('value')));
      data.labels.push(m[i].getAttribute('label'));
    }
    data.series.push(tmp);

    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    console.log(data);

    callback(data);
  };
  req.onerror = function() {
    console.log('Network error.');
    console.log(req);
  };
  req.send();
}

function myAlert(){
    alert('hello world');
    // var data2 = getStatData('Österåker');
    getStatData('Österåker', function(data) {
      console.log(data);
      var options = {
        // showArea: true,
        width: 600,
        height: 200
      };
      // Create a new line chart object where as first parameter we pass in a selector
      // that is resolving to our chart container element. The Second parameter
      // is the actual data object.
      new Chartist.Line('.ct-chart', data,options);
    });
    // var data = {
    //   // A labels array that can contain any sort of values
    //   labels:   ['Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec','Jan' ,'Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec','Jan'],
    //   // Our series array that contains series objects or in this case series data arrays
    //   series: [
    //   [19442.60563,  20668.56471,        21748.77419,        22363.10526,        21643.41026,   21508.83099,     21376.48611,        22585.01064,        23599.36364,        24531.56962,
    //     24280.75342,
    //     23842.07317,
    //     23822.94444,
    //     25160.74783,
    //     25061.84298,
    //     25040.3,
    //     23871.41441,
    //     24450.61111,
    //     25417.77273,
    //     26061.10577,
    //     28112.56738,
    //     29868.2803,
    //     30866.37288,
    //     30133.57377]
    //   ,
    //   [
    //       28267.66197,28627.24138,28606.18571,29783.95161,30851.3125,31294.30986,31528.43421,31075.36047,31148.8,29881.55556,30680.01818,31089.61905,33756.48718,34380.65169,36213.26966,36750.78125,37348.52778,36396.83099,37192.57143,37640.39806,38935.84685,39015.82222,40116.38462,40285.04545
    //     ]
    //
    //   ]
    // };
    // console.log("Hårdara:");
    // console.log(data);
    // console.log(data2);


    //
    // var lis = document.createElement("li");
    // lis.className = "ct-series-1";
    // lis.html = "<strong>Österåker</strong>";
    // document.getElementById("legend").appendChild(lis);


    // var listItem = $('<li />')
    // .addClass('ct-series-' + i)
    // .html('<strong>' + val + '</strong>: ' + data.series[i] + '%')
    // .appendTo(legend);
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('area_stat').addEventListener('click', myAlert);
    chrome.tabs.executeScript(null, {file: "content.js"}, function(info) {

  
        // var d = JSON.parse(info[0].datalayer);
        document.body.bgColor= info[0].color;
        document.getElementById('price').innerHTML = info[0].datalayer[2].property.price;
        document.getElementById('rent').innerHTML = info[0].datalayer[2].property.borattavgift;
        document.getElementById('size').innerHTML = info[0].datalayer[2].property.living_area;
        // document.getElementById('price').text = info[0].datalayer[2].driftkostnad;
        // document.getElementById('price').text = info[0].datalayer[2].living_area;
        // document.getElementById('price').text = info[0].datalayer[2].location;
        // document.getElementById('price').text = info[0].datalayer[2].price_per_m2;
        // document.getElementById('price').text = info[0].datalayer[2].street_address;
        // document.getElementById('price').text = info[0].datalayer[2].upcoming_open_houses;
    });
});
// http://www.maklarstatistik.se/usercontrols/statistik/LineChart.aspx?Months=24&LK=117&Main=%C3%96ster%C3%A5ker&Extra1=8888&Extra2=8888&Typ=Boratterkurvdata
//
//
// /**
//  * Get the current URL.
//  *
//  * @param {function(string)} callback - called when the URL of the current tab
//  *   is found.
//  */
// function getCurrentTabUrl(callback) {
//   // Query filter to be passed to chrome.tabs.query - see
//   // https://developer.chrome.com/extensions/tabs#method-query
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };
//
//   chrome.tabs.query(queryInfo, function(tabs) {
//     // chrome.tabs.query invokes the callback with a list of tabs that match the
//     // query. When the popup is opened, there is certainly a window and at least
//     // one tab, so we can safely assume that |tabs| is a non-empty array.
//     // A window can only have one active tab at a time, so the array consists of
//     // exactly one tab.
//     var tab = tabs[0];
//
//     // A tab is a plain object that provides information about the tab.
//     // See https://developer.chrome.com/extensions/tabs#type-Tab
//     var url = tab.url;
//
//     // tab.url is only available if the "activeTab" permission is declared.
//     // If you want to see the URL of other tabs (e.g. after removing active:true
//     // from |queryInfo|), then the "tabs" permission is required to see their
//     // "url" properties.
//     console.assert(typeof url == 'string', 'tab.url should be a string');
//
//     callback(url);
//   });
//
//   // Most methods of the Chrome extension APIs are asynchronous. This means that
//   // you CANNOT do something like this:
//   //
//   // var url;
//   // chrome.tabs.query(queryInfo, function(tabs) {
//   //   url = tabs[0].url;
//   // });
//   // alert(url); // Shows "undefined", because chrome.tabs.query is async.
// }
//
// /**
//  * @param {string} searchTerm - Search term for Google Image search.
//  * @param {function(string,number,number)} callback - Called when an image has
//  *   been found. The callback gets the URL, width and height of the image.
//  * @param {function(string)} errorCallback - Called when the image is not found.
//  *   The callback gets a string that describes the failure reason.
//  */
// function getImageUrl(searchTerm, callback, errorCallback) {
//   // Google image search - 100 searches per day.
//   // https://developers.google.com/image-search/
//   var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
//     '?v=1.0&q=' + encodeURIComponent(searchTerm);
//   var x = new XMLHttpRequest();
//   x.open('GET', searchUrl);
//   // The Google image search API responds with JSON, so let Chrome parse it.
//   x.responseType = 'json';
//   x.onload = function() {
//     // Parse and process the response from Google Image Search.
//     var response = x.response;
//     if (!response || !response.responseData || !response.responseData.results ||
//         response.responseData.results.length === 0) {
//       // errorCallback('No response from Google Image search!');
//       return;
//     }
//     var firstResult = response.responseData.results[0];
//     // Take the thumbnail instead of the full image to get an approximately
//     // consistent image size.
//     var imageUrl = firstResult.tbUrl;
//     var width = parseInt(firstResult.tbWidth);
//     var height = parseInt(firstResult.tbHeight);
//     console.assert(
//         typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//         'Unexpected respose from the Google Image Search API!');
//     callback(imageUrl, width, height);
//   };
//   x.onerror = function() {
//     errorCallback('Network error.');
//   };
//   x.send();
// }
//
// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// }
//
// document.addEventListener('DOMContentLoaded', function() {
//   getCurrentTabUrl(function(url) {
//     // Put the image URL in Google search.
//     console.log(url.split('/'));
//
//     console.log(document.getElementsByTagName('span'));
//     renderStatus("HEMNET!/bostad" + document.getElementsByTagName("span").length);
//     if (url.split('/').indexOf('www.hemnet.se') > 0 ){
//       if (url.split('/')[3] == 'bostad'){
//         console.log(document.getElementsByTagName('span'));
//         renderStatus("HEMNET!/bostad" + document.getElementsByTagName("span").length);
//       }else{
//           renderStatus("HEMNET!");
//       }
//
//     } else{
//       renderStatus('URL' + url.split('/')[2]);
//     }
//     getImageUrl(url, function(imageUrl, width, height) {
//
//       // renderStatus('Search term: ' + url + '\n' +
//       //     'Google image search result: ' + imageUrl);
//       var imageResult = document.getElementById('image-result');
//       // Explicitly set the width/height to minimize the number of reflows. For
//       // a single image, this does not matter, but if you're going to embed
//       // multiple external images in your page, then the absence of width/height
//       // attributes causes the popup to resize multiple times.
//       imageResult.width = width;
//       imageResult.height = height;
//       imageResult.src = imageUrl;
//       imageResult.hidden = false;
//
//     }, function(errorMessage) {
//       renderStatus('Cannot display image. ' + errorMessage);
//     });
//   });
// });
// [{"taxonomy":{"Sajt":"hemnet-se","Sektion":"objektsida"}},{"page":{"type":"standard"}},{"property":{"id":8524395,"broker_firm":"Svensk Fastighetsf\u00f6rmedling \u00c5kersberga","foreign":false,"location":"\u00d6ster\u00e5ker","locations":{"country":"Sverige","region":"Stockholms l\u00e4n","municipality":"\u00d6ster\u00e5kers kommun","postal_city":"\u00c5kersberga","city":"\u00c5kersberga","district":"\u00d6stersk\u00e4r","street":"V\u00e4stra banv\u00e4gen"},"images_count":17,"new_production":false,"home_swapping":false,"offers_selling_price":true,"status":"for_sale","item_type":"Bostadsr\u00e4ttsl\u00e4genhet","main_location":"\u00d6ster\u00e5ker","street_address":"V\u00e4stra banv\u00e4gen 6 A","rooms":1.0,"living_area":32.0,"driftkostnad":3600,"price_per_m2":49844,"price":1595000,"has_price_change":false,"borattavgift":1731,"upcoming_open_houses":true}}]; "
