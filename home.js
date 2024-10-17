
// Create loadCategories function
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error));
};

// Create loadCardCategories function
const loadCardCategories = () => {

  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => loadASpinner(data.pets))
    .catch(error => console.log(error));
};

const removeAllClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}

// Create loadCardSection function
const loadCardSection = (id) => {

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(res => res.json())
    .then(data => {
      // remove all active class 
      removeAllClass();

      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");

      // displayCardCategories(data.data);
      loadASpinner(data.data);
    })
    .catch(error => console.log(error));

};
//  load a details data 
const loadDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data => displayDetails(data.petData))
    .catch(error => console.log(error));
}

const loadCountDown = (id) => {
  let countDown = 3 ;
  document.getElementById("count-down").showModal();
  document.getElementById('result').innerHTML=countDown ;
  var c = setInterval(showclock,1000)
function showclock(){
 countDown--;
document.getElementById('result').innerHTML=countDown ;
  if(countDown<=0)
    {
    clearInterval(c);
    document.getElementById("count-down").close();
    }
};
};

// loadASpinner section
const loadASpinner = (data) => {
  const firstCardSection = document.getElementById("first-card");
  firstCardSection.innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  setTimeout (function(){
    document.getElementById("spinner").style.display = "none";
    displayCardCategories(data);
  },2000)

}

//  load a details data 
const displayDetails = (info) => {
  const detailsContainer = document.getElementById("modal-container");
  detailsContainer.innerHTML = `
        
        <img class="w-full" src="${info.image}"/>
        <h2 class="text-3xl font-bold py-2">${info.pet_name}</h2>

        <section  class="flex gap-3 py-2">
        <div>
        ${info.breed != undefined ? `<p class="text-sm text-gray-600">Breed: ${info.breed}</p>` : `<p class="text-sm text-gray-600">Breed: Not Available</p>`}

       ${info.gender != undefined ? `<p class="text-sm text-gray-600">Gender: ${info.gender}</p>` : `<p class="text-sm text-gray-600">Gender: Not Available</p>`}

       ${info.vaccinated_status != undefined ? `<p class="text-sm text-gray-600">vaccinated_status: ${info.vaccinated_status}</p>` : `<p class="text-sm text-gray-600">vaccinated_status: Not Available</p>`}
        </div>

        <div>
         ${info.date_of_birth != undefined && info.date_of_birth != null ? `<p class="text-sm text-gray-600">Birth: ${info.date_of_birth}</p>` : `<p class="text-sm text-gray-600">Birth: Not Available</p>`}

       ${info.price != null ? `<p class="text-sm text-gray-600">Price : ${info.price}$</p>` : `<p class="text-sm text-gray-600">Price: Not Available</p>`}
        </div>
        </section>

       <hr width="100%" size="2" class="">

       <h2 class="text-xl font-bold py-2">Details Information </h2>
       
       <p class="text-sm pb-2">${info.pet_details}</p>

        `;
  document.getElementById("showModal").showModal();

}
const shortDiv = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data => displayShortDiv(data.petData))
    .catch(error => console.log(error));
};


const displayShortDiv = (info) => {
  const secondDiv = document.getElementById("second-card");
  console.log(info.image);
  const div = document.createElement("div");
  div.innerHTML = `
    <img
      src=${info.image}
      alt="pet"
      class="rounded-lg px-1 "/>
    `;
  secondDiv.append(div);

}


// Create displayCardCategories function

const displayCardCategories = (cards) => {
  const firstCardSection = document.getElementById("first-card");
  
  if (cards.length === 0) {
    firstCardSection.classList.remove("grid");
    firstCardSection.innerHTML = `
    <div class="min-h-[300px] flex flex-col justify-center items-center gap-5 bg-gray-100 p-12 rounded-[16px]">
      <img src="./images/error.webp"/>
        <h2 class= "text-3xl font-bold"> No Information Available </h2>
        <p class="text-center text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.
        </p>
    </div>
    `;
    return;
  }
  else {
    firstCardSection.classList.add("grid");
  }
  cards.forEach((card) => {

    const div = document.createElement("div");
    div.classList = "card bg-base-100 border";
    div.innerHTML = `
      <figure class="px-8 pt-8">
    <img
      src=${card.image}
      alt="pet"
      class="rounded-xl" />
  </figure>
  <div class="card-body">
    <h2 class="text-xl font-bold">${card.pet_name}</h2>
    ${card.breed != undefined ? `<p class="text-sm text-gray-600">Breed: ${card.breed}</p>` : `<p class="text-sm text-gray-600">Breed: Not Available</p>`}

    ${card.date_of_birth != undefined && card.date_of_birth != null ? `<p class="text-sm text-gray-600">Birth: ${card.date_of_birth}</p>` : `<p class="text-sm text-gray-600">Birth: Not Available</p>`}

    ${card.gender != undefined ? `<p class="text-sm text-gray-600">Gender: ${card.gender}</p>` : `<p class="text-sm text-gray-600">Gender: Not Available</p>`}

    ${card.price != null ? `<p class="text-sm text-gray-600">Price : ${card.price}$</p>` : `<p class="text-sm text-gray-600">Price: Not Available</p>`}
    
    <hr width="100%" size="2">
    <div class="pt-3 flex justify-between">
      <button onclick="shortDiv(${card.petId})" class="btn btn-outline btn-accent like-btn"><img src="https://img.icons8.com/?size=24&id=HrULZDok3EKr&format=png"/></button>
      <button onclick="loadCountDown(${card.petId})"  class="btn btn-outline btn-accent" id="adopt">Adopt</button>
      <button onclick="loadDetails(${card.petId})" class="btn btn-outline btn-accent">Details</button>
    </div>
  </div>
      `;
    firstCardSection.appendChild(div);
  })
};

// Create displayCategories function
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('selection-btn');
  // Clear any existing content
  categoryContainer.innerHTML = '';

  // Add data in HTML
  categories.forEach((item) => {
    // Create button
    const button = document.createElement("button");
    const img = document.createElement("img");

    button.classList.add("btn");
    button.classList.add("m-2");
    button.classList.add("btn-outline");
    button.classList.add("btn-accent");
    button.classList.add("category-btn");
    button.classList.add("px-10");
    img.src = item.category_icon;
    img.classList.add("w-6");
    button.id = `btn-${item.category}`;
    button.onclick = () => {
      loadCardSection(`${item.category}`);
    };
    // Append the image and text to the button
    button.appendChild(img);
    button.appendChild(document.createTextNode(item.category));

    // Append the button to the categoryContainer
    categoryContainer.appendChild(button);
  });
};

loadCategories();
loadCardCategories();
