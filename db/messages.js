const Joi=require('joi');

const db = require('./connection');

const schema=Joi.object().keys({
    username:Joi.string().alphanum().required(),
    subject:Joi.string().required(),
    message:Joi.string().max(500).required(),
    imageurl:Joi.string().uri({
        scheme:[
            /https?/
        ]
    })
});

const schemaforisr=Joi.object().keys({
    retailercode:Joi.string().required(),
    retailername:Joi.string().required(),
    companyname:Joi.string().required(),
    brandname:Joi.string().required(),
    adminname:Joi.string().required(),
    adminemail:Joi.string().email().required(),
    adminphone:Joi.string().required(),
    nsmname:Joi.string().required(),
    nsmemail:Joi.string().email().required(),
    nsmphone:Joi.string().required(),
    rsmname:Joi.string().required(),
    rsmemail:Joi.string().email().required(),
    rsmphone:Joi.string().required(),
    asmname:Joi.string().required(),
    asmemail:Joi.string().email().required(),
    asmphone:Joi.string().required(),
    isrname:Joi.string().required(),
    isremail:Joi.string().required(),
    isrphone:Joi.string().required(),
    
})


const messages = db.get('messages');



function getAll() {
    return messages.find();
}

function create(message){
    const result = Joi.validate(message,schema);
    console.log(result);
    if(result.error==null){
        console.log("kya hua");
        return messages.insert(message);
    }
    else{
        console.log("error hua");
        return Promise.reject(result.error);
    }
}

function createhierarchy(object){
    const result=Joi.validate(object,schemaforisr);
    if(result.error==null){
        console.log("test passed");
    }
    else{
        return Promise.reject(result.error);
    }
}


module.exports = {
    getAll,
    create,
    createhierarchy
}
