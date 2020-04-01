class NecociacaoController {

    constructor() {
        const $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'), 
            'adiciona', 'esvazia'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'), 
            'texto'
        );

        this._service = new NegociacaoService();
 
    }

    adiciona(event) {
        try {
            event.preventDefault();

            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação incluída com sucesso';

            this._limpaFormulorio();

        } catch (err) {
            console.log(err);
            console.log(err.stack);

            if(err instanceof DataInvalidaException) {
                this._mensagem.texto = err.message;
            } else {
                this._mensagem.texto = 'Um erro não esperado aconteceu';
            }
        }
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apacada com sucesso';
    }

    _criaNegociacao() {
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulorio() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
    importaNegociaccoes() { 
        this._service.obterNegociacoesDoPeriodo()
        .then(negociacoes =>{ 
            negociacoes.filter(novaNegociacao => 
                !this._negociacoes.paraArray().some(negociacaoExistente => 
                    novaNegociacao.equals(negociacao)))
                    .forEach(negociacao => 
                        this._negociacoes.adiciona(negociacao));
            
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        }).catch(err => this._mensagem.texto = err);

    }
}