const stepContainers = document.querySelectorAll('.step-container'),
formSteps = document.querySelectorAll('.form-step'),
nameInput = document.querySelector('#name'),
nameError = document.querySelector('.name-error'),
emailInput = document.querySelector('#email'),
emailError = document.querySelector('.email-error'),
phoneInput = document.querySelector('#phone'),
phoneError = document.querySelector('.phone-error'),
planOptions = document.querySelectorAll('.option'),
priceOptions = document.querySelectorAll('.plan-info p'),
switchPaymentMethod = document.getElementById('pay-method-btn'),
addOnsPriceTxts = document.querySelectorAll('.add-ons-price'),
addOnsBtns = document.querySelectorAll('.add-ons-btn'),
planMethodFinishing = document.querySelector('.plan-method-finish'),
finishingPrice = document.querySelector('.plan-price'),
changeBtn = document.querySelector('.change-btn'),
totalPrice = document.querySelector('.total-price'),addOnsFeaturePriceTxts = document.querySelectorAll('.add-ons-feature-price'),
nextBtns = document.querySelectorAll('.next-btn'),
backBtns = document.querySelectorAll('.go-back-btn');


let price = 9;
let extraPrice = 0;

const nameRegex =/^[a-zA-Z]+ [a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegex = /^[\+][1][\s]?[0-9]{3}[\s]?[0-9]{3}[\s]?[0-9]{3}$/im;

let time = price>20?'yr':'mo';
totalPrice.innerText= `+$${price + extraPrice}/${time}`;

addOnsBtns.forEach((btn, idx) =>{
    btn.addEventListener('change', ()=>{
        if(btn.checked){
            btn.parentElement.parentElement.style.borderColor = 'hsl(213, 96%, 18%)';
            btn.parentElement.parentElement.style.backgroundColor = 'hsl(217, 100%, 97%)';

            extraPrice += +addOnsPriceTxts[idx].dataset.extraprice;
            
            let time = extraPrice>5?'yr':'mo';
            totalPrice.innerText= `+$${price + extraPrice}/${time}`;

        }else{
            btn.parentElement.parentElement.style.borderColor = 'hsl(229, 24%, 87%)';
            btn.parentElement.parentElement.style.backgroundColor = 'hsl(0, 0%, 100%)';

            extraPrice -= +addOnsPriceTxts[idx].dataset.extraprice;
            
            let time = extraPrice>5?'yr':'mo';
            totalPrice.innerText= `+$${price + extraPrice}/${time}`;
        }
        addOnsFeaturePriceTxts[idx].parentElement.classList.toggle('none');
        addOnsFeaturePriceTxts[idx].innerText = addOnsPriceTxts[idx].innerText;
    })
})

switchPaymentMethod.addEventListener('change', ()=>{
    if(switchPaymentMethod.checked){
        priceOptions.forEach(priceOption=>{
            priceOption.innerHTML = `$${+priceOption.dataset.price * 10}/yr
            <span class="yr-plan">2 months free</span>`;
            priceOption.dataset.price = +priceOption.dataset.price * 10;
        })
        addOnsPriceTxts.forEach(para=>{
            para.innerText = `+$${para.dataset.extraprice * 10}/yr`;
            para.dataset.extraprice = +para.dataset.extraprice * 10;
        })

        planMethodFinishing.innerText = `(yearly)`;
        price *= 10;
        extraPrice *= 10;

        finishingPrice.innerText=`$${price}/yr`;
        totalPrice.innerText= `+$${price + extraPrice}/yr`;

    }else{
        priceOptions.forEach(priceOption=>{
            priceOption.innerHTML = `$${+priceOption.dataset.price/10}/mo`;
            priceOption.dataset.price = +priceOption.dataset.price / 10;
        })

        addOnsPriceTxts.forEach(para=>{
            para.innerText = `+$${para.dataset.extraprice / 10}/mo`;
            para.dataset.extraprice = +para.dataset.extraprice / 10;
        })

        planMethodFinishing.innerText = `(monthly)`;
        price /= 10;
        extraPrice /= 10;
        finishingPrice.innerText=`$${price}/mo`;
        totalPrice.innerText= `+$${price + extraPrice}/mo`;
    }

    addOnsFeaturePriceTxts.forEach((para, idx)=>{
        para.innerText = addOnsPriceTxts[idx].innerText;
    })
})


planOptions.forEach((option, idx)=>{
    option.addEventListener('click', (e)=>{
        planOptions.forEach(ele=>{
            ele.style.backgroundColor='hsl(0, 0%, 100%)';
            ele.style.borderColor='hsl(229, 24%, 87%)';
        })

        e.currentTarget.style.backgroundColor='hsl(231, 100%, 99%)';
        e.currentTarget.style.borderColor='hsl(213, 96%, 18%)';
        price =  +priceOptions[idx].dataset.price;
        let time = price>20?'yr':'mo';
        finishingPrice.innerText=`$${price}/${time}`;
        totalPrice.innerText= `+$${price + extraPrice}/${time}`;
    })
})

nextBtns.forEach((btn, idx)=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        nextStep(idx);
    })
});

