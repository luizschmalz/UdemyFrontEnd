const btn = document.querySelector('#submitbutton');
const espera = document.querySelector('#espera');
const span = document.querySelector('#span span');

btn.addEventListener('click', (e) => {
   
    e.preventDefault();
    const num1 = document.querySelector('#number1').value;
    const num2 = document.querySelector('#number2').value;
    if(num1 === '' || num2 === ''){
        alert('Preencha os campos');
        return;
    }
    createTable(num1, num2);
});

const createTable = (num1, num2) =>{
    espera.innerHTML = '';
    for(i=0; i<=num2; i++){
        let result = num1 * i;
        const template = `
        <div>
            <div class="rowvalue">${num1} x ${i} = ${result}</div>
        </div>`
        const parser = new DOMParser();

        const htmlTemplate = parser.parseFromString(template, 'text/html');

        espera.appendChild(htmlTemplate.body.firstChild);
    }
    span.innerText = num1;
}