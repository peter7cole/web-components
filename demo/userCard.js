const template = document.createElement('template');

template.innerHTML = `
<style>
  h3 { 
    color: var(--green);
  }

  p {
    color: var(--dark-grey);
  }

  .user-card {
    font-family: Arial, sans-serif;
    background: var(--light-grey);
    width: 32rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    border-bottom: .3rem solid var(--green);
  }
  
  .user-card img {
    width: 100%;
  }
  
  .user-card button {
    cursor: pointer;
    background-color: var(--green);
    color: var(--white);
    border: none;
    border-radius: 1rem;
    padding: .5rem 1rem;
  }
</style>

<div class="user-card">
  <img />
  <div>
    <h3></h3>
    <div class="info">
      <p><slot name="email" /></p>
      <p><slot name="phone" /></p>
    </div>
    <button id="toggle-info">Hide Info</button>
  </div>
</div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    // set base info state
    this.showInfo = true;

    // create shadow root and append template
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // define element references
    this.infoDiv = this.shadowRoot.querySelector('.info');
    this.toggleButton = this.shadowRoot.querySelector('#toggle-info');

    // set up the name attribute
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');

    // set up the avatar attribute
    this.shadowRoot.querySelector('img').src = this.hasAttribute('avatar')
      ? this.getAttribute('avatar')
      : 'https://http.cat/404';
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    if (this.showInfo) {
      this.infoDiv.style.display = 'initial';
      this.toggleButton.innerText = 'Hide Info';
    } else {
      this.infoDiv.style.display = 'none';
      this.toggleButton.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.toggleButton.addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.toggleButton.removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);
