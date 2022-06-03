// console.log("console");

const urlinput = document.getElementById("urlinput");
const urlbtn = document.getElementById("urlbtn");

urlbtn.addEventListener("click", e =>{
    e.preventDefault(); // use for preventing submit button from reloading
    console.log(urlinput.value);
    console.log("button clicked");
    urlbtn.innerText="Downloading file ...";
    fetchFile(urlinput.value);
})

// create new function for perform operation on urllink

function fetchFile(url){
    fetch(url)       //fetchinhg file and returning response to the blob
    .then(res => res.blob())    //blob method reads binary data and convert it into the readable format
    .then(file => {
        let tempurl = URL.createObjectURL(file);  //creates url of passed object
        let aTag = document.createElement("a");  //create a new <a> tag
        aTag.href = tempurl;  //pass this url to the a tag
        aTag.download = url.replace(/^.*[\\\/]/,'');   //download this with file name
        document.body.appendChild(aTag);  // append a tag into the body 
        aTag.click();    
        aTag.remove();
        URL.revokeObjectURL(tempurl);
        // console.log(tempurl);
    urlbtn.innerText="Downloading file ...";

    }).catch(()=>{
        urlbtn.innerText = "Download File";
        alert("Failed to download file!");
    });

}

// ***********************************************************

// mini porject 2 QR code scanner 
const wrapper = document.querySelector(".wrapper"),
form2 = wrapper.querySelector("#form2"),
file2 = form2.querySelector("#file2"),
infotext = form2.querySelector("#qrtext");
// const qrtextarea = document.querySelector("#qrtextarea");
const qrimg = document.getElementById("qrimg");
const qrCloseBtn = document.getElementById("qrCloseBtn");
const qrCopyBtn = document.getElementById("qrCopyBtn");



function fetchRequest(formData, file){
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
      method: "POST", body: formData
  })
  .then(res => res.json())
  .then(result => {
      result = result[0].symbol[0].data;
      console.log(result);
      //   infotext.innerText = "Upload QR Code to scan";
      //   wrapper.classList.add("active");
      wrapper.querySelector(".qrtextarea").innerText = result;
      let form2 = document.getElementById("qrimg").src = URL.createObjectURL(file);
      
      console.log("this is a data",result);
    })
    
}



file2.addEventListener("change", e =>{
    // e.preventDefault();
    let file = e.target.files[0]; //getting use selected file
    let formData = new FormData();   // creating new object 
    formData.append("file", file);   //adding selected file to the new object
    fetchRequest(formData, file);    
    console.log("this is a file ",file);
})

//copy text button logic 
qrCopyBtn.addEventListener("click", ()=>{
    const qrtextarea = document.querySelector(".qrtextarea");
    let text = qrtextarea.textContent;
    // text.execCommand("copy");
    navigator.clipboard.writeText(text);
    console.log(text);
})

form2.addEventListener("click", () => file2.click());










