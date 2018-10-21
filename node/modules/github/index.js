const db = require('./schema');
const axios = require('axios');
const config = require('../../config');
let baseStars = 150000;
let endStars = 0;
const intervalLimit = 5000;
const range = 200000;
let page = 1;
const gitAPI = 'https://api.github.com/search/repositories';
let error =false;

const topStories = async (req, res) => {
  const limit = (req.params.limit)?parseInt(req.params.limit):config.gitApi.apiResults;
  db.find().sort({stars:-1}).limit(limit).exec(
    (err, docs) => {
      res.json({docs});
    }
  );
};


const genDocuments = (req, res) => {
  timer = setInterval(reqGitApi, intervalLimit);
};

const reqGitApi = () => {
  axios.get(gitAPI, {
    headers: { Authorization: 'token a18c0bf48ca0a5f1ea0f485bf1bdd5ffd7ac156c' },
    params : {
      q: `stars:${baseStars}..${baseStars+range}`,
      sort: 'stars',
      order: 'asc',
      per_page: 100,
      page
    }
  })
    .then(res => {
      const length = res.data.items.length;
      if(length > 0){
        insertDocuments(res.data);
        page++;
        error = false;
        if(page === 11){
          page = 1;
          baseStars = res.data.items[length-1].stargazers_count;
          endStars = res.data.items[length-1].stargazers_count;
        }
      }
      else
      {
        baseStars = endStars;
        page = 1;
      }
    })
    .catch(e => {
      if(error) {
        baseStars = endStars;
        page=1;
      }
      console.log('Fetch error', e);
      error = true;
    });
};


const insertDocuments = (data) => {
  let arr = [];
  for(let i in data.items){
    const item = {...data.items[i]};
    arr.push({
      _id: item.id,
      title: item.name,
      description: item.description,
      created_at: item.created_at,
      language: item.language,
      updated_at: item.updated_at,
      tags_url: item.tags_url,
      link: item.link,
      stars: item.stargazers_count,
      forks: item.forks_count,
    });
  }
  db.insertMany(arr, {ordered:false}, (err, res) => {
    if(err){
      console.log(page, 'error');
    }
    else{
      console.log('Insert successful');
    }
  });
};

module.exports = {
  topStories,
  genDocuments
};
