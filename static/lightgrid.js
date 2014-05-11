$(document).ready(function() {
    var _$connect = $('#connect');
    var _$close = $('#close');
    var _$send = $('#send');
    var _$input = $('#data_input');
    var sendQueue = $({});
    var updateRoutine = null;
    // var server = 'ws://68.173.83.103:8383/';
    var server = 'ws://' + data.ip + ':' + data.port + '/';
    var connection = null;

    _$connect.click(function() {
        if ('WebSocket' in window) {
            connection = new WebSocket(server);
            bindconn();
            print_msg('Connecting to server: ' + server);
            _$close.removeAttr("disabled");
        } else {
            print_msg('Websockets not supported in this browser.');
        }

        _$connect.attr("disabled","disabled");
    });

    _$send.click(function() {
        if (connection) {
            //JSON.stringify/parse(text)
            // TEST http://jsbin.com/ozATAJI/3/
            
            // frames are being too quickly and the buffer is filling up
            // check connection.bufferedAmount, queue calls
            var data = (_$input.val()).replace( /\n/g, " " ).split( " " );
            $.each(data, function(i, msg) {
                if (msg.length > 2) {
                    msg = unescape( encodeURIComponent( msg ) );
                    console.log(msg + " : " + connection.bufferedAmount);
                    //connection.send(msg);

                    // add delay between each call
                    //setTimeout(connection.send(msg), 300 * (i+1));
                    
                    sendQueue.queue( 
                        function( next ) {
                            connection.send(msg);
                    });

                } else {
                    console.log('Message too small');
                }
            });

        } else {
            print_msg('Connection not ready yet.');
        }
    });

    _$close.click(function() {
        clearInterval(updateRoutine);
        
        if (connection) {
            connection.close();
            connection = null;
            _$connect.removeAttr("disabled");
            _$close.attr("disabled","disabled");
            print_msg('Server has been closed.');
        } else {
            print_msg('Connection not ready yet.');
        }
    });

    var bindconn = function() {
        connection.onopen = function(){
            print_msg('Connection open!');

            // regularly check for new data to send
            updateRoutine = setInterval( function() {
                if (connection.bufferedAmount == 0)
                    sendQueue.dequeue();
            }, 50);
        }
        connection.onclose = function(){
            print_msg('Connection closed.');
            clearInterval(updateRoutine);
        }
        connection.onerror = function(error){
            print_msg('Error detected: ' + error.data);
        }
        connection.onmessage = function(e) {
            print_data(e.data);
        };
    }


    var print_msg = function(msg) {
    /*    _$words.text(function(i, oldText) {
            return msg;
        });
    */
        console.log(msg);
    }
    var print_data = function(msg) {
    /*    _$words2.text(function(i, oldText) {
            return msg;
        });
    */
        console.log(msg);
    }



});
