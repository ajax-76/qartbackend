const db = require('../connection');
var _ = require('lodash');
const users = db.get('users');
const retailers=db.get('Retailers');

function getCompany() {
     users.find().then(x=>{
        var userlist = x.filter(f => { return f.profile.company != "" && f.profile.company != undefined }).map(x => { return x.profile.company });  
        userlist = [...new Set(userlist.map(item => item))];
        console.log(userlist);
        return Promise.resolve(userlist);
    }).catch(err=>{
        return Promise.reject(userlist);
    });
}

var promiseforcompany= new Promise(function(resolve, reject) {
    users.find().then(x=>{
        var userlist = x.filter(f => { return f.profile.company != "" && f.profile.company != undefined }).map(x => { return x.profile.company });  
        userlist = [...new Set(userlist.map(item => item))];
        console.log(userlist);
        resolve(userlist);
    }).catch(err=>{
        reject(err);
    });
    
});

var getbrands=function(comp){
    return new Promise(function(resolve, reject) {
        users.find({ 'profile.company': comp }).then(x=>{
            var userlist = x.filter(f => { return f.profile.brand != "" && f.profile.brand != undefined }).map(x => { return { brandname: x.profile.brand, brandcode: (x.profile.brandcode != undefined) ? x.profile.brandcode : "NA" } });
            userlist = [...new Set(userlist.map(item => item))];
            var distinctData = _.uniqWith(userlist, _.isEqual);
            console.log(distinctData);    
            resolve(distinctData);
        }).catch(err=>{
            reject(err);
        });
        
    });
}


var getadmin=function(comp,brand){
    return new Promise(function(resolve,reject){
        users.find({ 'profile.company': comp, 'profile.brand': brand, 'profile.role': "Admin" }).then(x=>{
            var userlist=x;
            userlist = [...new Set(userlist.map(item => item))];
            var distinctData = _.uniqWith(userlist, _.isEqual);
            console.log(distinctData);    
            resolve(distinctData)
        }).catch(err=>{
            reject(err);
        });
    });
}

var getnsm=function(comp,brand){
    return new Promise(function(resolve,reject){
        users.find({ 'profile.company': comp, 'profile.brand': brand, 'profile.role': "NSM" }).then(x=>{
            var userlist=x;
            userlist = [...new Set(userlist.map(item => item))];
            var distinctData = _.uniqWith(userlist, _.isEqual);
            console.log(distinctData);    
            resolve(distinctData)
        }).catch(err=>{
            reject(err);
        });
    });
}

var getrsm=function(comp,brand,superviserid){
    return new Promise(function(resolve,reject){
        users.find({ 'profile.company': comp, 'profile.brand': brand, 'profile.role': "RSM",'profile.superviserid': superviserid }).then(x=>{
            var userlist=x;
            userlist = [...new Set(userlist.map(item => item))];
            var distinctData = _.uniqWith(userlist, _.isEqual);
            console.log(distinctData);    
            resolve(distinctData)
        }).catch(err=>{
            reject(err);
        });
    });
}


var getasm=function(comp,brand,superviserid){
    return new Promise(function(resolve,reject){
        users.find({ 'profile.company': comp, 'profile.brand': brand, 'profile.role': "ASM",'profile.superviserid': superviserid }).then(x=>{
            var userlist=x;
            userlist = [...new Set(userlist.map(item => item))];
            var distinctData = _.uniqWith(userlist, _.isEqual);
            console.log(distinctData);    
            resolve(distinctData)
        }).catch(err=>{
            reject(err);
        });
    });
}


