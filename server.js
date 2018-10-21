var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var fs = require('fs');


var db = mongo.connect("mongodb://localhost:27017/connis", function(err, response){
  if(err){console.log(err);}
  else{console.log('Connected to ' + db, ' + ', response);}
});

// var bucket = new mongodb.GridFSBucket(db);

var app = express();
app.use(express.json({limit: '50mb'}));
app.use(bodyParser());
// app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;

// var BlogSchema = new Schema({
//   title: { type: String },
//   content: { type: String },
// },{versionKey: false });

var BlogSchema = new Schema({
  title: { type: String },
  // content: { data: Buffer, contentType: String },
  content: { type: String },
  content2: { type: String },
  bodyText: { type: String }

},{versionKey: false });

var model = mongo.model('blog', BlogSchema, 'blog');

var currentID;

app.post("/api/savePost",function(req,res){
  var mod = new model(req.body);

  console.log(req.title);
  console.log(req.bodyText);
  if(req.body.mode == "Save"){

    mod.title = req.body.title;
    mod.content = req.body.content;
    mod.content2 = req.body.content2;
    mod.bodyText = req.body.bodyText;
    mod.save(function(err,data){
      if(err){
        res.send(err);
      }
      else{
        res.send({data:"Post has been added!"});
      }
    });

  }
  else{
    model.findByIdAndUpdate(req.body.id, { title: req.body.title, content: req.body.content, content2: req.body.content2},
    function(err,data){
      if(err) {
        res.send(err);
      }
      else{
        res.send({data:"Post has been updated!"});
      }
    });
  }
})

app.post("/api/deletePost",function(req,res){
  model.remove({_id: req.body.id}, function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send({data:"Post has been Deleted!"});
    }
  });
})

app.get("/api/getPost", function(req,res){
  model.findOne({},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

app.post("/api/getNextPost", function(req,res){
  // var current = model.find({"_id":req.body.id});
  var data = model.find({_id: {$gt: req.body.id}}).sort({_id: 1}).limit(1).exec(function(err,data){
    // console.log(data[0].title);
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

app.post("/api/getPreviousPost", function(req,res){
  // var current = model.findOne(req.body.id);
  var data = model.find({_id: {$lt: req.body.id}}).sort({_id: -1}).limit(1).exec(function(err,data){
  // model.findOne({date: {$lt: current.date}}, {}, {sort: {date: -1}},function(err,data){
    // console.log(data[0].title);
    if(!data){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

app.listen(8080, function () {
  console.log('app listening on port 8080...')
})
