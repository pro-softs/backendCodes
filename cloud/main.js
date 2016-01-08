var moment = require('cloud/moment.js');
var _ = require('underscore.js');


Parse.Cloud.beforeSave("UserIformation", function(request, response) {
    var date = (request.object.get("dateofbirth")).split("/");
    var year = parseInt(date[date.length-1]);
    var curTime = new Date();
    var curYear = curTime.getFullYear();

    var age = curYear - year;
    if(age > 0 && age <= 18) {
       request.object.set("age", "kid");
    }
    else if(age > 18 && age <=24) {
    	request.object.set("age", "youth");
    }
    else if(age > 24 && age <= 35) {
    	request.object.set("age", "mid");
    }
    else if(age > 35 && age <= 50) {
    	request.object.set("age", "old");
    } else {
    	request.object.set("age", "elder");
    }

   /* var percentile = Parse.Object.extend("Percentile");
    var perc = new percentile();
    var user = request.object.get("parent");

    perc.set("user", user);
    perc.set("code", "all");
    perc.set("processingspeed", 0);
    perc.set("flexibility", 0);
    perc.set("memory", 0 );
    perc.set("attention", 0);
    perc.set("problemsolving", 0);
    perc.set("visualperception", 0);
    perc.set("overall", 0);
    perc.save(null).then(
        function(res) {
            console.log("Crated perc object for all");
     },  function(error) {
            console,log("Error in creating object for perc");
   });
    perc = new percentile();

    perc.set("user", user);
    perc.set("code", "a");
    perc.set("processingspeed", 0);
    perc.set("flexibility", 0);
    perc.set("memory", 0 );
    perc.set("attention", 0);
    perc.set("problemsolving", 0);
    perc.set("visualperception", 0);
    perc.set("overall", 0);
    perc.save(null).then(
        function(res) {
            console.log("Crated perc object for age");
     },  function(error) {
            console,log("Error in creating object for perc");
   });
    perc = new percentile();

    perc.set("user", user);
    perc.set("code", "ag");
    perc.set("processingspeed", 0);
    perc.set("flexibility", 0);
    perc.set("memory", 0 );
    perc.set("attention", 0);
    perc.set("problemsolving", 0);
    perc.set("visualperception", 0);
    perc.set("overall", 0);
    perc.save(null).then(
        function(res) {
            console.log("Crated perc object for age-country");
     },  function(error) {
            console,log("Error in creating object for perc");
   });
    perc = new percentile();

    perc.set("user", user);
    perc.set("code", "agc");
    perc.set("processingspeed", 0);
    perc.set("flexibility", 0);
    perc.set("memory", 0 );
    perc.set("attention", 0);
    perc.set("problemsolving", 0);
    perc.set("visualperception", 0);
    perc.set("overall", 0);
    perc.save(null).then(
        function(res) {
            console.log("Crated perc object for age-gender-country");
     },  function(error) {
            console,log("Error in creating object for perc");
   });
    perc = new percentile();

    perc.set("user", user);
    perc.set("code", "c");
    perc.set("processingspeed", 0);
    perc.set("flexibility", 0);
    perc.set("memory", 0 );
    perc.set("attention", 0);
    perc.set("problemsolving", 0);
    perc.set("visualperception", 0);
    perc.set("overall", 0);
    perc.save(null).then(
        function(res) {
            console.log("Crated perc object for country");
     },  function(error) {
            console,log("Error in creating object for perc");
   });
    perc = new percentile();

    perc.set("user", user);
    perc.set("code", "ac");
    perc.set("processingspeed", 0);
    perc.set("flexibility", 0);
    perc.set("memory", 0 );
    perc.set("attention", 0);
    perc.set("problemsolving", 0);
    perc.set("visualperception", 0);
    perc.set("overall", 0);
    perc.save(null).then(
        function(res) {
            console.log("Crated perc object for age-country");
     },  function(error) {
            console,log("Error in creating object for perc");
   });
    perc = new percentile();

    perc.set("user", user);
    perc.set("code", "g");
    perc.set("processingspeed", 0);
    perc.set("flexibility", 0);
    perc.set("memory", 0 );
    perc.set("attention", 0);
    perc.set("problemsolving", 0);
    perc.set("visualperception", 0);
    perc.set("overall", 0);
    perc.save(null).then(
        function(res) {
            console.log("Crated perc object for gender");
     },  function(error) {
            console,log("Error in creating object for perc");
   });
    perc = new percentile();

    perc.set("user", user);
    perc.set("code", "gc");
    perc.set("processingspeed", 0);
    perc.set("flexibility", 0);
    perc.set("memory", 0 );
    perc.set("attention", 0);
    perc.set("problemsolving", 0);
    perc.set("visualperception", 0);
    perc.set("overall", 0);
    perc.save(null).then(
        function(res) {
            console.log("Crated perc object for gender-country");
     },  function(error) {
            console,log("Error in creating object for perc");
   });*/ 
    response.success();
});

