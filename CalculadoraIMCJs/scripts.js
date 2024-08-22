//IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

const altura = document.querySelector('#altura');
const peso = document.querySelector('#peso');
const imctable = document.querySelector('.infos');
const container = document.querySelector('.container');
const imctablevalues = document.querySelector('.imctable');

const btn = document.querySelector('#botao');
const clean = document.querySelector('#limpar');
const back = document.querySelector('#voltar');

const imcNumber = document.querySelector('#tittle span');
const imcInfo = document.querySelector('#subtittle span');

btn.addEventListener('click', () => {
    console.log(altura.value, peso.value);

    if(altura == '' || peso == ''){
        alert('Por favor, preencha todos os campos')
        return;
    }
    else if(!Number(altura.value) || !Number(peso.value)){
            alert('Por favor, digite apenas números');
            return;
    }

    const imc = (peso.value / (altura.value * altura.value)).toFixed(1);
    let info;

    data.forEach((item) => {
        if(imc >= item.min && imc <= item.max){
            info = item.info;
        }
    });
    if(!info){
      alert('Erro ao calcular IMC, esse valor não existe');
      return;
    }

    container.classList.add('hide');
    imctable.classList.remove('hide');

    console.log(imc);

    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    if(imc < 18.5){
        imcNumber.classList.add('low');
        imcInfo.classList.add('low');
    }
    else if(imc >= 18.5 && imc < 25){
      imcNumber.classList.add('good');
      imcInfo.classList.add('good');
    }
    else if(imc >= 25 && imc < 30){
      imcNumber.classList.add('low');
      imcInfo.classList.add('low');
    }
    else if(imc >= 30 && imc < 40){
      imcNumber.classList.add('medium');
      imcInfo.classList.add('medium');
    }
    else{
      imcNumber.classList.add('high');
      imcInfo.classList.add('high');
    }
});

clean.addEventListener('click', () => {
    altura.value = '';
    peso.value = '';
});

back.addEventListener('click', () => {
    imctable.classList.add('hide');
    container.classList.remove('hide');
    altura.value = '';
    peso.value = '';
    imcNumber.classList = '';
    imcInfo.classList = '';
});

function createTable(data){
  data.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('table-data');

    const classification = document.createElement('p');
    classification.innerText = item.classification;

    const info = document.createElement('p');
    info.innerText = item.info;

    const obesity = document.createElement('p');
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imctablevalues.appendChild(div);
  });
}


createTable(data)