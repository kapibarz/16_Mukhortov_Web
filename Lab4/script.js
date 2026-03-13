const themeBtn = document.querySelector(".fixed-button-tochangecolor");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    setCookie("darkTheme", document.body.classList.contains("dark-theme")?"1":"0", 7);
    });
if(getCookie("darkTheme")==="1") document.body.classList.add("dark-theme");

const reviewsContainer = document.getElementById("reviewsContainer");
let reviews = [
    {name:"Димитрий", text:"Заказал этот газон на участок но в пока вез его домой, почувствовал насколько приятно он пахнет и скурил его, меня вштырило похлеще чем мета Уолтера Уайта 10 кайфов из 10", image: ""},
    {name:"Макар", text:"Друзья, эта трава просто отвал бошки! Сначала мне не понравился её цвет, но ребятааа... Когда я впервые прошёлся по этому газону - ощущения были странные, голова начала кружиться и я даже упал. Лёжа лицом вниз, я вдохнул и... Ну трава что надо, в общем. Всем рекомендую. Косяков нет", image: ""}
];

function showReviews() {
    reviewsContainer.innerHTML = "";
    reviews.forEach(r => {
        const div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.marginBottom = "10px";
        div.style.borderRadius = "6px";

        div.innerHTML = `<b>${r.name}:</b> ${r.text}`;

        if (r.image) {
            const img = document.createElement("img");
            img.src = r.image;
            img.style.maxWidth = "100%";
            img.style.marginTop = "15px";
            img.style.borderRadius = "6px";
            div.appendChild(img);
        }

        reviewsContainer.appendChild(div);
    });
}

showReviews();

const reviewForm = document.querySelector(".form-review");
reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const text = document.getElementById("reviewText").value.trim();
    const fileInput = document.getElementById("reviewImage");
    const file = fileInput.files[0];

    if (!name || !text) {
        alert("Введите имя и текст отзыва!");
        return;
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            reviews.push({name, text, image: event.target.result});
            showReviews();
        }
        reader.readAsDataURL(file);
    } else {
        reviews.push({name, text, image: ""});
        showReviews();
    }

    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";
    fileInput.value = "";
});