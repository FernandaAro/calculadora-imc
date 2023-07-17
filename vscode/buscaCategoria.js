const btn = document.querySelector("button");
var peso = document.getElementById("peso"); //recebe o peso
var altura = document.getElementById("altura"); //recebe a altura
var resultado = document.getElementById("resultado"); //receberá o resultado
var resultadoCategoria = document.getElementById("resultadoImc");
var erro = ""; // variavel que recebe mensagens de erro
var categoriaImc = ""; // variavel que recebe categoria

btn.addEventListener("click", () => {
  console.log("Buscando categorias...");
  if (peso.value == "") {
    erro = "informe um valor para o peso";
    alert(erro);
  } else if (altura.value == "") {
    erro = "informe um valor para a altura";
    alert(erro);
  } else {
    var peso_correto = parseFloat(peso.value);
    var altura_correta = parseFloat(altura.value);
    var imc = calculaImc(peso_correto, altura_correta);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "listagem.json");
    xhr.addEventListener("load", function () {
      var resposta = xhr.responseText;
      //console.log(resposta)
      var categorias = JSON.parse(resposta);
      categorias.forEach(function (categoria) {
        if (imc > categoria.imc_minimo && imc < categoria.imc_maximo) {
          categoriaImc = categoria.categoria;
        }
        resultadoCategoria.innerHTML = categoriaImc;
      });
    });
    xhr.send();
  }
  resultado.value = imc.toFixed(2);
});
function calculaImc(peso, altura) {
  return peso / (altura * altura);
}
