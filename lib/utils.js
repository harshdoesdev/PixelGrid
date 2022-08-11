export const screenToCanvas = (cnv, x, y) => {

    const rect = cnv.getBoundingClientRect(), // abs. size of element
          
          scaleX = cnv.width / rect.width,    // relationship bitmap vs. element for X
          
          scaleY = cnv.height / rect.height;  // relationship bitmap vs. element for Y
  
    return {
      
      x: (x - rect.left) * scaleX,   // scale mouse coordinates after they have
      
      y: (y - rect.top) * scaleY     // been adjusted to be relative to element
    
    }
  
};

export function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}