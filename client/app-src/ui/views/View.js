export class View {

    constructor(seletor) {
        this._elemento = document.querySelector(seletor);
    }

    template(model) {
        throw new Error('Você precisa implementar o método template');
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}