function login() {
  const params = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  axios.post('https://reqres.in/api/login', params)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('token', token);
    });
}

function getToken() {
  return localStorage.getItem('token');
}

function logout() {
  localStorage.clear();
}

function search() {
  const search = document.getElementById('search').value;
  const postList = document.getElementById('posts');

  axios.get(`https://api.social-searcher.com/v2/search?q=${search}&network=twitter&key=11a91cc912fbd30f9dfdd8bff39dcaef&page=0&limit=10`)
    .then(res => {
      const { posts } = res.data;
      for (post of posts) {
        const item = document.createElement('li');
        item.innerHTML = (
          `<a href="${post.url}">
            <div>
              <img src="${post.user.image}">
              <span>${post.user.name}</span>
            </div>
            <p>${post.text}</p>
          </a>`
        )
        postList.appendChild(item);
        // console.log(item);
      }
    })
    .catch(error => {
      console.log(error);
    });
}