const Facebook = require("../models/facebook");
const Instagram = require("../models/instagram");
const {GenerateToken} = require("../libs/auth");
exports.GetCountries = async (req,res) => {
    try {
        const facebook = await Facebook.aggregate([
            {
                '$group': {
                    '_id': {
                        'country': '$user.ip.country'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$project': {
                    'country': '$_id.country',
                    '_id': 0,
                    'count': -1
                }
            }
        ])
        const instagram = await Instagram.aggregate([
            {
                '$group': {
                    '_id': {
                        'country': '$user.ip.country'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$project': {
                    'country': '$_id.country',
                    '_id': 0,
                    'count': -1
                }
            }
        ])
        return res.json({facebook,instagram})

    } catch (e) {
        return res.sendStatus(500)

    }
}

exports.GetGenders = async (req,res) => {
    try {
        const facebook = await Facebook.aggregate([
            {
                '$group': {
                    '_id': {
                        'gender': '$gender'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$project': {
                    '_id': 0,
                    'gender': '$_id.gender',
                    'count': 1
                }
            }
        ])
        const instagram = await Instagram.aggregate([
            {
                '$group': {
                    '_id': {
                        'gender': '$gender'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$project': {
                    '_id': 0,
                    'gender': '$_id.gender',
                    'count': 1
                }
            }
        ])
        return res.json({facebook,instagram})

    } catch (e) {
        return res.sendStatus(500)

    }
}

exports.GetUsers = async (req,res) => {
    try {
        const facebook = await Facebook.aggregate([
            {
                '$group': {
                    '_id': {
                        'username': '$username',
                        'gender': '$gender',
                        'by': '$user.user_id',
                        'by_gender': '$user.gender',
                        'by_location':"$user.ip.country",
                        'name': '$full_name',
                        "service":"$type"
                    },
                    'count': {
                        '$sum': 1
                    },
                    'data': {
                        '$push': {
                            'at': '$$ROOT.createdAt',
                            'photo': '$$ROOT.photo'
                        }
                    }
                }
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$project': {
                    '_id': 0,
                    'count': 1,
                    'username': '$_id.username',
                    'gender': '$_id.gender',
                    'name': '$_id.name',
                    'by': '$_id.by',
                    'by_gender': '$_id.by_gender',
                    'by_location':"$_id.by_location",
                    'service': '$_id.service',
                    'data': 1
                }
            }
        ])
        const instagram = await Instagram.aggregate([
            {
                '$group': {
                    '_id': {
                        'username': '$username',
                        'gender': '$gender',
                        'by': '$user.current_user.username',
                        'by_gender': '$user.gender',
                        'by_location':"$user.ip.country",
                        'name': '$full_name',
                        "service":"$type"

                    },
                    'count': {
                        '$sum': 1
                    },
                    'data': {
                        '$push': {
                            'at': '$$ROOT.createdAt',
                            'photo': '$$ROOT.photo'
                        }
                    }
                }
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$project': {
                    '_id': 0,
                    'count': 1,
                    'username': '$_id.username',
                    'gender': '$_id.gender',
                    'name': '$_id.name',
                    'by': '$_id.by',
                    'by_gender': '$_id.by_gender',
                    'by_location':"$_id.by_location",
                    'service': '$_id.service',

                    'data': 1
                }
            }
        ])
        results = [...facebook,...instagram]
        return res.json({results})

    } catch (e) {
        return res.sendStatus(500)

    }
}
exports.GetUsersGenders = async (req,res) => {
    try {
        const facebook = await Facebook.aggregate([
            {
                '$group': {
                    '_id': {
                        'gender': '$user.gender'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$project': {
                    '_id': 0,
                    'count': 1,
                    'gender': '$_id.gender',
                }
            }
        ])
        const instagram = await Instagram.aggregate([
            {
                '$group': {
                    '_id': {
                        'gender': '$user.gender'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$sort': {
                    'count': -1
                }
            }, {
                '$project': {
                    '_id': 0,
                    'count': 1,
                    'gender': '$_id.gender',
                }
            }
        ])
        return res.json({facebook,instagram})

    } catch (e) {
        return res.sendStatus(500)

    }
}




exports.GetUsersStats = async (req,res) => {
    try {
        const facebook = await Facebook.aggregate([
            {
                '$group': {
                    '_id': null,
                    'females': {
                        '$sum': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$$ROOT.gender', 'Female'
                                    ]
                                }, 1, 0
                            ]
                        }
                    },
                    'males': {
                        '$sum': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$$ROOT.gender', 'Male'
                                    ]
                                }, 1, 0
                            ]
                        }
                    },
                    'not_detected': {
                        '$sum': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$$ROOT.gender', 'false'
                                    ]
                                }, 1, 0
                            ]
                        }
                    },
                    'users': {
                        '$sum': 1
                    }
                }
            }
        ])
        const instagram = await Instagram.aggregate([
            {
                '$group': {
                    '_id': null,
                    'females': {
                        '$sum': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$$ROOT.gender', 'Female'
                                    ]
                                }, 1, 0
                            ]
                        }
                    },
                    'males': {
                        '$sum': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$$ROOT.gender', 'Male'
                                    ]
                                }, 1, 0
                            ]
                        }
                    },
                    'not_detected': {
                        '$sum': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$$ROOT.gender', 'false'
                                    ]
                                }, 1, 0
                            ]
                        }
                    },
                    'users': {
                        '$sum': 1
                    }
                }
            }
        ])
        return res.json({facebook,instagram})

    } catch (e) {
        return res.sendStatus(500)

    }
}



