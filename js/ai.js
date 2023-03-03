const fetchData=(showAll)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data=> showAITools(data.data.tools,showAll))
}

const showAITools=(tools,showAll)=>{
// console.log(tools);
const toolsContainer=document.getElementById("tool-cards")


if (showAll!==true) {
    tools=tools.slice(0,6)

}
tools.forEach(tool => {
    const {image,features,name,published_in}=tool
    const toolCardDiv=document.createElement("div")
    toolCardDiv.classList.add("col")
    toolCardDiv.innerHTML=`
    <div class="card h-100" >
                <img src="${image}" class="card-img-top img-responsive" alt="">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <div> ${showFeatures(features)} </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                     <div>
                      <h5 class="card-title">${name}</h5>
                      <p class="card-text">${published_in}</p>
                    </div>
                    <div>
                      <button onclick="showModal()" type="button" class="btn text-danger"><i class="fa-solid fa-2xl fa-arrow-right"></i></button>
                    </div>
                </div>
    </div>
    
    `
toolsContainer.appendChild(toolCardDiv)

});

toggleLoader(false)

}





// Handle features of tool card 
const showFeatures=(features)=> {
    let count=0;
    const featureDiv=document.createElement("div")
    for (const feature of features) {
        count++
        const p=document.createElement("p")
        p.innerText=`${count}. ${feature}`
        featureDiv.appendChild(p)
    }
    return featureDiv.innerHTML
}


//handle show more button
document.getElementById("show-more").addEventListener("click",function () {
    
    fetchData(true)
    document.getElementById("button-div-more").classList.add("d-none")
    toggleLoader(true)
})

// handle spinner
const toggleLoader= isLoading =>{
    if (isLoading) {
      document.getElementById("loader").classList.toggle("d-none")
    } else{
      document.getElementById("loader").classList.toggle("d-none")
    }
  }


//handle modal
const showModal=()=>{
    console.log("hello");
}




fetchData()






//handle show less button
// document.getElementById("show-more").addEventListener("click",function () {
    
//     fetchData(false)
//     document.getElementById("button-div-more").classList.toggle("d-none")

//     document.getElementById("button-div-less").classList.toggle("d-none")
    
// })
