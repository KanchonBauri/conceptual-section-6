const loadAllPhones = async (status, searchText) => {
    // console.log(searchText);
    document.getElementById("spinner").style.display = "none";

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    // .then(res => res.json())
    // .then(data => displayAllPhones(data.data.slice(0,6)))
    // .catch(error => console.log(error))
    

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : "iphone"}`);
    const data = await response.json();
    // console.log(data);

    if (status) {
        displayAllPhones(data.data)
    }
    else {
        displayAllPhones(data.data.slice(0, 6))
    }
    // console.log(status)
}

    const displayAllPhones = (phones) => {

        const lostData = document.getElementById("lostData")
        if(phones.length == 0){
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card bg-base-100 w-96 shadow-xl">
                      <h2 class="card-title p-10">lost Data........................</h2>
            </div>

            `
             lostData.appendChild(div)
        }
        // console.log(phones);

        document.getElementById("phones-container").innerHTML = "";

        const phonesContainer = document.getElementById("phones-container");
        // for(let phone of phones){
        //     console.log(phone)
        // }

        phones.forEach(phone => {
            // console.log(phone);
            const {image, brand, slug, phone_name} = phone;

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card bg-base-100 w-96 shadow-xl">
                 <figure class="px-10 gap-2 pt-10">
                       <img src=${phone.image} />
                 </figure>
                 <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.brand}</h2>
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions">
                        <button   onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                 </div>
            </div>

            `
            
            phonesContainer.appendChild(div)
        });


    }


    const handleShowAll = () => {
        loadAllPhones(true)
        lostData.classList.add("hidden")
    }

    const handleSearch = () => {
        // console.log("search");
        document.getElementById("spinner").style.display = "none "

       

        lostData.classList.remove("hidden")

        const searchText = document.getElementById("search-box").value;

        setTimeout(function () {
            loadAllPhones(false, searchText)
        }, 5000)
    }



    const phoneDetails = async (slug) =>{
        // console.log(slug);
        const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
        const data = await response.json();
        console.log(data.data.mainFeatures);
        console.log(data.data);

       

        const modalDetails = document.getElementById("modal");
        modalDetails.innerHTML = `
         <dialog id="my_modal_1" class="modal">
            <div class="modal-box">
               <div class="flex">
                    <div class="">
                        <figure class="px-10 gap-2 pt-10">
                            <img class="w-[500px]" class="" src=${data.data.image} />
                       </figure>
                   </div>
                   <div>
                       <h2 class="text-gray-500"><span class="font-bold">Brand</span> : ${data.data.brand}</h2>
                       <h2 class="text-gray-500"><span class="font-bold">Name</span> : ${data.data.name}</h2>
                       <h2 class="text-gray-500"><span class="font-bold">Storage</span> : ${data.data.mainFeatures.storage}</h2>
                       <h2 class="text-gray-500"><span class="font-bold">DisplaySize</span> : ${data.data.mainFeatures.displaySize}</h2>
                       <h2 class="text-gray-500"><span class="font-bold">ChipSet</span> : ${data.data.mainFeatures.chipSet}</h2>
                       <h2 class="text-gray-500"><span class="font-bold">Memory</span> : ${data.data.mainFeatures.memory}</h2>
                  </div>
               </div>
              
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
        
        `

        my_modal_1.showModal()
    }
   
    

    loadAllPhones(false, "iphone");