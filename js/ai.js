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
    //   let {description,pricing,features,integrations}=toolDetails
    //   console.log(pricing);
    //   let [{plan:starterPlan,price:starterPrice},{plan:proPlan,price:proPrice},{plan:enterPrisePlan,price:enterPrisePrice}]=pricing

    //   for (const singlePrice of pricing) {
    //     const starterPlan=singlePrice
    //   }

    //   console.log(starterPrice);
    // console.log(pricing);
    const toolDescription=toolDetails.description
    // const toolPrice=toolDetails?.pricing[0].price
    const toolBasicPrice=toolDetails.pricing?toolDetails.pricing[0].price:"No price details available for"
    const toolProPrice=toolDetails.pricing?toolDetails.pricing[1].price:"No price details available for"
    const toolEnterprisePrice=toolDetails.pricing?toolDetails.pricing[2].price:"No Cost"
      console.log(toolBasicPrice,toolProPrice,toolEnterprisePrice);
      const modalCardsConatainer=document.getElementById("tool-description")
      modalCardsConatainer.innerHTML=`
            <div class="col">
              <div class="card h-100 ">
                <div class="card-body bg-danger bg-opacity-10 ">
                  <h5  class="card-title">${toolDescription}</h5>
                  <div class="d-flex container-fluid gap-2 fw-semibold text-center py-3">
                  <p class="card-text bg-body p-4  text-success  rounded">${toolBasicPrice} Basic</p>
                  <p class="card-text bg-body p-4  text-warning rounded">${toolProPrice} Pro</p>
                  <p class="card-text bg-body p-4  text-danger rounded">${toolEnterprisePrice.slice(0,10)} Enterprise</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">My Tool</h5>
                  <p class="card-text">This is a short card.</p>
                </div>
              </div>
            </div> 
    
    `
  }

  //handl pricing
  const showPricing = (pricings) => {
    // console.log(pricings);
    // const pricingsDiv = document.createElement("div");
    // for (const singlePricePlan of pricings) {
    //   const p = document.createElement("p");
    //   p.innerText = ` ${singlePricePlan.price ? singlePricePlan.price:"No Pricing"}`;
    //   pricingsDiv.appendChild(p);
    // }
    // return pricingsDiv.innerHTML;
  };
  
  
  fetchData();
  
