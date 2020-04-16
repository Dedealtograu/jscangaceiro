import { NecociacaoController } from './controllers/NegociacaoControlle';
import { debounce } from './util/index';

const controller = new NecociacaoController();

const $ = document.querySelector.bind(document);

$('.form')
.addEventListener('submit', controller.adiciona.bind(controller));

$('#botao-apaga')
.addEventListener('click', controller.apaga.bind(controller));

$('#botao-importa')
.addEventListener('click', debounce(() => {
     console.log('EXECUTOU A OPERAÇÃO DO DEBOUNCE');
}, 1000));