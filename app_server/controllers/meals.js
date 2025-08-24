/* GET meals view */
const meals = (req,res) =>{
    res.render('meals',{title:'Tralvr Getaways'})
}

module.exports={
    meals
}