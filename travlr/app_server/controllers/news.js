/* GET news view */
const news = (req,res) =>{
    res.render('news',{title:'Tralvr Getaways'})
}

module.exports={
    news
}