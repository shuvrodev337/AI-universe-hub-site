const fetchData = (showAll, sortDate) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showAITools(data.data.tools, showAll, sortDate));
  };
  
  const showAITools = (tools, showAll, sortDate) => {
    const toolsContainer = document.getElementById("tool-cards");
    toolsContainer.innerHTML = "";
  
    if (sortDate ) {
      sortByDate(tools);
      toggleLoader(false);
      document.getElementById("button-div-more").classList.add("d-none");
    }
  
    if (showAll !== true) {
      tools = tools.slice(0, 6);
    }
    let options={
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
    }
  
  
  
    tools.forEach((tool) => {
      let { image, features, name, published_in,id } = tool;
      const toolCardDiv = document.createElement("div");
      published_in = new Date(published_in);
      published_in=published_in.toLocaleDateString("en-us",options)

      toolCardDiv.classList.add("col");
      toolCardDiv.innerHTML = `
      <div class="card h-100" >
                  <img src="${image}" class="card-img-top" alt="">
                  <div class="card-body">
                      <h5 class="card-title">Features</h5>
                      <div> ${showFeatures(features)} </div>
                  </div>
                  <div class="card-footer d-flex justify-content-between align-items-center">
                       <div>
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text"><i class="fa-regular fa-calendar-days"></i> ${published_in}</p>
                      </div>
                      <div>
                        <button onclick="fetchModalData('${id}')" type="button" class="btn text-danger" data-bs-toggle="modal" data-bs-target="#toolDetailModal"><i class="fa-solid fa-2xl fa-arrow-right"></i></button>
                      </div>
                  </div>
      </div>
      
      `;
      toolsContainer.appendChild(toolCardDiv);
    });
  
    toggleLoader(false);
  };
  
  const sortByDate = (tools) => {
    tools.forEach((tool) => {
      tool.published_in = new Date(tool.published_in);
    });
    tools.sort((a, b) => b.published_in - a.published_in);
  };
  
  // Handle features of tool card
  const showFeatures = (features) => {
    let count = 0;
    const featureDiv = document.createElement("div");
    for (const feature of features) {
      count++;
      const p = document.createElement("p");
      p.innerText = `${count}. ${feature}`;
      featureDiv.appendChild(p);
    }
    return featureDiv.innerHTML;
  };
  
  //handle show more button
  document.getElementById("show-more").addEventListener("click", function () {
    fetchData(true);
    document.getElementById("button-div-more").classList.add("d-none");
    toggleLoader(true);
  });
  
  // handle spinner
  const toggleLoader = (isLoading) => {
    if (isLoading) {
      document.getElementById("loader").classList.toggle("d-none");
    } else {
      document.getElementById("loader").classList.toggle("d-none");
    }
  };
  
  //handle modal

  const fetchModalData = (id) => {
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>showToolDetail(data.data))
  };
//   toolDetailModal
  const showToolDetail=(toolDetails)=>{
      let {pricing,features,integrations,image_link,input_output_examples,accuracy}=toolDetails
// console.log(accuracy.score);
      const modalCardsConatainer=document.getElementById("tool-description")
      modalCardsConatainer.innerHTML=`
            <div class="col">
              <div class="card h-100 ">
                <div class="card-body bg-danger bg-opacity-10 ">
                  <h5  class="card-title">${toolDetails.description}</h5>
                  <div class="d-flex container-fluid gap-2 fw-semibold text-center py-3">
                        ${pricing?showPricing(pricing):"Free Of Cost/"}
                  </div>
                  <div class="d-flex container-fluid gap-3 fw-semibold justify-content-evenly text-center">

                    <div class="text-start">
                      <h5 class="fw-semibold">Features</h5>
                      ${features?showModalToolFeatures(features):"No Data Found"}
                      
                    </div>
                    <div class="text-start">
                      <h5 class="fw-semibold">Integrations</h5>
                      ${integrations?showIntegrations(integrations):"No Data Found"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <div class="card-body"> 
                <div>
                <span onload="${checkAccuracy(accuracy)}" id="accuracy-badge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                ${accuracy.score?accuracy.score:''}
              </span>
                <img class="card-img-top rounded-4" src="${image_link[0]}" alt="">
                </div>
                  <h5 class="card-title  py-3">${input_output_examples?input_output_examples[0].input:"Can you give any example?"}</h5>
                  <p class="card-text">${input_output_examples?input_output_examples[0].output:"No! Not Yet! Take a break!!!"}</p>
                </div>
              </div>
            </div> 
    
    `
  }
  // <span class="visually-hidden">unread messages</span>
  const checkAccuracy=(accuracy)=>{
    if (!accuracy.score) {
      console.log("hello");
      document.getElementById("accuracy-badge").classList.add("visually-hidden")
    }
  }
  //handle pricing
  const showPricing = (pricings) => {
    
    const pricingsDiv = document.createElement("div");
    for (const singlePrice of pricings) {
      const p = document.createElement("p");
      p.classList.add("card-text","bg-body","p-4","text-success","rounded")
      p.innerText = ` ${singlePrice.price} / ${singlePrice.plan}`;
      pricingsDiv.appendChild(p);
    }
    return pricingsDiv.innerHTML;
  };
  
  // handle modal tool card integrations
const showIntegrations=(integrations)=>{
  const integrationsListDiv = document.createElement("div");
  for (const integration of integrations) {
      const li = document.createElement("li");
      li.classList.add("fw-lighter")
      li.innerText = ` ${integration}`;
      integrationsListDiv.appendChild(li);
    }
    return integrationsListDiv.innerHTML
}
//handle modal tool card features
const showModalToolFeatures=(items)=>{
  const itemsDiv = document.createElement("div");

  for (const key in items) {
      const li = document.createElement("li");
      li.classList.add("fw-lighter")
      li.innerText = ` ${items[key].feature_name}`;
      itemsDiv.appendChild(li);
    }
    return itemsDiv.innerHTML
}
// handle badge invisibility
const dismissBadge=(id)=>{
  // document.getElementById(id).classList.add("d-none")

}

// Fetch Data on load
  fetchData();
  
