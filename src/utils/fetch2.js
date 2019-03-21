function parseJSON(response) {
  console.log(response.json());
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function fetchGet(url, params) {
  let str = '';

  if(typeof params === 'object' && params){
    str += '?';
    Object.keys(params).forEach(function(val){
      str += val + '=' + encodeURIComponent(params[val]) + '&';
    })
  }

  return fetch(url + str, {
    method : 'GET',
    mode : 'cors',
    // header: {
    //   'Accept': 'application/x-www-form-urlencoded',
    //   'Access-Control-Allow-Origin':'*',
    //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    // }
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}


export function fetchPost(url, params) {
  let formData = new FormData();

  if (params){
    for(let k in params){
        formData.append(k, params[k]);
    }
  }

  formData.append('oper_id', '11');
  formData.append('oper_name', 'kong');

  return fetch(url, {
    method : 'POST',
    mode : 'cors',
    body : formData
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));

}
