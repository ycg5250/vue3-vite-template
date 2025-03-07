let timer = null;
let count = 0;

const interval = () => {
  timer = setInterval(() => {
    count++;
    postMessage(count);
  }, 3 * 1000);
};

onmessage = function (event) {
  const { data } = event;
  if (data === 'start') {
    if (timer) {
      clearInterval(timer);
    }
    interval();
  }
  if (data === 'stop') {
    if (timer) {
      clearInterval(timer); 
    }
    this.postMessage('ended');
  }
  console.log(event.data);
};
