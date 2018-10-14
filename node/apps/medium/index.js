const axios = require('axios');
const config = require('../../config');
const mediumEntry = require('../../models/mongodb/mediumSchema');
const sleep = require('sleep');
const mediumAPI = 'https://medium.com/tag/technology/archive';
let year = 2006;
let month = '01';
let day = '01';
let error = [];

const getLimits = (data) => {
    data = JSON.parse(data.split('])}while(1);</x>')[1]);
    const months = data.payload.archiveIndex.monthlyBuckets.filter(month => month.hasStories);
    months.map(month => {
        reqApi(year, month.month)
            .then(res => {
                res = data = JSON.parse(res.data.split('])}while(1);</x>')[1]);
                res.payload.archiveIndex.dailyBuckets.map(day => {
                    if (day.hasStories) {
                        reqApi(year, month.month, day.day)
                            .then(res => {
                                prepareDocuments(res)
                            })
                            .catch(e => {
                                console.log("error");
                            })
                    }
                })
            })
            .catch(e => {
                console.log("limits")
            })
    });
    // error.pop()
};


const reqApi = async (year, month=null, day=null) => {
    let check = `${month}/${day}`;
    if(!month)
        check = ``;
    else if(!day)
        check = `${month}/`;
    try {
        console.log(`${mediumAPI}/${year}/${check}`);
        const response = await axios.get(`${mediumAPI}/${year}/${check}`, {
            headers:{
                cookie: config.mediumApi.cookie
            }
        });
        return Promise.resolve(response)
    }
    catch (e) {
        error.push({year, month, day});
        return Promise.reject(e)
    }
};

const insertData = (data) => {
    // sleep.msleep(200);
    mediumEntry.insertMany(data, {ordered:false}, (err, res) => {
        if(err){
            console.log("db error");
            // return Promise.reject()
        }
        else{
            console.log(year, 'Insert successful');
        }
    })
};

const prepareDocuments = (res) => {
    const data = JSON.parse(res.data.split('])}while(1);</x>')[1]);
    let docs = [];
    keys = {...data.payload.references.Post};
    for(key in keys) {
            try {
                docs.push({
                    // _id:keys[key].id,
                    creatorId: keys[key].creatorId,
                    title: keys[key].title,
                    createdAt: keys[key].createdAt,
                    updatedAt: keys[key].updatedAt,
                    subtitle: keys[key].virtuals.subtitle,
                    tags: keys[key].virtuals.tags.map(tag => tag.name).join(),
                    readingTime: keys[key].virtuals.readingTime,
                    totalClapCount: keys[key].virtuals.totalClapCount,
                });
            }
            catch (e) {
                console.log("error")
            }
    }
    if(docs.length > 0)
        insertData(docs);
};

const callByYear = () => {
    if(year <= 2018){
        reqApi(year)
            .then(res => {
                getLimits(res.data);
                year++;
                console.log(year, 'done');
            })
            .catch(e => {
                console.log(year,  'not processed');
            })
    }
    else{
        console.log("errors", error.length);
        error = error.filter(error => {
            reqApi(error.year, error.month, error.day)
                .then(res =>{
                    console.log('inserted');
                    return false;
                })
                .catch(e=>{
                    console.log("error overall");
                    return true;
                })
        })
    }
};

const genDocuments = (req, res) => {
    setInterval(callByYear, 5000);
};

module.exports = {
    // topStories,
    genDocuments
};