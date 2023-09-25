require('dotenv').config()
const express=require('express')
const app=express()
const passport=require('passport')
const LocalStrategy=require('passport-local')
const mongoose=require('mongoose')
const seedDB=require('./seed')
const Product=require('./models/Product')
const User=require('./models/User')
const session = require('express-session')
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

//sms
app.get('/sms',(req,res)=>{
    sendTextMessage();
    res.send(`<h1>SMS Sent Successfully. Please Check Your Phone</h1>`)
})

function sendTextMessage(){
    client.messages.create({
      body: 'Here Arpit Jain Yours Website developer. Your OTP is 1955',
      to: '+919927418990', 
      to:'+919548824499',// Text your number
      from: '+16787103293', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((err)=>{console.log(err);})
}





app.use(express.json())


//steps for passport
app.use(passport.initialize())
app.use(session(
    {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }
));
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


passport.use(new LocalStrategy(User.authenticate()));
//end of steps

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Data Base Connected Successfully");
})
.catch((err)=>{
    console.log(err);
})
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

seedDB()

app.get('/',(req,res)=>{
    res.send("Arpit Jain")
})

//Products Routes

app.get('/products',async(req,res)=>{
   let product = await Product.find({})
   res.render('index',{product})
})

app.get('/products/new',(req,res)=>{
    res.render('new')
})

app.post('/products',async(req,res)=>{
    let{name,img,price,desc}=req.body;
    await Product.create({name,img,price,desc})
    res.redirect('/products')
})


app.get('/show',(req,res)=>{
    res.render('show')
})

app.get('/products/:id',async (req,res)=>{
    let {id}=req.params
    let found=await Product.findById(id)
    res.render('show',{found})
})





//Authentication Routes

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async (req,res)=>{
    let {email,username,password}=req.body;
    const user=new User({email,username});
    const newUser=await User.register(user,password);
    res.redirect('/login')
})


app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/products');
  });




  app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });


  

  const port=process.env.PORT || 8000
  app.listen(port,()=>{
      console.log(`Server is Connected at Port No ${port}`);
  })




