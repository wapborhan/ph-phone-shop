// const defaultloadPhone = async (isShowAll) => {
//   const res = await fetch(
//     `https://openapi.programming-hero.com/api/phones?search=samsung`
//   );
//   const datas = await res.json();
//   const phone = datas.data;
//   displayPhones(phone, isShowAll);
// };
// defaultloadPhone();

const loadPhone = async (inputtext, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputtext}`
  );
  const datas = await res.json();
  isData = datas.status;
  const phone = datas.data;
  // displayPhones(phone, isShowAll, inputtext, isData);

  dataLoad(phone, isShowAll, inputtext, isData);
};

const dataLoad = (phone, isShowAll, inputtext, isData) => {
  const phoneShow = document.getElementById("phone-container");
  const warnMsg = document.getElementById("warn");
  const phoneName = document.getElementById("phone-name");
  const ShowButton = document.getElementById("show-all-container");
  if (isData) {
    displayPhones(phone, isShowAll, inputtext, isData);
  } else {
    warnMsg.classList.remove("hidden");
    phoneShow.innerHTML = "";
    phoneName.innerText = inputtext;
    ShowButton.classList.add("hidden");
    toggleLoader(false);
  }
};

const displayPhones = (phones, isShowAll, inputtext) => {
  // handleShowAll(phones);
  // Clear phone showing
  const phoneShow = document.getElementById("phone-container");
  const warnMsg = document.getElementById("warn");

  phoneShow.innerHTML = "";
  const ShowButton = document.getElementById("show-all-container");

  if (phones.length > 9 && !isShowAll) {
    ShowButton.classList.remove("hidden");
  } else {
    ShowButton.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 8);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
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
  inputtext = "";
  warnMsg.classList.add("hidden");
  toggleLoader(false);
};
const handleSearch = (isShowAll) => {
  toggleLoader(true);
  const inputData = document.getElementById("search-field").value;
  loadPhone(inputData, isShowAll);
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

const handleShowAll = () => {
  handleSearch(true);
};
