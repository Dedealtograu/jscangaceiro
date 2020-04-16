import { Negociacoes, NegociacaoService, Negociacao } from '../domain/index';
import { NegociacoesView, MensagemView, Mensagem, DateConverter } from '../ui/index';
import { getNegociacaoDao, Bind, getExceptionMessage } from '../util/index';

export class NecociacaoController {

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

        this._init();
 
    }

    async _init() {
        try {
            const dao = await getNegociacaoDao();
            const negociacoes = await dao.listaTodos();
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    async adiciona(event) {
        try {
            event.preventDefault();

            const negociacao = this._criaNegociacao();

            const dao = await getNegociacaoDao();
            await dao.adiciona(negociacao);
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso';

            this._limpaFormulorio();
            
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    async apaga() {
        try {
            const dao = await getNegociacaoDao();
            await dao.apagaTodas();
            this._negociacoes.esvazia();
            this._mensagem.texto = 'Negociações apacada com sucesso';
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
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
    async importaNegociacoes() { 
        try {
            const negociacacoes = await this._service.obterNegociacoesDoPeriodo();
            console.log(negociacacoes);
            negociacacoes.filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => 
                    novaNegociacao.equals(negociacaoExistente)))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._mensagem.texto = 'Negociações do período importadas com sucesso';

        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }
}