backBtns.forEach((btn, idx)=>{
    btn.addEventListener('click', (e)=>{
        e.preventDefault();
        prevStep(idx);
    })
})

changeBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    prevStep(1)
})

function prevStep(indx){
    stepContainers.forEach(step=>{
        step.firstElementChild.style.backgroundColor = 'transparent';
        step.firstElementChild.style.color = 'hsl(0, 0%, 100%)';
    })

    stepContainers[indx].firstElementChild.style.backgroundColor = 'hsl(206, 94%, 87%)';
    stepContainers[indx].firstElementChild.style.color = 'hsl(213, 96%, 18%)';
    
    formSteps.forEach(step=>{
        step.classList.add('none');
    })

    formSteps[indx].classList.remove('none');
}

function nextStep(indx){
    if(nameInput.value == '' || !nameRegex.test(nameInput.value) ){
        nameError.classList.remove('none');
        nameInput.style.borderColor = 'hsl(354, 84%, 57%)';
    }else if(nameRegex.test(nameInput.value)){
        nameError.classList.add('none');
        nameInput.style.borderColor = 'hsl(229, 24%, 87%)';
    }

    if(emailInput.value == '' || !emailRegex.test(emailInput.value)){
        emailError.classList.remove('none');
        emailInput.style.borderColor = 'hsl(354, 84%, 57%)';
    }else if(emailRegex.test(emailInput.value)){
        emailError.classList.add('none');
        emailInput.style.borderColor = 'hsl(229, 24%, 87%)';
    }

    if(phoneInput.value == '' || !phoneRegex.test(phoneInput.value)){
        phoneError.classList.remove('none');
        phoneInput.style.borderColor = 'hsl(354, 84%, 57%)';
    }else if(phoneRegex.test(phoneInput.value)){
        phoneError.classList.add('none');
        phoneInput.style.borderColor = 'hsl(229, 24%, 87%)';
    }

    if(nameInput.value == '' || emailInput.value == '' || phoneInput.value ==''){
        return false;
    }

    stepContainers.forEach(step=>{
        step.firstElementChild.style.backgroundColor = 'transparent';
        step.firstElementChild.style.color = 'hsl(0, 0%, 100%)';
    })

    if(indx < 3){
        stepContainers[indx+1].firstElementChild.style.backgroundColor = 'hsl(206, 94%, 87%)';
        stepContainers[indx+1].firstElementChild.style.color = 'hsl(213, 96%, 18%)';
    }

    if(indx == 3){
        stepContainers[3].firstElementChild.style.backgroundColor = 'hsl(206, 94%, 87%)';
        stepContainers[3].firstElementChild.style.color = 'hsl(213, 96%, 18%)';
    }
    
    formSteps.forEach(step=>{
        step.classList.add('none');
    })

    formSteps[indx +1].classList.remove('none');

}