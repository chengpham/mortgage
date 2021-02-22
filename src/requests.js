const BASE_URL = 'https://swf52o6j46.execute-api.ca-central-1.amazonaws.com/dev';

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
    }).then(res=> res.json());
  }
}