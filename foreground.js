console.log("from foreground")
pageDiv = document.getElementById("page")

if (!pageDiv.dataset.has_gallery){
  console.log("add gallery")
  var temp = document.createElement("div")
  temp.innerHTML = '<div id="myModal" class="modal"><span class="close">&times;</span><img class="modal-content" id="img01"><div id="caption"></div></div>'
  pageDiv.appendChild(temp.firstChild)

  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  var current_img = null

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  close = function() {
    modal.style.display = "none";
    current_img = null;
  }
  span.onclick = close
  modal.onclick = close
  document.onkeydown = (event => {
    if ("key" in event && event.key === "Escape" || event.key === "Esc") {
      close()
    }
    if (current_img != null && event.key == "ArrowLeft") {
      previous = current_img.parentNode.parentNode.previousElementSibling
      if(previous != null) {
        set_image(previous.firstElementChild.firstElementChild)
      }
    }
    if (current_img != null && event.key == "ArrowRight") {
      next = current_img.parentNode.parentNode.nextElementSibling
      if(next != null){
        set_image(next.firstElementChild.firstElementChild)
      }
    }
  })

  document.getElementById("new_gallery").addEventListener("click", (event) => {
    event.preventDefault()
    set_image(event.target)
  })

  function set_image(img){
    modalImg.src = ""
    captionText.innerHTML = ""
    current_img = img;
    url = img.getAttribute("src");
    url = url.replace("s.", ".");
    modal.style.display = "block";
    modalImg.src = url;
    captionText.innerHTML = img.getAttribute("title");
  }

  pageDiv.dataset.has_gallery = true
}