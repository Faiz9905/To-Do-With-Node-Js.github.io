// Import Express Library
const express = require('express');
const path = require('path');
// Port 
const port = 8888;

// 
const db = require('./config/mongoose');
const List = require('./models/list');

const app = express();
app.use(express.urlencoded());
// Set views and static files
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Router for home page
app.get('/', function(req, res){
    List.find({}, function(err, list){
        if(err){
            console.log("Error in fething contacts");
        }

        return res.render('home', {
            list_to_do : list
        });
    })

   

});

// Router for create to do list
app.post('/create-to-do-list', function(req, res){

    List.create({
        discription: req.body.discription,
        category: req.body.category,
        duedate : req.body.date,
        isDone : false
    }, function(err, newList){
        if(err){
            console.log("Error in creating a contact");
        }

        console.log('*******', newList);
        return res.redirect('back');
    })
//    console.log(req.body);

//    return res.redirect('/');
});

// Router for deleting 
app.get('/delete-to-do/', function(req, res){
    //get the id form querry in the url 
    let id = req.query.id;
    //find the conatct in DB using id and delete
    
    List.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleteing form database");
            return;
        }
        return res.redirect('back');
    });
   

});

// Router for update isDone field in schema
app.get('/update-to-do-list/', function(req, res){
  
    let id = req.query.id;
    
     List.find( {_id:id},function(err, user){
        
         if(user[0].isDone == true){
            user[0].isDone = false;
            user[0].save();
         }
         else{
            user[0].isDone = true;
            user[0].save();
         }
        
     })
    
    return res.redirect('back');

})

// Listen 
app.listen(port, function(err){
    if(err){
        console.log("Error in running server");
        return;
    }
    console.log("Express is running on port", port);
});