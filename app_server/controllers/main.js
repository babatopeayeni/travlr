/* GET homepage */
const index = (req,res) =>{
    res.render('index',{title:'Tralvr Getaways'})
}

module.exports={
    index
}