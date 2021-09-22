module.exports.home = function(req, res){
   // return res.end('<h1>Express is up for Codeial!</h1>')
   console.log(req.cookies) //  displayng cookies values
   res.cookie('userId',2560)
    return res.render('home',{
        title:"Home"
    })

}

module.exports.action = function(req,res){
    return res.end('<h1>welcomr to Action page</h1>')
}
module.exports.aboutUs = function(req,res){
    return res.end('<h1>hi man</h1>')
}