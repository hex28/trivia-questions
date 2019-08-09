export function decodeEntities(str){
  let txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}
