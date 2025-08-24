/* GET rooms view */
const rooms = (req,res) =>{
    res.render('rooms',{title:'Tralvr Getaways'})
}

module.exports={
    rooms
}