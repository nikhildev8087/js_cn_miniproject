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















