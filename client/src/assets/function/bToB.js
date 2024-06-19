// this funtion transforms binary to boolean

function bToB(binary) {
  if (binary === 0) {
    return false;
  }
  if (binary === 1) {
    return true;
  }
  return console.error("not binary");
}

export default bToB;
