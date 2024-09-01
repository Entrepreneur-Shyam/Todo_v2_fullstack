 export default function log(message, bColor="black",tColor="white") {
  console.log("%c" + message, `background-color:${bColor}; color:${tColor};font-weight:bold`);
}

