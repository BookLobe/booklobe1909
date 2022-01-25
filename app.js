const express = require("express");
const path = require("path");
const { stringify } = require("querystring");
const app = express();
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
const bcrypt = require("bcrypt")

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/SigninBooklobe',{useNewUrlParser:true}, {useUnifiedTopology: true}, {useCreateIndex:true});
}
//Define Mongo Schema
const signinSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },

    email:{
        type:String,
        required: true,
        unique:true
    },
    phone:{
        type:Number,
        required: true,
        unique:true
    },
    password:{
        type:String,
        reuqired:true
    }
  });
  const Signup = mongoose.model('Signup', signinSchema);
module.exports = Signup

const contactSchema = new mongoose.Schema({
    cfirst: String,
    cemail: String,
    subject:String,
  });
  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({extended:false}))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
})

app.get('/content', (req, res)=>{
    const params = { }
    res.status(200).render('content.pug', params);
})
app.get('/jee', (req, res)=>{
    const params = { }
    res.status(200).render('jee.pug', params);
})
app.get('/maths', (req, res)=>{
    const params = { }
    res.status(200).render('maths.pug', params);
})

app.get('/profile', (req, res)=>{
    const params = { }
    res.status(200).render('profile.pug', params);
})
app.get('/signup', (req, res)=>{
    const params = { }
    res.status(200).render('signup.pug', params);
})
app.get('/login', (req, res)=>{
    const params = { }
    res.status(200).render('login.pug', params);
})

app.post('/signup', async (req, res)=>{
    var myData = new Signup(req.body);
    myData.save().then(()=>{
        res.render("home.pug")
    }).catch(()=>{
        res.status(400).send("Fill the Correct Data")
    })
    

    // res.status(200).render('signup.pug');
})
app.post('/login', async (req,res)=>{
    try {
        var email = req.body.email;
        var password = req.body.password;

        var useremail = await Signup.findOne({email:email});

        if (useremail.password == password) {
            res.status(200).render("home.pug")
        } else {
            res.send("The password is incorrect")
        }
         
    } catch (error) {
        res.status(400).send("invalid Email")
    }
})

app.post('/contact', async(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    }) 
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});