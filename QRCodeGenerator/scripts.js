const container = document.querySelector('.container');
const btn = document.querySelector('#submit');
const input = document.querySelector('#text');
const img = document.querySelector('#img')

btn.addEventListener('click', () => {

    generateQr();
    
})

input.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        generateQr();
    }
})

input.addEventListener('keyup', () => {
    if(!input.value){
        container.classList.remove('active');
        img.src = '';
        btn.value = "Gerar Qr Code";
    }
})

function generateQr(){
    const text = document.querySelector('#text').value;
    if (!text) return;
    btn.value = "Gerando...";

    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`

    img.addEventListener('load', () => {
        container.classList.add('active');
        btn.value = "Qr Code gerado!";
    })
}