const template = document.createElement('template');
template.innerHTML = `
  <style>
    h3 { 
      color: var(--green);
    }
  </style>
  <h3></h3>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    // create shadow root and append template
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // set up the name attribute
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
  }
}

window.customElements.define('user-card', UserCard);
