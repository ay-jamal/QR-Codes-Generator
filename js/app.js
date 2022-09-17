const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

fetch("ar.json")
  .then((res) => {
    return JSON.parse(res);
  })
  .then((data) => {
    console.log(data);
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
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "احفظ الصوره ";
  document.getElementById("generated").appendChild(link);
};
hideSpinner();
form.addEventListener("submit", onGenetrateSubmit);
