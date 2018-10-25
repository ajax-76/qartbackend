const express =require('express');
const cors =require('cors');
const bodyParser=require('body-parser');
const morgan = require('morgan');

const messages=require('./db/messages');

const isrmethods=require('./db/methodsforisrform/methods');

const app =express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.json({
        'message':'fullstackmessageboard'
    });
});

app.get('/messages',(req,res)=>{
    messages.getAll().then(messages=>{
        res.json(messages);
    });
});

app.get('/getcompany',(req,res)=>{
    isrmethods.promiseforcompany.then(list=>{     
        res.json(list);
    });
});

app.post('/getbrand',(req,res)=>{
    console.log(req.body.comp)
    isrmethods.getbrands(req.body.comp).then(list=>{     
        res.json(list);
    });
});

app.post('/getadmin',(req,res)=>{
    console.log(req.body.comp,req.body.brand)
    isrmethods.getadmin(req.body.comp,req.body.brand).then(list=>{     
        res.json(list);
    });
});

app.post('/getnsm',(req,res)=>{
    console.log(req.body.comp,req.body.brand)
    isrmethods.getnsm(req.body.comp,req.body.brand).then(list=>{     
        res.json(list);
    });
});

app.post('/getrsm',(req,res)=>{
    console.log(req.body.comp,req.body.brand,req.body.superviserid)
    isrmethods.getrsm(req.body.comp,req.body.brand,req.body.superviserid).then(list=>{     
        res.json(list);
    });
});

app.post('/getasm',(req,res)=>{
    console.log(req.body.comp,req.body.brand,req.body.superviserid)
    isrmethods.getasm(req.body.comp,req.body.brand,req.body.superviserid).then(list=>{     
        res.json(list);
    });
});

app.post('/checkretailercode',(req,res)=>{
    console.log(req.body.retailercode)
    isrmethods.checkretailercodeuniquesness(req.body.retailercode).then(result=>{     
        res.send(result);
    });
});

app.post('/checknsm',(req,res)=>{
    console.log(req.body.email,req.body.phone,req.body.companyname,req.body.brandname);
    isrmethods.checkexistingnsm(req.body.email,req.body.phone,req.body.companyname,req.body.brandname).then(result=>{     
        res.json(result);
    });
});

app.post('/checkrsm',(req,res)=>{
    console.log(req.body.email,req.body.phone,req.body.companyname,req.body.brandname);
    isrmethods.checkexistingrsm(req.body.email,req.body.phone,req.body.companyname,req.body.brandname).then(result=>{     
        res.json(result);
    });
});


app.post('/checkasm',(req,res)=>{
    console.log(req.body.email,req.body.phone,req.body.companyname,req.body.brandname);
    isrmethods.checkexistingrsm(req.body.email,req.body.phone,req.body.companyname,req.body.brandname).then(result=>{     
        res.json(result);
    });
});


app.post('/checkisr',(req,res)=>{
    console.log(req.body.email,req.body.phone,req.body.companyname,req.body.brandname);
    isrmethods.checkexistingisr(req.body.email,req.body.phone,req.body.companyname,req.body.brandname).then(result=>{     
        res.json(result);
    });
});

app.post('/checkadmin',(req,res)=>{
    console.log(req.body.email,req.body.phone,req.body.companyname,req.body.brandname);
    isrmethods.checkexistingadmin(req.body.email,req.body.phone,req.body.companyname,req.body.brandname).then(result=>{     
        res.json(result);
    });
});

app.post('/createuser',(req,res)=>{
    console.log(req.body.user,req.body.nsmid,req.body.rsmid,req.body.asmid);
    isrmethods.creatuserhierarchy(req.body.user,req.body.nsmid,req.body.rsmid,req.body.asmid).then(result=>{     
        res.json(result);
    });
});

app.post('/messages',(req,res)=>{
    console.log(req.body);
    messages.create(req.body).then(message=>{
        return res.json(message);
    }).catch(error=>{
        res.status(500);
        res.json(error);
    });
});

app.post('/postisr',(req,res)=>{
    console.log(req.body);
    messages.createhierarchy(req.body).then(message=>{
        return res.json(message);
    }).catch(error=>{
        res.status(500);
        res.json(error);
    });
});

const port=process.env.PORT || 5000;
app.listen(port,function(){
    console.log('Listening on :'+ port);
}); 