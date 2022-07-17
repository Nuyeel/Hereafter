const resetVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// width: 100% 就可以了
// const resetVW = () => {
//     const vw = window.innerWidth * 0.01;
//     document.documentElement.style.setProperty('--vw', `${vw}px`);
// };

resetVH();
// width: 100% 就可以了
// resetVW();

// We listen to the resize event
window.addEventListener('resize', () => {
    resetVH();
    // width: 100% 就可以了
    // resetVW();
});
