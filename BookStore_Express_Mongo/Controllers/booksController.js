var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var config = require('../Configurations/config');

module.exports.getBooks = (req,res) => {

    mongoClient.connect(config.mongourl,{ useNewUrlParser: true },function(err,client){
        const db = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            db.collection('books').find().toArray(function(error,results){
                if(error)
                    console.log("Error Occurred while fetching ",error);
                //console.log("Books ",results);
                res.send(results);
            });
        }
    });
}

module.exports.getGenres = (req,res) => {

    mongoClient.connect(config.mongourl,{ useNewUrlParser: true },function(err,client){
        const db = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            db.collection('genres').find().toArray(function(error,results){
                if(error)
                    console.log("Error Occurred while fetching ",error);
                //console.log("Genres ",results);
                res.send(results);
            });
        }
    });
}   

module.exports.getFormats = (req,res) => {

    mongoClient.connect(config.mongourl,{ useNewUrlParser: true },function(err,client){
        const db = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            db.collection('formats').find().toArray(function(error,results){
                if(error)
                    console.log("Error Occurred while fetching ",error);
                //console.log("Formats ",results);
                res.send(results);
            });
        }
    });
} 

module.exports.getLastBook = (req,res) => {

    mongoClient.connect(config.mongourl,{ useNewUrlParser: true },function(err,client){
        const db = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            db.collection('books').find({}).sort({$natural:-1}).limit(1).toArray(function(error,results){
                if(error)
                    console.log("Error Occurred while fetching ",error);
                //console.log("Last Book Array ",results);
                let resultObj = {...results};
                console.log("Last Book Object ",resultObj['0']);
                res.send(resultObj['0']);
            });
        }
    });
} 

module.exports.saveBook = (req,res) => {

    mongoClient.connect(config.mongourl, { useNewUrlParser: true }, function(err,client){
        const db= client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
        }
        else{
            db.collection('books').insertOne(req.body, function(error, results){
            if(error)
                console.log("Error Occurred while fetching ",error);
            else
                console.log("Success ",results.ops);
                res.send(results.ops);
            });
        }
    });
    console.log(req.body);
}

module.exports.viewBook = (req,res) => {

    mongoClient.connect(config.mongourl, function(err,client){
        const db = client.db(config.dbname);
        if(err)
            console.log("Error Occurred while connecting ",err);
        else{
            console.log("Book ID to be searched ",req.body.id);
            let viewBook;
            db.collection('books').findOne({ id: req.body.id}, { useNewUrlParser: true },function(err,data){
                viewBook=data;
                console.log("Book Result ",viewBook);
                res.send(viewBook);
            }); 
        }
    });
}

module.exports.updateBook = (req,res) => {

    mongoClient.connect(config.mongourl, function(err, client){
        const db = client.db(config.dbname);
        if(err)
            console.log("Error Occurred while connecting ",err);
        else{
            console.log("Book ID to be updated ",req.body.id);
            db.collection('books').findOneAndUpdate(
                { id: req.body.id },
                {
                    $set: { 
                        title: req.body.title,
                        author: req.body.author,
                        isbn: req.body.isbn,
                        publicationDate: req.body.publicationDate,
                        publisher: req.body.publisher,
                        price: req.body.price,
                        genre: req.body.genre,
                        format: req.body.format
                    }
                },
                {
                    upsert: true
                },
                function(error, results){
                    console.log("Updated Book ",results);
                    res.send(results);
                }
            );
        }   
    });
}

module.exports.deleteBook = (req,res) => {

    mongoClient.connect(config.mongourl, function(err,client){
        const db = client.db(config.name);
        if(err)
            console.log("Error Occurred while connecting ",err);
        else{
            console.log("Book ID to be deleted ",req.body.id);
            var id = req.body.id;
            /* db.collection('books').deleteOne({  _id : objectId(id) }, function(err, results){
                if (err) return res.send(500, err)
                  console.log(results);
                  res.send('A darth vader quote got deleted')
            }); */
            /* db.collection('books').findOneAndDelete({id: req.body.id}, 
                (err, result) => {
                  if (err) return res.send(500, err)
                  console.log(result);
                  res.send('A darth vader quote got deleted')
            }); */
            db.collection('books', function(err, collection) {
                collection.deleteOne({_id: objectId('5c663f8e0e77e616887815e7')}, function(err, results) {
                    if (err){
                      console.log("failed");
                      throw err;
                    }
                    console.log("success",results);
                 });
             });
        }
    });
}