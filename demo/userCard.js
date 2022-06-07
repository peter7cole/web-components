const template = document.createElement('template');

template.innerHTML = `
  <style>
    h2 { 
      color: var(--green);
    }
    .user-card {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      width: 500px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 10px;
      margin-bottom: 15px;
      border-bottom: 5px solid var(--green);
    }
    
    .user-card img {
      width: 100%;
    }
    
    .user-card button {
      cursor: pointer;
      background-color: var(--green);
      color: var(--white);
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
    }
  </style>
  <div class="user-card">
    <img />
    <div>
      <h2></h2>
      <div>
        <p>Phone</p>
        <p>Email</p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    // create shadow root and append template
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // set up the name attribute
    this.shadowRoot.querySelector('h2').innerText = this.getAttribute('name');
    // set up the avatar attribute
    this.shadowRoot.querySelector('img').src = this.hasAttribute('avatar')
      ? this.getAttribute('avatar')
      : 'https://http.cat/404';
  }
}

window.customElements.define('user-card', UserCard);
