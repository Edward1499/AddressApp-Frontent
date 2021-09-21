import axios from 'axios';


axios.interceptors.request.use(function(config) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(userInfo) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
}, function(err) {
    return Promise.reject(err);
});


axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401 && localStorage.getItem('userInfo')) {
    localStorage.clear();
    window.location.href = '/'
  }
  return Promise.reject(error)
})