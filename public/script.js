function logado() {
  if(getToken()){
    document.querySelector('#loggedout').style.visibility = 'hidden';
    document.querySelector('#loggedin').style.visibility = 'visible';
  }
}



function cadastrar() {
  var valida = false;
  if (document.getElementById('cadastraEmail').value.length < 3) {
    document.getElementById('validacaoCadastro').innerHTML = 'Email invalido';
  }else if (document.getElementById('cadastraPassword').value.length < 3){
    document.getElementById('validacaoCadastro').innerHTML = 'Senha invalida';
  }else{
    valida = true;
  }
  if (valida === true){
    const params = {
      username: document.getElementById('cadastraEmail').value,
      password: document.getElementById('cadastraPassword').value
    };

    axios.post('/cadastrar', params)
      .then(res => {
            document.getElementById('validacaoCadastro').innerHTML = 'Cadastrado Com Sucesso!';
      })
      .catch(error => {
        console.log(error);
      });
  }

}

function login() {
  var valida = false;
  if (document.getElementById('email').value.length < 3) {
    document.getElementById('validacao').innerHTML = 'Email invalido';
  }else if (document.getElementById('password').value.length < 3){
    document.getElementById('validacao').innerHTML = 'Senha invalida';
  }else{
    valida = true;
  }
  if (valida === true){
    const params = {
      username: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    axios.post('/login', params)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        document.querySelector('#loggedout').style.visibility = 'hidden';
        document.querySelector('#loggedin').style.visibility = 'visible';

      })
      .catch(error => {
        document.getElementById('validacao').innerHTML = 'Usuário não encontrado';
      });
  }
}

function getToken() {
  return localStorage.getItem('token');
}

function logout() {
  localStorage.clear();
  location.reload();
}

function search() {
  const search = document.getElementById('search').value;
  const postList = document.getElementById('posts');

  axios.get(`https://api.social-searcher.com/v2/search?q=${search}&network=twitter&key=11a91cc912fbd30f9dfdd8bff39dcaef&page=0&limit=10`)
    .then(res => {
      postList.innerHTML = "";
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