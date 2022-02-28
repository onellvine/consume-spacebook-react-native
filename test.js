var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:3333/api/1.0.0/user/9/photo',
  headers: { 
    'X-Authorization': 'f061eed292f4ad8fd65f881471d7b81d'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
