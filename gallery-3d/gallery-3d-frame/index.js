import TemplatedCustomElement from '../templated-custom-element/index.js';

export default class Gallery3dFrame extends TemplatedCustomElement {
    static tag = 'gallery-3d-frame';
    static minVizibleZ = 100;

    #z = 0;
    #distanceBetweenFrames = 1;

    constructor() {
        super(Gallery3dFrame.tag);
    }

    set z(value) {
        this.#setZ(value);
    }

    async #setZ(value) {
        this.#z = value;

        await this.whenTemplated();

        this.setAttribute(
            'style',
            `translate: 0 0 ${this.#z}px;
            opacity: ${this.opacity}`);
    }

    get z() {
        return this.#z;
    }

    get distanceBetweenFrames() {
        return this.#distanceBetweenFrames;
    }

    set distanceBetweenFrames(value) {
        this.#distanceBetweenFrames = value;
    }

    get opacity() {
        if (this.#z > -Gallery3dFrame.minVizibleZ) {
            return 0;
        }
        else if (this.#z >= - 2 * this.distanceBetweenFrames) {
            return 1;
        }
        else {
            return (3.6 * this.distanceBetweenFrames + this.#z) / (3.6 * this.distanceBetweenFrames);
        }
    }

    get align() {
        return this.dataset.align;
    }

    set align(value) {
        this.dataset.align = value;
    }
}

customElements.define(Gallery3dFrame.tag, Gallery3dFrame);