Parse.Cloud.afterSave("GameInfo", function(request) {
    var user = request.object.get("user");
    var query = new Parse.Query("GameInfo");
    var startDate;
    var category;
    
    var end;
    var endMom;
    var startMom;
    var start ;
    var avgAni = 0;
    var d;
    var h;
    var startOfEnd;
    var count;

    category = request.object.get("category");
    end = request.object.createdAt;
  
    console.log(end);
    endMom=new moment(end);

    query = new Parse.Query("GameInfo");
    query.equalTo("user",user);
    query.equalTo("category", category);
    query.ascending("createdAt");
    query.first({
        success: function(res) {
            startDate = res.createdAt;
            startMom = new moment(startDate);
            console.log(startDate + "    "+ end);
            console.log(startMom + "    " + endMom);
            d = endMom.diff(startMom, 'days') + 1;

            console.log(res);
            console.log(d);
        }, error: function(error) {
            console.log("error retreiving the category, error code :");
        }
    });

    
    startOfEnd = new moment(end);
    startOfEnd.startOf('day');
    h = endMom.diff(startOfEnd, 'hours');
    query.greaterThanOrEqualTo("createdAt",startOfEnd.toDate());
    query.find({
        success: function(result) {
            for(var i=0;i<result.length;++i) {
                avgAni += result[i].get("ani");
            }
            avgAni /= result.length;
            count = result.length;
        },
        error: function() {
            console.log("Cant get the total games played, error code: " );
        }
    });
    
    
    query = new Parse.Query("history30");
    query.equalTo("user",user);
    query.equalTo("category", category);
    query.find({
        success: function(res) {
            if(res.length != 0) {
                if(d <= 30) {
                res[0].set("day" + d, avgAni);
                res[0].save(null).then(
                    function(res) {
                        console.log(d);
                        console.log("Average ani for day" + d + ", for category" + category + "been saved..");
                    },
                    function(error) {
                        console.log("Error in saving average ani for day" + d + ", for category" + category  );
                    });
                } else {
                    if(count == 1) {
                        for(var k =0; k<(d - 30); ++k)
                            {
                                for(var i = 1; i<30; ++i) {
                            var j= i+1;
                            var next = res[0].get("day" + j);
                            res[0].set("day" + i, next);
                        }
                        res[0].set("day" + 30, 0);
                    }
                        res[0].set("day" + 30, avgAni);
                        res[0].save(null).then(
                             function(res) {
                                 console.log("Average ani shifted for category " + category + "..");
                                 avgAni=0;
                             },
                             function(error) {
                                 console.log("Error in shifting Anis for category" + category + ", error code" );
                             });
                    } else {
                        res[0].set("day" + 1, avgAni);
                        res[0].save(null).then(
                               function(res) {
                                  console.log("Average ani for day" + d + ", for category" + category + "been saved..");
                                  avgAni=0;
                               },
                               function(error) {
                                  console,log("Error in saving average ani for day" + da+ ", for category" + category + ", error code" );
                        });
                    }
                } 
             
        } else {
                var histry30 = Parse.Object.extend("history30");
                var history = new histry30();

                history.set("user", user);
                history.set("category", category);
                history.set("day" + 1, avgAni);
                for(var i=2; i<31; ++i) {
                    history.set("day"+i, 0);
                }

                history.save(null, {
                    success: function(history) {
                        console.log("Average ani for day 1, for category" + category + "been created..");
                        avgAni=0;
                    },
                    error: function(error) {
                        console.log("Error in creating average ani for day 1, for category" + category + ", error code" );
                    }
                });
            }
        }, error: function(error) {
            console.log("Cannot find number of users, error code" );
        }
    });
  
query = new Parse.Query("Count30");
    query.equalTo("user",user);
    query.equalTo("category", category);
    query.find({
        success: function(res) {
            if(res.length != 0) {
                if(d <= 30) {
                res[0].set("day" + d, count);
                res[0].save(null).then(
                    function(res) {
                        console.log(d);
                        console.log("Count for day" + d + ", for category" + category + "been saved..");
                    },
                    function(error) {
                        console.log("Error in saving count for day" + d + ", for category" + category + ", error code" );
                    });
                } else {
                    if(count == 1) {
                         for(var k =0; k<(d - 30); ++k)
                            {
                                for(var i = 1; i<30; ++i) {
                            var j= i+1;
                            var next = res[0].get("day" + j);
                            res[0].set("day" + i, next);
                        }
                        res[0].set("day" + 30, 0);
                    }
                        res[0].set("day" + 30, count);
                        res[0].save(null).then(
                             function(res) {
                                 console.log("Count shifted for category " + category + "..");
                             },
                             function(error) {
                                 console,log("Error in shifting count for category" + category + ", error code" );
                             });
                    } else {
                        res[0].set("day" + 30, count);
                        res[0].save(null).then(
                               function(res) {
                                  console.log("Count for day" + d + ", for category" + category + "been saved..");
                               },
                               function(error) {
                                  console,log("Error in saving count for day" + d + ", for category" + category + ", error code" );
                        });
                    }
                } 
        } else {
                var count30 = Parse.Object.extend("Count30");
                var history = new count30();

                history.set("user", user);
                history.set("category", category);
                history.set("day" + 1, count);
                for(var i=2; i<31; ++i) {
                    history.set("day"+i, 0);
                }


                history.save(null, {
                    success: function(history) {
                        console.log("Average ani for day 1, for category" + category + "been created..");
                    },
                    error: function(error) {
                        console.log("Error in creating average ani for day 1, for category" + category + ", error code" );
                    }
                });
            }
        }, error: function(error){
            console.log("Cannot find count for 30 days ");
        }
    });


    
    if(h < 24)
      h = Math.floor(h/4) + 1;
    else
      h = Math.floor(h/4);

    query = new Parse.Query("GameInfo");
    query.equalTo("user", user);
    query.equalTo("category", category);
    startOfEnd.add(h-1, 'h');
    query.greaterThanOrEqualTo("createdAt", startOfEnd.toDate());

    query.find({
        sucess: function(result) {
            for(var i=0; i<result.length;++i){
                avgAni += result[i].get("avgAni");
            }
            avgAni /= result.length;
            count = result.length;
        },
        error: function(error) {
            console.log("Error in finding average hour wise, error code :" );
        }
    });
    var sum =0;
    query = new Parse.Query("history24");
    query.equalTo("user", user);
    query.equalTo("category", category);
    query.find({
        success: function(res){
            if(res.length != 0) {
                for(var i =1; i<7; ++i) {
                      if(i != h)
                          sum+= res[0].get("quatr" + i);
                }
                sum += avgAni;
                res[0].set("quatr" + h, avgAni);
                res[0].set("overall", sum);
                res[0].save(null).then(
                    function(res) {
                        console.log("Average ani for quarter" + h + ", for category" + category + "been saved..");
                    },
                    function(error) {
                        console,log("Error in saving average ani for quarter" + h + ", for category" + category + ", error code" );
                    });
            } else {
                var history24 = Parse.Object.extend("history24");
                var history = new history24();

                history.set("user", user);
                history.set("category", category);
                history.set("quatr" + h, avgAni);
                history.set("overall", avgAni);
                for(var i =1 ; i<7; ++i) {
                    if(i != h) {
                    history.set("quatr" + i, 0);
                }
                }

                history.save(null, {
                    success: function(history) {
                        console.log("Average ani for hour" + h + "for category" + category + "been created..");
                    },
                    error: function(error) {
                        console.log("Error in creating average ani for hour" + h + "for category" + category + ", error code" );
                    }
                });
            }


        },
        error: function(error) {
            console.log("Error! ");
        }
    });
   query = new Parse.Query("Count24");
    query.equalTo("user", user);
    query.equalTo("category", category);
    query.find({
        success: function(res){
            if(res.length != 0) {
                res[0].set("quatr" + h, count);
                res[0].save(null).then(
                    function(res) {
                        console.log("Count for quarter" + h + ", for category" + category + "been saved..");
                    },
                    function(error) {
                        console.log("Error in saving count for quarter" + h + ", for category" + category + ", error code" );
                    });
            } else {
                var count24 = Parse.Object.extend("Count24");
                var history = new count24();

                history.set("user", user);
                history.set("category", category);
                history.set("quatr" + h, count);
                for(var i =1 ; i<7; ++i) {
                    if(i != h) {
                    history.set("quatr" + i, 0);
                }
                }

                history.save(null, {
                    success: function(history) {
                        console.log("Count for quarter" + h + "for category" + category + "been created..");
                    },
                    error: function(error) {
                        console.log("Error in creating count for quarter" + h + "for category" + category + ", error code" );
                    }
                });
            }
        },
        error: function(error) {
            console.log("Error! ");
        }
    });
});


