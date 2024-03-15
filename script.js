let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("#btn");
let toCurr=document.querySelector("#to");
let fromCurr=document.querySelector("#from");
let amount=document.querySelector("#container input");
let answer=document.querySelector("#answer");
const BASE_URL="https://v6.exchangerate-api.com/v6/0645e49fcfc3d0c5980eda97/pair";

let darkButton=document.querySelector("#darkbtn");
let outerDiv=document.querySelector("#outer");
let theme="light";

function changeTheme()
{
    if(theme==="light")
    {
        document.body.classList.add("dark");
        theme="dark";
        darkButton.innerText="Light Mode";
        outerDiv.style.backgroundColor="#060643";
        fromCurr.style.color="white";
        toCurr.style.color="white";
    }
    else
    {
        document.body.classList.remove("dark");
        theme="light";
        darkButton.innerText="Dark Mode";   
        outerDiv.style.backgroundColor="white";
        fromCurr.style.color="black";
        toCurr.style.color="black";

    }
}


darkButton.addEventListener("click",(evt)=>{
    changeTheme();
});


const updateFlag=(target)=>
{
    let currency=target.value;
    let country = countryList[currency];
    let newSrc=`https://flagsapi.com/${country}/shiny/64.png`;
    let img=target.parentElement.querySelector("img");
    img.src=newSrc;
}

for(let select of dropdowns)
{
    for(let currcode in countryList)
    {
        let newElement=document.createElement("option");
        newElement.innerText=currcode;
        newElement.value=currcode;
        if(select.id==="from" && currcode==="USD")
        {
            newElement.selected="selected";
        }
        else if(select.id==="to" && currcode==="INR")
        {
            newElement.selected="selected";
        }
        select.append(newElement);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(URL);
    // console.log(response);
    let data= await response.json();
    // console.log(data.conversion_rate);
    if(amount.value<1)
    {
        amount.innerText="1";
        amount.value=1;
    }
    let convertedAmount=amount.value * data.conversion_rate;
    console.log(convertedAmount);
    answer.value=`${amount.value} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
});

