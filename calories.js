
// create a array of food item and its value
// import from fooddata
import { foodData } from "./foodData.js";

// declear variable
const calculator=document.getElementById("calculator")
const foodFrom=document.getElementById('foodFrom')
let foodArr=[];

const createFoodItemHtml=(food,isChecked,displayCalo,displayGram)=>{
    const checkedAtt=isChecked? 'checked':'';
    const currentCalo=displayCalo||food.calo
    const currentGram=displayGram||100
    return`
    <div class="food-item" id="${food.code}">
        <input type="checkbox" name="${food.code}" id="food-item-${food.code}" class="food-checkbox" ${checkedAtt}>
        <span id="foodname">${food.name}</span>
        <div class="food-information">
            <span><span class="recent-calories">${currentCalo}</span>cals/<span class="recent-gram">${currentGram}</span>g</span>
        </div>
    </div>
    `
}

const renderFoodItem=(allFood,selectedFoodInfor=[])=>{
    let htmlFood='';
    const topItemHtml=[];
    const selectedFoodMap=new Map(selectedFoodInfor.map(f=>[f.id,f]))
    allFood.forEach(food=>{
        const selectedInfor=selectedFoodMap.get((food.code).toString())
        const checked=!!selectedInfor
        const displayCalo=selectedInfor? selectedInfor.displayCalo:food.calo;
        const displayGram=selectedInfor? selectedInfor.foodQuantity:100
        const itemHtml=createFoodItemHtml(food,checked,displayCalo,displayGram)
        if(checked)
        {
            topItemHtml.push(itemHtml)
        }
        else{
            htmlFood+=itemHtml
        }
    })
    calculator.innerHTML=topItemHtml.join('')+htmlFood
    clickAbleDiv()
}
document.addEventListener("DOMContentLoaded",()=>{
    const existingData=sessionStorage.getItem('userChoice')
    foodArr=JSON.parse(existingData)||[]
    console.log(foodArr)
    const urlParams=new URLSearchParams(window.location.search)
    const unitRatio=urlParams.get('unitRatio')
    const quantity=urlParams.get('quantity')
    const foodCode=urlParams.get('foodCode')
    //take the infor from the url
    if(unitRatio&& quantity&&foodCode)
    {
       updateFoodArr(unitRatio,quantity,foodCode,true)
       console.log(unitRatio,quantity)
    }
    renderFoodItem(foodData,foodArr)
    
})







// log food event for first clear the sessionstorage
document.getElementById('log-food').addEventListener("click",()=>{
    sessionStorage.removeItem('userChoice');
    console.log('du lieu da xoas')
    //chooseFood()
})

//click able div food-item

const clickAbleDiv=()=>{
    const foodItems=document.querySelectorAll(".food-item");
    foodItems.forEach(item=>{
        item.addEventListener('click',(event)=>{
        const clickedElement=event.target
        // event delegation for the food-item
        // user click on the check box the box checked
        // user click other tag a event will be fire
        // another way console.log(clickedElement.classList.content)
            if(clickedElement.tagName!=='INPUT')
            {
                nav_to_info(item.id)
            }
        })
    })

}

const nav_to_info=(foodCode)=>{
    window.location.href=`item.html?code=${foodCode}`
}


calculator.addEventListener('change',(e)=>{
    if(e.target.type==='checkbox')
    {
        const checkbox=e.target
        const listItem=checkbox.closest('div')
        if(checkbox.checked)
        {
            
            calculator.prepend(listItem)
            updateFoodArr(0.01,100,checkbox.name,true)
        }
        if(!checkbox.checked)
        {
            updateFoodArr(0.01,100,checkbox.name,false)
        }
        
    }
})




const updateFoodArr=(unitRatio,quantity,foodCode,isChecked)=>{
    const existingData=sessionStorage.getItem('userChoice')
    foodArr=JSON.parse(existingData)||[]
    if(isChecked)
    {
        foodArr.push({
        foodUR:unitRatio,
        foodQuantity:quantity,
        id:foodCode
        })
        console.log("da them food ",foodArr[foodArr.length-1])
    }
    else{
        foodArr=foodArr.filter(food=>food.id!==foodCode)
    }
    sessionStorage.setItem('userChoice',JSON.stringify(foodArr))
    console.log(foodArr,"food arr moi")
    renderFoodItem(foodData,foodArr)
}


// // listing food been choosen first of the list


// //create a function
// //add food infor from food item collection



// //choose all the food the user choose
// const chooseFood=()=>{
//     const foodChecked=document.querySelectorAll('input[class="food-checkbox"]')
//     const checkedFoodList=[]
//     foodChecked.forEach(checkbox=>{
//         if(checkbox.checked)
//         {
//             checkedFoodList.push(checkbox.name);
//         }

//     })
//     console.log(checkedFoodList)
// }