Parse.Cloud.define("getHis30", function(request, response) {
	var user = request.user;
	var query = new Parse.Query("history30");

	query.equalTo("user", user);

	query.find({
        success: function(result) {
        	var resultsJson = [];
        	 for(var i=0; i<result.length;++i) {
                var obj = result[i];
                var resultJson = {'cat':"", 'arr': []};
                resultJson.cat = obj.get("category");

                for(var j=0; j<30;++j) {
                    var x = j+1;
                    resultJson.arr[j] = obj.get("day" + x);
                }
                resultsJson.push(resultJson);
        	 }
        	 response.success(resultsJson);
        },
        error: function(error) {
        	response.error("Error in retrieving queries, error code" );
        }
	});
});

Parse.Cloud.define("getHis24", function(request, response) {
	var user = request.user;
	var query = new Parse.Query("history24");

	query.equalTo("user", user);
	query.find({
        success: function(result) {
            var resultsJson = [];
             for(var i=0; i<result.length;++i) {
                var obj = result[i];
                var resultJson = {'cat':"", 'overall': 0, 'arr': []};
                resultJson.cat = obj.get("category");
                resultJson.overall = obj.get("overall");

                for(var j=0; j<6;++j) {
                    var x = j+1;
                    resultJson.arr[j] = obj.get("quatr" + x);
                }
                resultsJson.push(resultJson);
             }
             response.success(resultsJson);
        },
        error: function(error) {
        	response.error("Error in retrieving queries, error code" );
        }
	}); 
});

