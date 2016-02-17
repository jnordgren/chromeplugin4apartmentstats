
function getStatData(kommun,callback) {

  var statUrl = 'http://www.maklarstatistik.se/usercontrols/statistik/LineChart.aspx?Months=24&LK=117&Main=V%C3%A4rmd%C3%B6&Extra1=8888&Extra2=8888&Typ=Boratterkurvdata'
  // encodeURIComponent(searchTerm);
  var req = new XMLHttpRequest();

  req.open('GET', statUrl);
  // Make sure chrome parses the xml for us
  req.overrideMimeType('text/xml');

  req.onload = function() {

    var response = req.responseXML;
    if (!response || !response || response.getElementsByTagName('set').length != response.getElementsByTagName('category').length || response.getElementsByTagName('category').length == 0) {
      console.log('SNetwork error.');

      return;
    }

    var p = response.getElementsByTagName('set');
    var m = response.getElementsByTagName('category');

    var data = { labels:[], series:[]};
    var tmp = []
    for(i = 0; i<p.length; i++){
      tmp.push(parseFloat(p[i].getAttribute('value')));
      data.labels.push(m[i].getAttribute('label'));
    }
    data.series.push(tmp);


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
