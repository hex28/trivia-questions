export function init(callback){
  fetch('https://opentdb.com/api.php?amount=20&type=multiple')
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    callback(result)
  });
}
