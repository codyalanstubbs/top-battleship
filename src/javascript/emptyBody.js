export const emptyBody = () => {
    const body = document.querySelector("body");
    while (body.lastChild) {
        if (body.lastChild.tagName === 'H1') return;
        body.removeChild(body.lastChild);
    };
};