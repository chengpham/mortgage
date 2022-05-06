const BASE_URL = 'https://03lcv8pktf.execute-api.ca-central-1.amazonaws.com/dev';

export const Rates = {
  index() {
    return fetch(`${BASE_URL}/rates`)
      .then(res => {
        return res.json();
      })
  },
  create(params) {
    return fetch(`${BASE_URL}/rates`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }).then(res => res.json())
  },
  show(id) {
    return fetch(`${BASE_URL}/rates/${id}`)
      .then(res => res.json())
  },
  update(id,params){
    return fetch(`${BASE_URL}/rates/${id}`,{
      method: "PATCH",
      credentials: "include",
      headers:{  "Content-Type":"application/json" },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  getRates(){
    return fetch(`${BASE_URL}/getrates`, {
      headers: { 'Content-Type': 'application/json' }
    }).then(res =>  res.json())
  }
}

export const ChartsData = {
  create(params){
    return fetch(`${BASE_URL}/chart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
}

export const Stock = {
  getStock(param){
    return fetch(`${BASE_URL}/getstock/${param}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
  }
}