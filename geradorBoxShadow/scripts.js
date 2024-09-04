class BoxShadowGenerator{
 
    constructor(
        horizontal,
        horizontalText,
        vertical,
        verticalText,
        blurr,
        blurText,
        spread,
        spreadText,
        color,
        colorText,
        opacity,
        opacityText,
        inset,
        previewBox,
        rule,
        ruleWebkit,
        ruleMoz,
    ){
        this.horizontal = horizontal;
        this.horizontalText = horizontalText;
        this.vertical = vertical;
        this.verticalText = verticalText;
        this.blurr = blurr;
        this.blurText = blurText;
        this.spread = spread;
        this.spreadText = spreadText;
        this.color = color;
        this.colorText = colorText;
        this.opacity = opacity;
        this.opacityText = opacityText;
        this.inset = inset;
        this.insetText = inset.checked;
        this.previewBox = previewBox;
        this.rule = rule;
        this.ruleWebkit = ruleWebkit;
        this.ruleMoz = ruleMoz;
    }

    initialize () {


        this.horizontalText.value = this.horizontal.value;
        this.verticalText.value = this.vertical.value;
        this.blurText.value = this.blurr.value;
        this.spreadText.value = this.spread.value;
        this.colorText.value = this.color.value;
        this.opacityText.value = this.opacity.value;

        this.aplyRule()
        this.showRule()
    }

    aplyRule(){
        const rgbValue = this.hexToRgb(this.colorText.value);
        
        this.previewBox.style.boxShadow = `${this.insetText ? 'inset' : ''}
            ${this.horizontalText.value}px 
            ${this.verticalText.value}px 
            ${this.blurText.value}px 
            ${this.spreadText.value}px 
            rgba(${rgbValue}, ${this.opacityText.value}) `;
        this.currentRule = this.previewBox.style.boxShadow;
    }

    showRule(){
        this.rule.innerText = this.currentRule;
        this.ruleWebkit.innerText = this.currentRule;
        this.ruleMoz.innerText = this.currentRule;
    }

    updateValue(type, value) {

        switch(type){
            case 'horizontal':
                this.horizontalText.value = value;
                break;
            case 'vertical':
                this.verticalText.value = value;
                break;
            case 'blur':
                this.blurText.value = value;
                break;
            case 'spread':
                this.spreadText.value = value;
                break;
            case 'color':
                this.colorText.value = value;
                break;
            case 'opacity':
                this.opacityText.value = value;
                break;
            case 'inset':
                this.insetText = value;
                break;
        }
        this.aplyRule()
        this.showRule()
    }

    hexToRgb(hex) {
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
          ("0x" + hex[5] + hex[6]) | 0
        }`;
      }

}

//elementos do dom

const horizontal = document.querySelector('#horizontal');
const horizontalText = document.querySelector('#horizontalText');

const vertical = document.querySelector('#vertical');
const verticalText = document.querySelector('#verticalText');

const blurr = document.querySelector('#blur');
const blurText = document.querySelector('#blurText');

const spread = document.querySelector('#spread');
const spreadText = document.querySelector('#spreadText');

const color = document.querySelector('#color');
const colorText = document.querySelector('#colorText');
const opacity = document.querySelector('#opacity');
const opacityText = document.querySelector('#opacityText');
const inset = document.querySelector('#inset');

const previewBox = document.querySelector('#box')

const copy = document.querySelector('.copy')

const rule = document.querySelector('#rule span')
const ruleWebkit = document.querySelector('#webkit-rule span')
const ruleMoz = document.querySelector('#moz-rule span')

const boxShadow = new BoxShadowGenerator(
    horizontal,
    horizontalText,
    vertical,
    verticalText,
    blurr,
    blurText,
    spread,
    spreadText,
    color,
    colorText,
    opacity,
    opacityText,
    inset,
    previewBox,
    rule,
    ruleWebkit,
    ruleMoz
)


boxShadow.initialize()

//eventos


horizontal.addEventListener('input', (e) => {
    const value = e.target.value

    boxShadow.updateValue('horizontal', value )
})

vertical.addEventListener('input', (e) => {
    const value = e.target.value

    boxShadow.updateValue('vertical', value )
})

blurr.addEventListener('input', (e) => {
    const value = e.target.value

    boxShadow.updateValue('blur', value )
})

spread.addEventListener('input', (e) => {
    const value = e.target.value

    boxShadow.updateValue('spread', value )
})

color.addEventListener('input', (e) => {
    const value = e.target.value

    boxShadow.updateValue('color', value )
})

opacity.addEventListener('input', (e) => {
    const value = e.target.value

    boxShadow.updateValue('opacity', value )
})

inset.addEventListener('input', (e) => {
    value = e.target.checked;

    boxShadow.updateValue('inset', value )
})

copy.addEventListener('click', () => {

    let rule 
    rule = document.querySelector('#rule').innerText + document.querySelector('#webkit-rule').innerText + document.querySelector('#moz-rule').innerText;

    navigator.clipboard.writeText(rule)

})