var checkretailercodeuniquesness=function(retailercode){
    return new Promise(function(resolve,reject){
        retailers.find({ 'retailercode': retailercode }).then(x=>{
            if(x.length!=0){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }).catch(err=>{
            reject(err);
        });
    });
}


var checkexistingnsm= function( nsmemail,nsmphone,companyname,brandname ){
    return new Promise(function(resolve,reject){
        var obj={
            email:false,
            phone:false
        };
        users.find({'email': nsmemail }).then(x=>{
            if(x.length!=0){
                obj.email=true;
            }
        }).then(()=>{
            users.find({'profile.phonenumber':nsmphone,'profile.company': companyname, 'profile.brand': brandname,'profile.role': "NSM"}).then(l=>{
                if(l.length!=0){
                    obj.phone=true;
                }
                resolve(obj);
            }).catch(err=>{
                reject(err);
            });
        }).catch(err=>{
            reject(err);
        });
    });
}

var checkexistingrsm=function(rsmemail,rsmphone,companyname,brandname){
    return new Promise(function(resolve,reject){
        var obj={
            email:false,
            phone:false
        };
        users.find({'email': rsmemail }).then(x=>{
            if(x.length!=0){
                obj.email=true;
            }
        }).then(()=>{
            users.find({'profile.phonenumber':rsmphone,'profile.company': companyname, 'profile.brand': brandname,'profile.role': "RSM"}).then(l=>{
                if(l.length!=0){
                    obj.phone=true;
                }
                resolve(obj);
            }).catch(err=>{
                reject(err);
            });
        }).catch(err=>{
            reject(err);
        });
    });
}


var checkexistingasm=function(asmemail,asmphone,companyname,brandname){
    return new Promise(function(resolve,reject){
        var obj={
            email:false,
            phone:false
        };
        users.find({'email': asmemail }).then(x=>{
            if(x.length!=0){
                obj.email=true;
            }
        }).then(()=>{
            users.find({'profile.phonenumber':asmphone,'profile.company': companyname, 'profile.brand': brandname,'profile.role': "ASM"}).then(l=>{
                if(l.length!=0){
                    obj.phone=true;
                }
                resolve(obj);
            }).catch(err=>{
                reject(err);
            });
        }).catch(err=>{
            reject(err);
        });
    });
}


var checkexistingisr = function(isremail,isrphone,companyname,brandname){
    return new Promise(function(resolve,reject){
        var obj={
            email:false,
            phone:false
        };
        users.find({'email': isremail }).then(x=>{
            if(x.length!=0){
                obj.email=true;
            }
        }).then(()=>{
            users.find({'profile.phonenumber':isrphone,'profile.company': companyname, 'profile.brand': brandname,'profile.role': "ISR"}).then(l=>{
                if(l.length!=0){
                    obj.phone=true;
                }
                resolve(obj);
            }).catch(err=>{
                reject(err);
            });
        }).catch(err=>{
            reject(err);
        });
    });
}

var checkexistingadmin=function(adminemail,adminphone,companyname,brandname){
    return new Promise(function(resolve,reject){
        var obj={
            email:false,
            phone:false
        };
        users.find({'email': adminemail }).then(x=>{
            if(x.length!=0){
                obj.email=true;
            }
        }).then(()=>{
            users.find({'profile.phonenumber':adminphone,'profile.company': companyname, 'profile.brand': brandname,'profile.role': "Admin"}).then(l=>{
                if(l.length!=0){
                    obj.phone=true;
                }
                resolve(obj);
            }).catch(err=>{
                reject(err);
            });
        }).catch(err=>{
            reject(err);
        });
    });
}



var createuser=function(email,phone,brandname,brandcode,companyname,name,retailername,retailercode,superviserid,role){
   return users.insert({
        email: email, password: "admin12345", profile: {
            phonenumber: phone,
            brand: brandname,
            brandcode: brandcode,
            company: companyname,
            name: name,
            retailer:retailername,
            retailercode:retailercode,
            supportnumber: "011-39589888",
            role: role,
            superviserid:superviserid
        }
    });
}


var creatuserhierarchy=function(body,nsmid,rsmid,asmid){
    return new Promise(function(resolve,reject){
        retailers.insert({
            retailercode: body.retailercode,
            retailername: body.retailername,
            location: body.state,
            city: body.city,
            timestamp: new Date()
        }).then(()=>{
            users.find({ 'profile.company': body.companyname, 'profile.brand': body.brandname, 'email': body.adminemail, 'profile.role': "Admin" }).then(ad=>{
                if(ad.length==0){
                    users.insert({
                        email: body.adminemail, password: "admin12345", profile: {
                            phonenumber: body.adminphone,
                            brand: body.brandname,
                            brandcode: body.brandcode,
                            company: body.companyname,
                            name: body.adminname,
                            retailer:body.retailername,
                            retailercode:body.retailercode,
                            supportnumber: "011-39589888",
                            role: "Admin"
                        }
                    }).then(()=>{
                        if(nsmid=="" && rsmid=="" && asmid==""){
                            createuser(body.nsmemail,body.nsmphone,body.brandname,body.brandcode,body.companyname,body.nsmname,body.retailername,body.retailercode,"","NSM")
                           .then(nsm=>{
                            createuser(body.rsmemail,body.rsmphone,body.brandname,body.brandcode,body.companyname,body.rsmname,body.retailername,body.retailercode,nsm._id,"RSM")
                           .then(rsm=>{
                            createuser(body.asmemail,body.asmphone,body.brandname,body.brandcode,body.companyname,body.asmname,body.retailername,body.retailercode,rsm._id,"ASM")
                           .then(asm=>{
                            createuser(body.isremail,body.isrphone,body.brandname,body.brandcode,body.companyname,body.isrname,body.retailername,body.retailercode,asm._id,"ISR")
                            .then(()=>{
                                resolve(true);
                                  }).catch(err=>{
                                    reject(err);
                                });
                               }).catch(err=>{
                                reject(err);
                            });
                             }).catch(err=>{
                                reject(err);
                            });
                          }).catch(err=>{
                            reject(err);
                        });
                        }
                        else if(nsmid!="" && rsmid=="" && asmid==""){
                            createuser(body.rsmemail,body.rsmphone,body.brandname,body.brandcode,body.companyname,body.rsmname,body.retailername,body.retailercode,nsmid,"RSM")
                           .then(rsm=>{
                            createuser(body.asmemail,body.asmphone,body.brandname,body.brandcode,body.companyname,body.asmname,body.retailername,body.retailercode,rsm._id,"ASM")
                           .then(asm=>{
                            createuser(body.isremail,body.isrphone,body.brandname,body.brandcode,body.companyname,body.isrname,body.retailername,body.retailercode,asm._id,"ISR")
                            .then(()=>{
                                resolve(true);
                                  }).catch(err=>{
                                    reject(err);
                                });
                               }).catch(err=>{
                                reject(err);
                              });
                             }).catch(err=>{
                                reject(err);
                            });
                        }
                        else if(nsmid!="" && rsmid!="" && asmid==""){
                            createuser(body.asmemail,body.asmphone,body.brandname,body.brandcode,body.companyname,body.asmname,body.retailername,body.retailercode,rsmid,"ASM")
                            .then(asm=>{
                             createuser(body.isremail,body.isrphone,body.brandname,body.brandcode,body.companyname,body.isrname,body.retailername,body.retailercode,asm._id,"ISR")
                             .then(()=>{
                                 resolve(true);
                                   }).catch(err=>{
                                    reject(err);
                                });
                            }).catch(err=>{
                                reject(err);
                            });
                        }
                        else{
                            createuser(body.isremail,body.isrphone,body.brandname,body.brandcode,body.companyname,body.isrname,body.retailername,body.retailercode,asmid,"ISR")
                             .then(()=>{
                                 resolve(true);
                           }).catch(err=>{
                            reject(err);
                          });
                        }
                    })
                }
                else {
                    if(nsmid=="" && rsmid=="" && asmid==""){
                        createuser(body.nsmemail,body.nsmphone,body.brandname,body.brandcode,body.companyname,body.nsmname,body.retailername,body.retailercode,"","NSM")
                       .then(nsm=>{
                        createuser(body.rsmemail,body.rsmphone,body.brandname,body.brandcode,body.companyname,body.rsmname,body.retailername,body.retailercode,nsm._id,"RSM")
                       .then(rsm=>{
                        createuser(body.asmemail,body.asmphone,body.brandname,body.brandcode,body.companyname,body.asmname,body.retailername,body.retailercode,rsm._id,"ASM")
                       .then(asm=>{
                        createuser(body.isremail,body.isrphone,body.brandname,body.brandcode,body.companyname,body.isrname,body.retailername,body.retailercode,asm._id,"ISR")
                        .then(()=>{
                            resolve(true);
                              }).catch(err=>{
                                reject(err);
                            });
                           }).catch(err=>{
                            reject(err);
                        });
                         }).catch(err=>{
                            reject(err);
                        });
                      }).catch(err=>{
                        reject(err);
                    });
                    }
                    else if(nsmid!="" && rsmid=="" && asmid==""){
                        createuser(body.rsmemail,body.rsmphone,body.brandname,body.brandcode,body.companyname,body.rsmname,body.retailername,body.retailercode,nsmid,"RSM")
                       .then(rsm=>{
                        createuser(body.asmemail,body.asmphone,body.brandname,body.brandcode,body.companyname,body.asmname,body.retailername,body.retailercode,rsm._id,"ASM")
                       .then(asm=>{
                        createuser(body.isremail,body.isrphone,body.brandname,body.brandcode,body.companyname,body.isrname,body.retailername,body.retailercode,asm._id,"ISR")
                        .then(()=>{
                            resolve(true);
                              }).catch(err=>{
                                reject(err);
                            });
                           }).catch(err=>{
                            reject(err);
                        });
                         }).catch(err=>{
                            reject(err);
                        });
                    }
                    else if(nsmid!="" && rsmid!="" && asmid==""){
                        createuser(body.asmemail,body.asmphone,body.brandname,body.brandcode,body.companyname,body.asmname,body.retailername,body.retailercode,rsmid,"ASM")
                        .then(asm=>{
                         createuser(body.isremail,body.isrphone,body.brandname,body.brandcode,body.companyname,body.isrname,body.retailername,body.retailercode,asm._id,"ISR")
                         .then(()=>{
                             resolve(true);
                               }).catch(err=>{
                                reject(err);
                            });
                        }).catch(err=>{
                            reject(err);
                        }); 
                    }
                    else{
                        createuser(body.isremail,body.isrphone,body.brandname,body.brandcode,body.companyname,body.isrname,body.retailername,body.retailercode,asmid,"ISR")
                         .then(()=>{
                             resolve(true);
                       }).catch(err=>{
                        reject(err);
                    });
                    }
                }
            }).catch(err=>{
                reject(err);
            });
        }).catch(err=>{
            reject(err);
        });
    })
}




// var createusercontext= function(body){
//     return new Promise(function(resolve,reject){
//         let nsmid = "";
//         let rsmid="";
//         let asmid="";
//         retailers.insert({
//             retailercode: body.retailercode,
//             retailername: body.retailername,
//             location: body.state,
//             city: body.city,
//             timestamp: new Date()
//         }).then(()=>{
//             users.find({ 'profile.company': body.companyname, 'profile.brand': body.brandname, 'email': body.adminemail, 'profile.role': "Admin" }).then(ad=>{
//                 if(ad.length==0){
//                     users.insert({
//                         email: body.adminemail, password: "admin12345", profile: {
//                             phonenumber: body.adminphone,
//                             brand: body.brandname,
//                             brandcode: body.brandcode,
//                             company: body.companyname,
//                             name: body.adminname,
//                             retailer:body.retailername,
//                             retailercode:body.retailercode,
//                             supportnumber: "011-39589888",
//                             role: "Admin"
//                         }
//                     }).then(()=>{
//                         users.find({ 'profile.company': body.companyname, 'profile.brand': body.brandname, 'email': body.nsmemail, 'profile.role': "NSM" }).then(n=>{
//                             if(n.length==0){
//                                 users.insert({
//                                     email: body.nsmemail, password: "admin12345", profile: {
//                                         phonenumber: body.nsmphone,
//                                         brand: body.brandname,
//                                         brandcode: body.brandcode,
//                                         company: body.companyname,
//                                         name: body.nsmname,
//                                         retailer:body.retailername,
//                                         retailercode:body.retailercode,
//                                         supportnumber: "011-39589888",
//                                         role: "NSM"
//                                     }
//                                 }).then(nsm=>{
//                                     users.find({ 'profile.company': body.companyname, 'profile.brand': body.brandname, 'email': body.rsmemail, 'profile.role': "RSM" }).then(r=>{
//                                         if(r.length==0){
//                                             users.insert({
//                                                 email: body.rsmemail, password: "admin12345", profile: {
//                                                     phonenumber: body.rsmphone,
//                                                     brand: body.brandname,
//                                                     brandcode: body.brandcode,
//                                                     company: body.companyname,
//                                                     name: body.rsmname,
//                                                     retailer:body.retailername,
//                                                     retailercode:body.retailercode,
//                                                     supportnumber: "011-39589888",
//                                                     role: "RSM",
//                                                     superviserid:nsm._id
//                                                 }
//                                             }).then(rsm=>{
//                                                 users.find({ 'profile.company': body.companyname, 'profile.brand': body.brandname, 'email': body.asmemail, 'profile.role': "ASM" }).then(a=>{
//                                                     if(a.length==0){
//                                                         users.insert({
//                                                             email: body.asmemail, password: "admin12345", profile: {
//                                                                 phonenumber: body.asmphone,
//                                                                 brand: body.brandname,
//                                                                 brandcode: body.brandcode,
//                                                                 company: body.companyname,
//                                                                 name: body.asmname,
//                                                                 retailer:body.retailername,
//                                                                 retailercode:body.retailercode,
//                                                                 supportnumber: "011-39589888",
//                                                                 role: "ASM",
//                                                                 superviserid:rsm._id
//                                                             }
//                                                         }).then(asm=>{
//                                                             users.find({ 'profile.company': body.companyname, 'profile.brand': body.brandname, 'email': body.isremail, 'profile.role': "ASM" })
//                                                         })
//                                                     }
//                                                 })
//                                             })
//                                         }
//                                     })
//                                 })
//                             }
//                         })
//                     })
//                 }
                    
//             })
//         })
//     });
// }



function getCompany1(){
    // var userlist=users.find().toArray().filter(f => { return f.profile.company != "" && f.profile.company != undefined }).map(x => { return x.profile.company });
    // userlist = [...new Set(userlist.map(item => item))];
    // console.log(userlist);
    return ["de"];
}
module.exports={
    promiseforcompany,
    getCompany,
    getbrands,
    getadmin,
    getnsm,
    getrsm,
    getasm,
    checkretailercodeuniquesness,
    checkexistingnsm,
    checkexistingrsm,
    checkexistingasm,
    checkexistingisr,
    checkexistingadmin,
    creatuserhierarchy

}