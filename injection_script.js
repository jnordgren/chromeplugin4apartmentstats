(function() {
    var XHR = XMLHttpRequest.prototype;
    // Remember references to original methods
    var open = XHR.open;
    var send = XHR.send;

    // Overwrite native methods
    // Collect data:
    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    // Implement "ajaxSuccess" functionality
    XHR.send = function(postData) {

        this.addEventListener('load', function() {

          //Here we have found what we were looking for.
          if(this.responseText.length > 4){ //How should we communicate this back to our thing? put it into dom?
            document.getElementById('special_l33t_inject_div').innerHTML = this.responseText;
            // chrome.runtime.sendMessage({
            //     type: 'closing_price',
            //     request: "closing_price"
            // }, function(data) {
            //     // Received message from background, pass to page
            //     var event = document.createEvent('Events');
            //     event.initEvent(EVENT_REPLY, false, false);
            //     transporter.setAttribute('result', JSON.stringify(data));
            //     transporter.dispatchEvent(event);
            // });
          }
            /* Method        */ this._method
            /* URL           */ this._url
            /* Response body */ this.responseText
            /* Request body  */ postData
        });
        // alert("HEJS" );
        // console.log("---");
        // if(this.responseText.length > 4){
          // console.log(this);
          // console.log(this.XMLHttpRequest.responseText);
        // }
        return send.apply(this, arguments);
    };
})();
