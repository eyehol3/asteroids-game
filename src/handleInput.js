export const keyIsDown = (() => {
    const state = {};
    window.addEventListener('keyup', (e) => state[e.code] = false);
    window.addEventListener('keydown', (e) => state[e.code] = true);

    return (code) => state.hasOwnProperty(code) && state[code] || false;
})();