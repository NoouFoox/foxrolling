interface Background {
  background?: string
}
export default (container: string, main: string, style:Background = {}, height = 1080, width = 1920) => {
  const scale = () => {
    const wh = window.innerHeight / height;
    const ww = window.innerWidth / width;
    return ww < wh ? ww : wh;
  };
  function resize() {
    const mainDom = document.querySelector(main) as HTMLElement
    if (mainDom) 
      mainDom.style.position = 'absolute';
      mainDom.style.transformOrigin = '0 0';
      mainDom.style.height = `${height}px`;
      mainDom.style.width = `${width}px`;
      mainDom.style.top = '50%';
      mainDom.style.left = '50%';
      mainDom.style.width = `${width}px`;
      mainDom.style.transform = `scale(${scale()}) translate(-50%, -50%)`
  }
  return {
    load() {
      const containerDom = document.querySelector(container) as HTMLElement
      if (containerDom) 
        containerDom.style.width = '100%';
        containerDom.style.height = '100%';
        containerDom.style.background = '#000';
        containerDom.style.background = style.background || '#000';
        resize();
        window.addEventListener('resize', resize);
    },
    unload() {
      window.removeEventListener('resize', resize, false);
    },
  };
};
