const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

fetch("js/ar.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data.name);
  });

const onGenetrateSubmit = (e) => {
  claerUi();
  e.preventDefault();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    Swal.fire({
      icon: "error",
      title: " ... اوبس ",
      text: " URL الرجاء ادخال عناون ",
    });
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        creatSavaBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const claerUi = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

const creatSavaBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    " aTag bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "احفظ الصوره ";
  document.getElementById("generated").appendChild(link);
};
hideSpinner();
form.addEventListener("submit", onGenetrateSubmit);

const en = document.querySelector(".english");
en.addEventListener("click", () => {
  fetch("js/lang.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.querySelector(".header").innerHTML = data.en.heading;
      document.querySelector(".para").innerHTML = data.en.firstPara;
      document.querySelector(".para2").innerHTML = data.en.secondePara;
      document.querySelector(".input").placeholder = data.en.placeHolder;
      document.querySelector(".aTag").innerHTML = data.en.imgText;
    });
});

const ar = document.querySelector(".arabic");
ar.addEventListener("click", () => {
  fetch("js/lang.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.querySelector(".header").innerHTML = data.ar.heading;
      document.querySelector(".para").innerHTML = data.ar.firstPara;
      document.querySelector(".para2").innerHTML = data.ar.secondePara;
      document.querySelector(".input").placeholder = data.ar.placeHolder;
      document.querySelector(".aTag").innerHTML = data.ar.imgText;
    });
});
