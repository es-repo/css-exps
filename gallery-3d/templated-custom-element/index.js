export default class TemplatedCustomElement extends HTMLElement {
    static #loadedResources = {};

    #whenTemplatedPromiseResolve = undefined;
    #whenTemplatedPromiseReject = undefined;

    #whenTemplatedPromise = new Promise((resolve, reject) => {
        this.#whenTemplatedPromiseResolve = resolve;
        this.#whenTemplatedPromiseReject = reject;
    });

    constructor(tag) {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        (async () => {
            try {
                if (!TemplatedCustomElement.#loadedResources[tag]) {
                    await TemplatedCustomElement.loadResources(tag);
                }

                const stylesLink = TemplatedCustomElement.#loadedResources[tag].stylesLink;
                shadowRoot.appendChild(stylesLink.cloneNode(true));

                const template = TemplatedCustomElement.#loadedResources[tag].template;
                shadowRoot.appendChild(template.content.cloneNode(true));

                this.#whenTemplatedPromiseResolve();
            }
            catch (error) {
                this.#whenTemplatedPromiseReject('Can not create root element.');
                throw error;
            }
        })();
    }

    async whenTemplated() {
        await this.#whenTemplatedPromise;
    }

    static async loadResources(tag) {
        const stylesLink = document.createElement('link');
        stylesLink.setAttribute('rel', 'stylesheet');
        stylesLink.setAttribute('href', `./${tag}/index.css`);

        const response = await fetch(`./${tag}/index.html`);
        if (!response.ok) {
            throw new Error(`Failed to fetch document: ${response.statusText}`);
        }

        const htmlContent = await response.text();
        const templateElement = document.createElement('template');
        templateElement.innerHTML = htmlContent.trim();
        const template = templateElement;

        TemplatedCustomElement.#loadedResources[tag] = {
            stylesLink,
            template,
        };
    }
}