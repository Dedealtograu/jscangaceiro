import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal';
import '../css/meucss.css';
import { NecociacaoController } from './controllers/NegociacaoControlle';
import { Negociacao } from './domain/index';

const controller = new NecociacaoController();

const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const body = JSON.stringify(negociacao);
const method = 'POST';

const confing = {
    method,
    headers,
    body
};

fetch('http://localhost:3000/negociacoes', confing)
    .then(() => console.log('Dados enviados com sucesso'));