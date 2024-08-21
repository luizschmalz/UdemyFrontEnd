const buttons = document.querySelectorAll(".imgselector li");
const img = document.querySelector('#img');

buttons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    buttons.forEach((btn) => {
      const colorOption = btn.querySelector('.coloroption');
      if (colorOption) {
        colorOption.classList.remove('selected');
      }
    });

    const clickedButton = e.currentTarget;
    const selectedOption = clickedButton.querySelector('.coloroption');
    if (selectedOption) {
      selectedOption.classList.add('selected');
    }

    if(clickedButton.id=='silver'){
        img.src = 'assets/iphone_silver.jpg';
    }
    else if(clickedButton.id=='green'){
        img.src = 'assets/iphone_green.jpg';
    }
    else if(clickedButton.id=='gold'){
        img.src = 'assets/iphone_golden.jpg';
    }
    else if(clickedButton.id=='blue'){
        img.src = 'assets/iphone_blue.jpg';
    }
    else if(clickedButton.id=='grafite'){
        img.src = 'assets/iphone_grafite.jpg';
    }   
    console.log(clickedButton.id); 
  })
);
