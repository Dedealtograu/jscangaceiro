export function debounce(fn, milissigundos) {
    let timer = 0;

    return () => {
        clearTimeout(timer);

        timer = setTimeout(() => fn(), milissigundos);
    }
}