Parse.Cloud.define("getCount30", function(request, response) {
	var user = request.user;
	var query = new Parse.Query("Count30");

	query.equalTo("user", user);
	//query.select("category", "day1", "day2", "day3", "day4", "day5", "day6", "day7", "day8", "day9", "day10", "day11", "day12", "day13", "day14", "day15", "day16", "day17", "day18", "day19", "day20", "day21", "day22", "day23", "day24", "day25", "day26", "day27", "day28", "day29", "day30");
	query.find({
        success: function(result) {
        	 var resultsJson = [];
        	for(var i=0; i<result.length;++i) {
                var obj = result[i];
                var resultJson = {'cat':"", 'arr': []};
                resultJson.cat = obj.get("category");

                for(var j=0; j<30;++j) {
                    var x = j+1;
                    resultJson.arr[j] = obj.get("day" + x);
                }
                resultsJson.push(resultJson);
             }
        	 response.success(resultsJson);
        },
        error: function(error) {
        	response.error("Error in retrieving queries, error code" );
        }
	});
});

Parse.Cloud.define("getCount24", function(request, response) {
	var user = request.user;
	var query = new Parse.Query("Count24");

	query.equalTo("user", user);
	query.select("category", "quatr1", "quatr2", "quatr3", "quatr4", "quatr5", "quatr6");
	query.find({
        success: function(result) {
        	 var resultsJson = [];
        	 for(var i=0; i<result.length;++i) {
                var obj = result[i];
                var resultJson = {'cat':"", 'arr': []};
                resultJson.cat = obj.get("category");

                for(var j=0; j<6;++j) {
                    var x = j+1;
                    resultJson.arr[j] = obj.get("quatr" + x);
                }
                resultsJson.push(resultJson);
             }
        	 response.success(resultsJson);
        },
        error: function(error) {
        	response.error("Error in retrieving queries, error code" );
        }
	});
});



