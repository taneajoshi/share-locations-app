export class Modal {
    constructor(contentId, fallbackText) {
        this.fallbackText = fallbackText;
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEl = document.getElementById('modal-template');
    }

    show() {
        if('content' in document.createElement('template')) {
            const modalElements = document.importNode(this.modalTemplateEl.content, true);
            this.modalElement = modalElements.querySelector('.modal');
            this.backdropElement = modalElements.querySelector('.backdrop');

            const contentElement = document.importNode(this.contentTemplateEl.content, true);

            this.modalElement.appendChild(contentElement);

            document.body.insertAdjacentElement('afterBegin', this.modalElement);
            document.body.insertAdjacentElement('afterBegin', this.backdropElement);

        } else {
            //fallback code
            alert(this.fallbackText);
        }
    }

    hide() {
        this.modalElement.remove(); //for older browser use document.body.removeChild(this.modalElement)
        this.backdropElement.remove();

        //Telling browser that we dont need these element anymore till next call.
        this.modalElement = null;
        this.backdropElement= null;
    }
}