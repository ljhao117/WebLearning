// 在“generate.js”中创建一个新的worker
const worker = new Worker('./generate.js');

// 当用户点击 Generate primes 时，给worker发送一条信息。
// 消息中的command属性是“generate”，还包含另一个属性“quota”，既要生成的质数。
document.querySelector('#generate').addEventListener('click', () => {
  const quota = document.querySelector('#quota').value;
  worker.postMessage({
    command: 'generate',
    quota: quota
  });
});

// 当worker给主线程回发一条消息时，为用户更新output框，包含从message中获取生成的质数。
worker.addEventListener('message', message => {
  document.querySelector('#output').textContent = `Finished generating ` + message.data + 'primes!';
});

document.querySelector('#reload').addEventListener('click', () => {
  document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});