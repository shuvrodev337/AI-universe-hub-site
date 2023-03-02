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
    console.log(tool);
    const {image,features,name,published_in}=tool
    const toolCardDiv=document.createElement("div")
    toolCardDiv.classList.add("col")
    toolCardDiv.innerHTML=`
    <div class="card h-100">
                <img src="" class="card-img-top" alt="">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
    </div>
    
    `

});
}