exports.AdminLogin = async (req,res) => {
    try {
        const { username,password } = req.body

        if (!username || !password) return res.sendStatus(404)

        if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD){
            return res.json({token:await GenerateToken()})
        }
        return res.sendStatus(401)

    } catch (e) {
        return res.sendStatus(500)

    }
}

exports.GetByCountry = async (req,res) => {

   
    try {
        const { country , service} = req.body
        let data = {}
        if (service === 'any'){
            data.facebook = await Facebook.aggregate([
                {
                  '$match': {
                    'user.ip.country': country
                  }
                }, {
                  '$group': {
                    '_id': {
                      'username': '$username', 
                      'gender': '$gender', 
                      'by': '$user.user_id', 
                      'by_gender': '$user.gender', 
                      'by_location': '$user.ip.country', 
                      'name': '$full_name', 
                      'service': '$type', 
                      'createdAt': '$createdAt'
                    }, 
                    'count': {
                      '$sum': 1
                    }, 
                    'data': {
                      '$push': {
                        'at': '$$ROOT.createdAt', 
                        'photo': '$$ROOT.photo'
                      }
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'username': '$_id.username', 
                    'gender': '$_id.gender', 
                    'name': '$_id.name', 
                    'by': '$_id.by', 
                    'by_gender': '$_id.by_gender', 
                    'by_location': '$_id.by_location', 
                    'service': '$_id.service', 
                    'data': 1, 
                    'createdAt': '$_id.createdAt'
                  }
                }, {
                  '$sort': {
                    'createdAt': -1
                  }
                }
              ])
            data.instagram = await Instagram.aggregate([
                {
                  '$match': {
                    'user.ip.country':country
                  }
                }, {
                  '$group': {
                    '_id': {
                      'username': '$username', 
                      'gender': '$gender', 
                      'by': '$user.user_id', 
                      'by_gender': '$user.gender', 
                      'by_location': '$user.ip.country', 
                      'name': '$full_name', 
                      'service': '$type', 
                      'createdAt': '$createdAt'
                    }, 
                    'count': {
                      '$sum': 1
                    }, 
                    'data': {
                      '$push': {
                        'at': '$$ROOT.createdAt', 
                        'photo': '$$ROOT.photo'
                      }
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'username': '$_id.username', 
                    'gender': '$_id.gender', 
                    'name': '$_id.name', 
                    'by': '$_id.by', 
                    'by_gender': '$_id.by_gender', 
                    'by_location': '$_id.by_location', 
                    'service': '$_id.service', 
                    'data': 1, 
                    'createdAt': '$_id.createdAt'
                  }
                }, {
                  '$sort': {
                    'createdAt': -1
                  }
                }
              ])

            return res.json(data)
        }else if (service === 'Facebook'){
            data[service] = await Facebook.find({'user.ip.country': country}).sort("-createdAt")

            return res.json(data)
        }else{
            data[service] = await Instagram.find({'user.ip.country': country}).sort("-createdAt")
        }


    } catch (e) {
        console.log(e);
        return res.sendStatus(500)

    }
}


exports.getAllRecordsFacebook = async  (req, res) => {
    const facebook = await Facebook.find({})

    return res.json(facebook)
}
exports.getAllRecordsInstagram = async  (req, res) => {
    const insta = await Instagram.find({})

    return res.json(insta)
}

exports.hashAllRecordsFacebook = async  (req, res) => {
   await Facebook.findByIdAndUpdate(req.body.id,{hash: req.body.hash})

    return res.sendStatus(200)
}


exports.hashAllRecordsInstagram = async (req, res) =>{
    await Instagram.findByIdAndUpdate(req.body.id,{hash: req.body.hash})
 
     return res.sendStatus(200)
 }