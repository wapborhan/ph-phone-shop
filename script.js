const defaultloadPhone = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=samsung`
  );
  const datas = await res.json();
  const phone = datas.data;
  displayPhones(phone);
};
defaultloadPhone();

const loadPhone = async (inputtext) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputtext}`
  );
  const datas = await res.json();
  const phone = datas.data;
  displayPhones(phone);
};

const displayPhones = (phones) => {
  // handleShowAll(phones);
  // Clear phone showing
  const phoneShow = document.getElementById("phone-container");

  phoneShow.innerHTML = "";
  const ShowButton = document.getElementById("show-all-container");

  if (phones.length > 9) {
    ShowButton.classList.remove("hidden");
  } else {
    ShowButton.classList.add("hidden");
  }

  phones = phones.slice(0, 9);

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
  <figure class="px-10 pt-10">
    <img src=${phone.image} alt=${phone.phone_name} class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>Brand: ${phone.brand}</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    `;
    phoneShow.appendChild(phoneCard);
  });
  toggleLoader(false);
};
const handleSearch = () => {
  toggleLoader(true);
  const inputData = document.getElementById("search-field").value;
  loadPhone(inputData);
};

const toggleLoader = (isLoading) => {
  const loader = document.getElementById("loading-spinner");
  const phoneShow = document.getElementById("phone-container");

  if (isLoading) {
    loader.classList.remove("hidden");
    phoneShow.classList.add("hidden");
  } else {
    loader.classList.add("hidden");
    phoneShow.classList.remove("hidden");
  }
};

// const handleShowAll = (phones) => {
//   console.log(phones);
//   phones = phones.slice(10, 12);
// };
