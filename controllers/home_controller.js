module.exports.home = function(req, res){
    return res.end('<h1>Express is up for Codeial!</h1>')
}

module.exports.action = function(req,res){
    return res.end('<h1>welcomr to Action page</h1>')
}
module.exports.aboutUs = function(req,res){
    return res.end('<h1>hi man</h1>')
}