/*arse.Cloud.job("findPercentile", function(request, status) {
    
    var qry = new Parse.Query(Parse.User);
     Parse.Cloud.useMasterKey();
    qry.each(function(user) {

    //console.log(user);

    var userid = user.id;
    var overall_ani = 0;
    var divide = 0;
    var cat;
    var ani;
    var usrA = [], usrAG = [], usrAGC = [], usrAC = [], usrG = [], usrC = [], usrGC = [], usrAll = [];

    var age, gender, country;

    var userQuery = new Parse.Query("UserIformation");
    userQuery.equalTo("parent", user);

    userQuery.find({
        success: function(res) {
            if(res.length!=0) {
                var overall = 0;
                var qry1 = new Parse.Query("history24");
                qry1.equalTo("user", user);
                qry1.find().then(function(results) {
                    var promise=Parse.Promise.as();

                    
                    _.each(results, function(result) {
                        promise = promise.then(function(){
                            var ani = result.get("overall");
                            var cat = result.get("category");
                            overall+=ani;
                            var skip = 0;

                            var query = new Parse.Query("history24");
                            query.equalTo("category", cat);
                            query.limit(1000)

                            return query.count().then(function(total) {
                                    var query1 = new Parse.Query("history24");
                                    query1.equalTo("category", cat);
                                    query1.lessThanOrEqualTo("overall", ani);
                                    query1.limit(1000);

                                    query1.count().then(function(count) {
                                            var perc = ((count-1)/total)*100;
                                            var percQuery = new Parse.Query("Percentile");
                                            percQuery.equalTo("user", user);
                                            
                                            console.log("percAll:" + perc);
                                            percQuery.find().then(function(res) {
                                                if(res.length!=0) {
                                                   res[0].set(cat, perc);
                                                   res[0].save(null).then(function(res) {
                                                        console.log("Saved perventile for all and cat:" + cat);
                                                    }, function(error) {
                                                        console.log("cant save percentile" + error.code + " " + error.message);
                                                   });
                                               } else {
                                                    var percentile = Parse.Object.extend("Percentile");
                                                    var perc = new percentile();
                                                
                                                    perc.set("user", user);
                                                    perc.set(cat, perc);
                                                    if(cat!='processingspeed')
                                                        perc.set("processingspeed", 0);
                                                    if(cat!='flexibility')
                                                        perc.set("flexibility", 0);
                                                    if(cat!='memory')
                                                        perc.set("memory", 0 );
                                                    if(cat!='attention')
                                                        perc.set("attention", 0);
                                                    if(cat!='problemsolving')
                                                        perc.set("problemsolving", 0);
                                                    if(cat!='visualperception')
                                                        perc.set("visualperception", 0);
                                                    
                                                    perc.save(null).then(
                                                        function(res) {
                                                            console.log("Crated perc object for all");
                                                     },  function(error) {
                                                            console.log("Error in creating object for perc");
                                                   });
                                               }
                                            }, function(error) {
                                                console.log("Error updating percentile for this user in percentile table!!");
                                            });
                                    }, function(error) {
                                        console.log("Cannot count required number of users!!!" + error.code + " " + error.message);
                                    });
                            }, function(error) {
                                console.log("Cannot find total numbers of users!!" + error.code + " " + error.message);
                            });

                        });
                    });
                    //return promise;
                }).then(function() {
                       console.log("saved successfull.!!!");
                   }, function(error) {
                    console.log("Cant save percentile");
                   });
            }
        }, error: function(error) {
            console.log("Error in finding data of the user!!!!!");
        }
    });
                
   }).then(function() {
       status.success("Done");
   }, function(error) {
       status.error("Not done successfully!!!" + error.code + " " + error.message);
   });   
}); 

Parse.Cloud.job("findPercentile", function(request, status) {
     var qry = new Parse.Query(Parse.User);
     Parse.Cloud.useMasterKey();
    qry.each(function(user) {

    //console.log(user);
                var qry1 = new Parse.Query("history24");
                qry1.equalTo("user", user);
                qry1.find().then(function(results) {
                    if(results.length!=0) {
                         var promise=Parse.Promise.as();
                    
                    _.each(results, function(result) {
                        promise = promise.then(function(){
                            var ani = result.get("overall");
                            var cat = result.get("category");
                            var perc =0;

                            if(ani==0) {
                                perc = 0;
                            }
                            else if(ani>0 && ani<=1000) {
                                perc = ((ani-250)/750)*100;
                            }
                            else if(ani>1000) {
                                perc = 99
                            }

                            var percQuery = new Parse.Query("Percentile");
                                            percQuery.equalTo("user", user);
                                            
                                            console.log("percAll:" + perc);
                                        return percQuery.find().then(function(res) {
                                                if(res.length!=0) {
                                                   res[0].set(cat, perc);
                                                   res[0].save(null).then(function(res) {
                                                        console.log("Saved perventile for all and cat:" + cat);
                                                    }, function(error) {
                                                        console.log("cant save percentile" + error.code + " " + error.message);
                                                   });
                                               } else {
                                                    var percentile = Parse.Object.extend("Percentile");
                                                    var perc1 = new percentile();
                                                
                                                    perc1.set("user", user);
                                                    perc1.set(cat, perc);
                                                    if(cat!='processingspeed')
                                                        perc1.set("processingspeed", 0);
                                                    if(cat!='flexibility')
                                                        perc1.set("flexibility", 0);
                                                    if(cat!='memory')
                                                        perc1.set("memory", 0 );
                                                    if(cat!='attention')
                                                        perc1.set("attention", 0);
                                                    if(cat!='problemsolving')
                                                        perc1.set("problemsolving", 0);
                                                    if(cat!='visualperception')
                                                        perc1.set("visualperception", 0);
                                                    
                                                    perc1.save(null).then(
                                                        function(res) {
                                                            console.log("Crated perc object for all");
                                                     },  function(error) {
                                                            console.log("Error in creating object for perc");
                                                   });
                                                }
                                            }, function(error) {
                                                console.log("Cannot find perc!!!");
                                            });
                                     });
                   });
             return promise;
         }
         });
   }).then(function() {
       status.success("SAved successfully");
   }, function(error) {
       status.error("Cant save "+" "+error.code+ "  " + error.message);
   });
});

Parse.Cloud.define("percentileOverall", function(request, response) {
    var user = {
        __type: "Pointer",
        className: "_User",
        objectId: request.params.userId };

    var ani = request.params.ani;
    var usrArr = [];
    var arr = request.params.arr;
    var code = request.params.code;
    var count = 0;

     console.log(user + "   " + code);

    for(var i = 0 ; i<arr.length ; ++i) {
        var u = {
        __type: "Pointer",
        className: "_User",
        objectId: arr[i] };
        usrArr[i] = u;
    }

    _.each(usrArr, function(usr){
        var overall = 0;
         var query = new Parse.Query("histrory24");
         query.equalTo("user",usr);
         query.find().then(function(results)
         {
          if(results.length != 0) {
             for(var i =0; i<results.length; ++i) {
              overall += results[i].get("overall");
             }
             overall /= results.length;
          }
         }).then(function(){
          if(overall <= ani) {
            ++count;
          }
         });
     });

     var q = new Parse.Query("Percentile");
            q.equalTo("user", user);
            q.equalTo("code", code);

            q.find({
                success: function(res) {
                   if(res.length != 0) {
                    var perc = (count*100)/(usrArr.length+1);
                    console.log(code + ":::::" + res[0]);
                    res[0].set(cat, perc);
                    res[0].save(null).then(
                        function(res) {
                            response.success("percentile calculated for "+request.params.code);
                            
                        }, function(error) {
                            console.log("Percentile not calculated");
                             response.error("Cant calculate");
                        });
                } else {
                    console.log("Error Error Error Error");
                }
                }, error: function(error) {
                    console.log("Cannot count users");
                }
            });


}); */

