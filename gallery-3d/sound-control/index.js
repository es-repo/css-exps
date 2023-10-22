import TemplatedCustomElement from '../templated-custom-element/index.js';

export default class SoundControl extends TemplatedCustomElement {
    static tag = 'sound-control';

    constructor() {
        super(SoundControl.tag);
    }

    async connectedCallback() {
        await this.whenTemplated();

        this.className = 'paused';

        const soundButton = this.shadowRoot.querySelector('img');
        const audio = this.shadowRoot.querySelector('audio');

        soundButton.addEventListener('click', () => {
            this.classList.toggle('paused');
            audio.paused ? audio.play() : audio.pause();
        })

        window.addEventListener('focus', () => {
            this.classList.contains('paused') ? audio.pause() : audio.play();
        })

        window.addEventListener('blur', () => {
            audio.pause();
        })
    }
}

customElements.define(SoundControl.tag, SoundControl);