import TemplatedCustomElement from '../templated-custom-element/index.js';
import Gallery3dFrame from '../gallery-3d-frame/index.js';

export default class Gallery3d extends TemplatedCustomElement {

    static tag = 'gallery-3d';

    constructor() {
        super(Gallery3d.tag);
    }

    async connectedCallback() {
        document.body.style.height = this.dataset.depth;

        const frames = await this.initFrames();

        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const delta = lastScrollTop - document.documentElement.scrollTop;
            lastScrollTop = document.documentElement.scrollTop;

            for (const frame of frames) {
                frame.z -= delta;
            }
        })

        window.scrollTo(0, 1);
    }

    async initFrames() {
        await this.whenTemplated();
        const frames = Array.from(this.querySelectorAll(Gallery3dFrame.tag));

        const distanceBetweenFrames = document.body.offsetHeight / frames.length;

        frames
            .forEach((frame, i) => {
                frame.z = - ((i + 0.5) * distanceBetweenFrames);
                frame.distanceBetweenFrames = distanceBetweenFrames;
                frame.align = i % 2 == 0 ? 'left' : 'right';
            });

        if (frames.length % 2 == 1) {
            frames[frames.length - 1].align = '';
        }

        return frames
    }
}

customElements.define(Gallery3d.tag, Gallery3d);