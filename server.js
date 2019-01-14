var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var fs = require('fs');
var stripe = require("stripe")("sk_test_o1dQoKZyV1apskA8oF6XYgy4");


// var db = mongo.connect("mongodb://localhost:27017/connis", function(err, response){
var db = mongo.connect("mongodb://admin:titties69@ds155774.mlab.com:55774/connis", function(err, response){
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
  content: { type: String },
  content2: { type: String },
  bodyText: { type: String }

},{versionKey: false });

var MusicSchema = new Schema({
  link: { type: String },
  content: { type: String },

},{versionKey: false });

var VideosSchema = new Schema({
  embed: { type: String },

},{versionKey: false });

var ClothingSchema = new Schema({
  content: { type: String },
  price: { type: String },
  clothingDesc: {type: String},
  isAvailable: { type: Boolean },

},{versionKey: false });

var model = mongo.model('blog', BlogSchema, 'blog');
var musicModel = mongo.model('music', MusicSchema, 'music');
var videosModel = mongo.model('videos', VideosSchema, 'videos');
var clothingModel = mongo.model('clothing',ClothingSchema, 'clothing');

//**********CLOTHING FUNCTIONS*****************

app.get("/api/getMerchandise", function(req,res){
  clothingModel.find({},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

app.post("/api/saveMerchandise",function(req,res){
  var mod = new clothingModel(req.body);

  if(req.body.mode == "Save"){

    mod.save(function(err,data){
      if(err){
        res.send(err);
      }
      else{
        res.send({data:"Clothing has been added!"});
      }
    });

  }
})

app.post("/api/deleteMerchandise",function(req,res){
  clothingModel.remove({_id: req.body.id}, function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send({data:"Clothing has been Deleted!"});
    }
  });
})

app.post("/api/createCharge", function(req,res){
  const token = req.body.id;

  const charge = stripe.charges.create({
    amount: 100,
    currency: 'usd',
    description: 'Example charge',
    source: token,
  });
})
//**************************************************

//**************VIDEOS FUNCTIONS********************

app.get("/api/getVideo", function(req,res){
  videosModel.find({},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

app.post("/api/saveVideo",function(req,res){
  var mod = new videosModel(req.body);

  if(req.body.mode == "Save"){

    mod.embed = req.body.embed;
    mod.save(function(err,data){
      if(err){
        res.send(err);
      }
      else{
        res.send({data:"Post has been added!"});
      }
    });

  }
})

app.post("/api/deleteVideo",function(req,res){
  console.log(req);
  videosModel.remove({_id: req.body.id}, function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send({data:"Post has been Deleted!"});
    }
  });
})
//**************************************************
//**************MUSIC FUNCTIONS*********************
app.get("/api/getMusic", function(req,res){
  musicModel.find({},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

app.post("/api/saveMusic",function(req,res){
  var mod = new musicModel(req.body);

  if(req.body.mode == "Save"){

    mod.link = req.body.link;
    mod.content = req.body.content;
    mod.save(function(err,data){
      if(err){
        res.send(err);
      }
      else{
        res.send({data:"Post has been added!"});
      }
    });

  }
})

app.post("/api/deleteMusic",function(req,res){
  musicModel.remove({_id: req.body.id}, function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send({data:"Post has been Deleted!"});
    }
  });
})
//**************************************************

//**************BLOG FUNCTIONS**********************
app.post("/api/savePost",function(req,res){
  var mod = new model(req.body);

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
    model.findByIdAndUpdate(req.body.id, { title: req.body.title, content: req.body.content, content2: req.body.content2, bodyText: req.body.bodyText},
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
  // model.findOne({},function(err,data){
  model.find().sort({_id: -1}).limit(1).exec(function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data[0]);
    }
  });
})

app.post("/api/getNextPost", function(req,res){
  var data = model.find({_id: {$gt: req.body.id}}).sort({_id: 1}).limit(1).exec(function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

app.post("/api/getPreviousPost", function(req,res){
  var data = model.find({_id: {$lt: req.body.id}}).sort({_id: -1}).limit(1).exec(function(err,data){

    if(!data){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

//***********************************************

app.listen(process.env.PORT || 8080, function () {
  console.log('app listening on port 8080...')
})
