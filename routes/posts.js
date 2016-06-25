"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Post = mongoose.model('Post');
var users =[{author:"maroof",body:"hellyeah",category:"IT",type:"placement"},{author:"dhruv",body:"mofos",category:"Core",type:"intern"}]
/* GET users listing. */
router.route('/')
	.get(function(req,res){
		Post.find(function(err,data){
			if(err) return res.status(500).send(err);
			else return res.status(200).json(data);

		});
	})
	.post(function(req,res){
		var newpost = new Post();
		newpost.author = req.body.author;
		newpost.text = req.body.text;
		newpost.category = req.body.category;
		newpost.branch = req.body.branch;
		newpost.company = req.body.company;
		newpost.relatedto = req.body.relatedto; 

		newpost.save(function(err,data){
			if(err) return res.status(500).send(err);
			else return res.status(200).json(data);
		});

	})

router.route('/intern')
	.get(function(req,res){
		Post.find({relatedto : "intern"},function(err,data){
			if(err) return res.status(500).send(err);
			else return res.status(200).json(data);
		});
	})
	.post(function(req,res){
		return res.send({type: "testing intern post"});
	});

router.route('/placement')
	.get(function(req,res){
		Post.find({relatedto : "placement"},function(err,data){
			if(err) return res.status(500).send(err);
			else return res.status(200).json(data);
		});
	})
	.post(function(req,res){
		return res.send({type: "testing placement post"});
	});

router.route('/:id')
	 .get(function(req,res){
	 	Post.findById(req.params.id,function(err,data){
	 		// console.log(err);
	 		// console.log(data);
	 		if(err) return res.status(500).send(err);
	 		else if (data == null) return res.status(404).send("couldn't find object")
	 		else{
	 			return res.status(200).json(data);
	 		}
	 	})
	 })
     .put(function(req,res){
         var id = req.params.id ;
     	 Post.findById(id,function(err,data){
     	 	if(err)
     	 		return res.status(500).send(err);
     	 	else{
     	 		console.log(data);
     	 		console.log(typeof(data));
     	 		data.timestamp = Date.now();
     	 		data.author = req.body.author;
     	 		data.category = req.body.category;
     	 		data.relatedto = req.body.relatedto;
     	 		data.text = req.body.text;
     	 		data.branch = req.body.branch;
     	 		data.company = req.body.company;
     	 		data.save(function(error,datafinal){
     	 			if(error)
     	 				return res.status(500).send(error);
     	 			else
     	 			   return res.send(data);
     	 		});
     	 	}

     	 });
     })

     .delete(function(req,res){
     	var id = req.params.id ;
     	Post.findById(id,function(err,data){
     		console.log("this error " + err );
     		if(err) return res.status(500).send(err);
     		else if(data == null)
     			return res.status(404).send("couldn't find object");
     		else{
     			data.remove(function(error){
     				if(error)
     					res.status(500).send(error);
     				else res.status(200).send("deleted");
     			})
     		}
     	});
     })

module.exports = router;
