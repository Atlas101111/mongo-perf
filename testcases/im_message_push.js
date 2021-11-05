
if ( typeof(tests) != "object" ) {
    tests = [];
}

var queryOnAbcOps = [
    {   op:  "update", 
        query: { _id : { "#RAND_INT_PLUS_THREAD" : [ 0, 100000 ] } },
        update: { $push :{
            Messages:{
                 $each : [{MessageId:2009, MessageContent: "我是更新信息"}],
                 $sort : {MessageId : 1}
            }
        } } }
];

// 400000 ~ 1600000 users
var insertData = function(collection, threads) {
    collection.drop();
    var bulk = collection.initializeUnorderedBulkOp();
    var messages = [{
        MessageId: 0,
        SenderId:"dsajdklasjdlkajsdawdawdaw",
        MessageContent: "你是憨"
    }];

    for (var i = 1; i < 1000; ++i){
        messages.push(
            {
                MessageId: i,
                SenderId:"dsajdkla",
                MessageContent: "你是憨批吧你是憨批吧你是憨批吧你是憨批吧你是憨批吧你是憨批吧"
            }
        )
    }


    for ( var i = 0; i < 100000 * threads; i++ ) {
      bulk.insert( { 
          _id: i,
          AccountUuid: "ac7908908e9qcjkljkdad9uvcxxczv", 
          Messages: messages
        } );
    }
    bulk.execute();
};

/*
 * Setup: Create collection with documents of shape {_id: i, a: i, b: i, c: "foo", d: i}.
 *
 * Test: query by _id, a, b, and c for a particular i value. This will execute by looking up i in
 * the unique {_id: 1} index.
 */
tests.push( { name: "im_message_push",
              tags: ['query','uniqueidx','compare'],
              pre: function(collection, env) {
                  insertData(collection, env.threads);
              },
              ops: queryOnAbcOps } );