Parse.Cloud.define("getPercentile", function(request, response) {
    var user = request.user;

     var div;

     var resultJson = {"processingspeed": 0, "flexibility": 0, "memory": 0, "attention": 0, "problemsolving": 0, "visualperception": 0, "overall": 0 };
    var query = new Parse.Query("history24");
    var overAll = 0;
    query.equalTo("user", user);

    query.find().then(function(results) {
       var promise = Parse.Promise.as();
       div = results.length;
       if(results.length==0) {
             response.success(resultJson);
       } else {
       _.each(results, function(result) {
                        promise = promise.then(function(){
                            var ani = result.get("overall");
                            overAll+=ani;

                            
                            var cat = result.get("category");
                            var perc =0;
                            

                            if(ani==0) {
                                perc = 0;
                            }
                            else if(ani>0 && ani<=1000) {
                                perc = (((ani-250)/900)*100)+10;
                            }
                            else if(ani>1000) {
                                perc = (((ani-1000)/1000)*3)+94;
                            }
                            

                            var percQuery = new Parse.Query("Percentile");
                                            percQuery.equalTo("user", user);
                                            
                                            console.log("percAll:" + perc);
                                            //console.log("percOverall: "+percOverall);
                                        percQuery.find().then(function(res) {
                                                if(res.length!=0) {
                                                   res[0].set(cat, perc);
                                                   res[0].set("overall", 0);
                                                   res[0].save(null).then(function(res) {
                                                        console.log("Saved perventile for all and cat:" + cat);
                                                    }, function(error) {
                                                        console.log("cant save percentile" + error.code + " " + error.message);
                                                   });
                                               } else {
                                                    var percentile = Parse.Object.extend("Percentile");
                                                    var perc1 = new percentile();
                                                
                                                    perc1.set("user", user);
                                                    perc1.set(cat, perc);
                                                    if(cat!='processingspeed')
                                                        perc1.set("processingspeed", 0);
                                                    if(cat!='flexibility')
                                                        perc1.set("flexibility", 0);
                                                    if(cat!='memory')
                                                        perc1.set("memory", 0 );
                                                    if(cat!='attention')
                                                        perc1.set("attention", 0);
                                                    if(cat!='problemsolving')
                                                        perc1.set("problemsolving", 0);
                                                    if(cat!='visualperception')
                                                        perc1.set("visualperception", 0);
                                                    perc1.set("overall", 0);
                                                    
                                                    perc1.save(null).then(
                                                        function(res) {
                                                            console.log("Crated perc object for all");
                                                     },  function(error) {
                                                            console.log("Error in creating object for perc");
                                                   });
                                                }
                                            }, function(error) {
                                                console.log("Cannot find perc!!!");
                                            });
                                        });
                     }).then(function() {
          overAll/=div;
          var percOverall = 0;
                            if(overAll==0) {
                                percOverall = 0;
                            }
                            else if(overAll>0 && overAll<=1000) {
                                percOverall = (((overAll-250)/900)*100)+10;
                            }
                            else if(overAll>1000) {
                                percOverall = (((overAll-1000)/1000)*3)+94;
                            }

                            var percQuery = new Parse.Query("Percentile");
                                            percQuery.equalTo("user", user);
                                            
                                        percQuery.find().then(function(res) {
                                                if(res.length!=0) {
                                                   res[0].set("overall", percOverall);
                                                   res[0].save(null).then(function(res) {
                                                        console.log("Saved perventile for all and cat:" + cat);
                                                    }, function(error) {
                                                        console.log("cant save percentile" + error.code + " " + error.message);
                                                   });
                                               }


                                        });
          });
        }
             return promise;
    }).then(function(){
         var query = new Parse.Query("Percentile");
    query.equalTo("user", user);
    query.find({
        success: function(result) {
             if(result.length!=0) {
                var obj = result[0];
                
            
                resultJson.processingspeed = obj.get("processingspeed");
                resultJson.flexibility = obj.get("flexibility");
                resultJson.memory = obj.get("memory");
                resultJson.attention = obj.get("attention");
                resultJson.problemsolving = obj.get("problemsolving");
                resultJson.visualperception = obj.get("visualperception");
                resultJson.overall = obj.get("overall");
             }
             response.success(resultJson);
        },
        error: function(error) {
            response.error("Error in retrieving queries, error code" );
        }
    });
  });
});
