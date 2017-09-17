var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/mydb';

MongoClient.connect(DB_CONN_STR,function(err,db){
    console.log('连接成功'); 
    // insertMyTableData(db,function(result){
    //     console.log(result);
    //     db.close();
    // });
    selectMyTableData(db,function(result){
        console.log(result);
        db.close();
    });
    
});

var insertMyTableData = function(db,callback){
    //连接到表 myTable 
    var collection = db.collection('myTable');
    //插入数据
    var data = {name:'ompeak',age:44};
    collection.insert(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}

var selectMyTableData  = function(db,callback){
    var collection = db.collection('myTable');
    var whereStr = {name:'ompeak'};
    collection.find(whereStr).toArray(function(err,result){
         if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}