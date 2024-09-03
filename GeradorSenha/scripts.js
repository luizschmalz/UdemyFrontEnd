const opcoes = document.querySelector('#clique')

const password = document.querySelector('#senha')

const senhadiv = document.querySelector('.senha')


const tamanho = document.querySelector('#digitos')
const letras = document.querySelector('#numbers')
const numeros = document.querySelector('#letras')
const simbolos = document.querySelector('#simbolos')
const generate = document.querySelector('#gerarSenha')
const copy = document.querySelector('#copy')


const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
};

const getNumber = () => { 
    return (Math.floor(Math.random() * 10)).toString();
};

const getSymbol = () => {
    const symbols = '!@#$%&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
};

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = ''

    const passwordLength = tamanho.value

    let generators = []

    if (letras.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }
    if (numeros.checked) {
        generators.push(getNumber)
    }
    if (simbolos.checked) {
        generators.push(getSymbol)
    }
    if (generators.length === 0) {
        return ''
    }

    for (let i = 0; i < passwordLength; i++) {
        const generatorIndex = Math.floor(Math.random() * generators.length)

        password += generators[generatorIndex]()
    }

    generators = [];

    return password;
};

opcoes.addEventListener('click', (e =>{
    e.preventDefault();

    senhadiv.classList.toggle('hide')
    password.innerText = '';
    copy.classList.add('hide')

}))

generate.addEventListener('click', (e) => {

    e.preventDefault();

    const passwordText = generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);

    password.innerText = passwordText;

    copy.classList.remove('hide')
})

copy.addEventListener('click', (e) => {

    e.preventDefault();

    const senha = document.querySelector('#senha').innerText;
    console.log(senha)

    navigator.clipboard.writeText(senha).then(() => {
        copy.innerText = 'Senha copiada!'
        

        setTimeout(() =>{
            copy.innerText = 'Copiar senha'
        },1000)
    })
})