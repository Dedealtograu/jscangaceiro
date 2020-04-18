export function debounce(milissigundos = 500) {

    return function(target, key, descriptor) {
        const metodoOriginal = descriptor.value;
        const timer = 0;

        descriptor.value = function(...args) {

            if(event) event.preventDefault();
            clearTimeout(timer);

            timer = setTimeout(() => metodoOriginal.apply(this, args), milissigundos);
        }

        return descriptor;
    }
}