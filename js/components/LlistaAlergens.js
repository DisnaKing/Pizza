class LlistaAlergens extends HTMLElement{
    constructor() {
        //Cridar al constructor de la clase superior
        super();
        //Crear un shadowroot
        this.attachShadow({mode : 'open'})
    }
    static get observedAttributes() {
        return ['alergens'];
    }
    attributeChangedCallback() {
        this.render();
    }
    connectedCallback(){
        this.render();
    }
    render() {
        const alergens = JSON.parse(this.getAttribute('alergens') || '[]');
        console.log("Lista de alérgenos recibida:", alergens);
        this.shadowRoot.innerHTML = `
        <ul>
            ${alergens.map(a => `<li><img src="../../img/${a}.png" alt="${a}" title="${a}"></li>`).join('')}
        </ul>`;
    }
}
customElements.define('alergens-card',LlistaAlergens);