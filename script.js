const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const datas = await res.json();
  const phone = datas.data;
  displayPhones(phone);
};

const displayPhones = (phones) => {
  const phoneShow = document.getElementById("phone-container");
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
};

loadPhone();
