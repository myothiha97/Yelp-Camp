const express = require(`express`)
const app = express()
const path = require(`path`)
const mongoose = require(`mongoose`)
const campRoutes = require(`./routes/campgrounds`)
const ejsMate = require(`ejs-mate`)

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error" , console.error.bind(console, `connection error:`))
db.once("open",() => {
    console.log(`Database connected`)
})


app.engine(`ejs`,ejsMate)
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname , 'views'))

app.use('/public',express.static(path.join(__dirname,'public')))
app.use('/campground',campRoutes)
// app.use(bodyparser.urlencoded({extended: false}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get(`/`,(req , res) => {
    res.render('home')
})

app.get('/close',async (req , res ) => {
    await mongoose.connection.close().then(() => {
        res.send(`Server close
                db disconnected`)
    })
    setTimeout(() => {
        // server.close()
        process.exit()
    }, 1000)
    
})

const port = 8080

app.listen(port, () => {
    console.log(`Server open at port ${port}`)
})