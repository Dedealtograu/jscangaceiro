function* minhaFuncaoGeradora() {
    for(let i =0; i < 3; i++) {
        yield i;
    }
}

let it = minhaFuncaoGeradora();

//let objeto = it.next();

while(!(objeto = it.next()).done) {
    console.log(objeto.value);
}