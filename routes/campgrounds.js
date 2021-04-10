const express = require(`express`)
const router = express.Router()
const Campground = require(`../models/campground`)


router.get('/',async (req , res) => {
    const campgrounds = await Campground.find()
    res.render('campgrounds/index',{campgrounds})
})

router.post('/', async (req , res) => {

    const campgd = new Campground(req.body)
    await campgd.save()
    // res.send(req.body)
    res.redirect('/campground')
    
})

router.get('/new',async (req, res) => {
    res.render(`campgrounds/new`)
})


router.get(`/makecampground`,async (req , res) => {
    const camp = new Campground({
        title: "My Backyard",
        price: "120 lakhs",
        description: "This is my backyard",
        location: "Bago"
    })

    await camp.save().then(() => {res.send(camp)})
    .catch(() => {res.status(500).send('Something happened')})
})

router.get(`/:id`, async(req, res) => {
    const campgd = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campgd} )
})

module.exports = router