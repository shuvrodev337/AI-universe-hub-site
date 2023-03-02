const fetchData=()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data=> showAITools(data.data.tools))
}

const showAITools=(tools)=>{
// console.log(tools);
const toolsContainer=document.getElementById("tool-cards")
tools.forEach(tool => {
    const {image,features,name,published_in}=tool
    const toolCardDiv=document.createElement("div")
    toolCardDiv.classList.add("col")
    toolCardDiv.innerHTML=`
    <div class="card h-100" >
                <img src="${image}" class="card-img-top" alt="">
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <div> ${showFeatures(features)} </div>
                </div>
                <div class="card-footer">
                 <h5 class="card-title">${name}</h5>

                 <p class="card-text">1. ${published_in}</p>
                  
                </div>
    </div>
    
    `
toolsContainer.appendChild(toolCardDiv)


});


}





const showFeatures=(features)=> {
    let count=0;
    const featureDiv=document.createElement("div")
    featureDiv.style.listStyleType="none"
    for (const feature of features) {
        count++
        const p=document.createElement("p")
        p.innerText=`${count}. ${feature}`
        featureDiv.appendChild(p)
    }
    console.log(featureDiv);
    return featureDiv.innerHTML
}




{/* <p class="card-text">1. ${features[0]}</p>
                  <p class="card-text">2. ${features[1]}</p>
                  <p class="card-text">3. ${features[2]}</p> */}