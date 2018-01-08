var model = require('../models/todos');

exports.showHomepage = function(req, res, next){
    model.getTodos(function(error, result){
        if (error) {
            res.render('error', {
                error: error,
                message: "ERROR"
            });
            return;
        }
        res.render('index', {
            'title': 'To-do',
            'mode': process.env.NODE_ENV,
            'debug': (process.env.DEBUG) ? 'on' : 'off',
            'result': result
        })
    });
    
}