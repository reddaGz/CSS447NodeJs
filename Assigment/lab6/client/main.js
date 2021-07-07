function loginDisplay() {
  document.getElementById("navigation_page").style.display = "none";
  document.getElementById("login_form_id").style.display = "block";
  document.getElementById("add_book_id").style.display = "none";
  document.getElementById("book_container").style.display = "none";
  document.getElementById("error_div").style.display = "none";
  sessionStorage.removeItem("token");
}
function displayMainPage() {
  document.getElementById("navigation_page").style.display = "block";
  document.getElementById("login_form_id").style.display = "none";
  document.getElementById("add_book_id").style.display = "block";
  document.getElementById("book_container").style.display = "block";
}
function displayBookForm() {
  document.getElementById("add_book_id").style.display = "block";
}

window.onload = function () {
  loginDisplay();
  document.getElementById("logout").onclick = loginDisplay;
  document.getElementById("login").onclick = loginPage;
  async function loginPage() {
    const token = await (
      await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: document.getElementById("user_name").value,
          password: document.getElementById("password").value,
        }),
      })
    ).json();
    if (token.jwtToken) {
      sessionStorage.setItem("token", token.jwtToken);
      displayMainPage();
      fetchAllBooks();
    } else {
      document.getElementById("error_div").style.display = "block";
      document.getElementById("wrong_message").innerHTML = token.error;
    }
  }

  document.getElementById("addBtn").onclick = function (event) {
    const btnId = this.dataset.id;
    event.preventDefault();
    if (btnId) {
      fetch("http://localhost:3000/books/" + btnId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: document.getElementById("title").value,
          ISBN: document.getElementById("ISBN").value,
          publishDate: document.getElementById("publishDate").value,
          author: document.getElementById("author").value,
        }),
      })
        .then((data) => data.json())
        .then((res) => {
          if(res.error!=="unauthorize"){
            document.getElementById("form-title").textContent = "Add a Book";
            document.getElementById("add-form").reset();
            document.getElementById("addBtn").dataset.id = "";
            location.reload();
          }else{
            alert(res.error+" to update")
          }
        });
    } else {
      addNewBook();
    }
  };
};
async function fetchAllBooks() {
  const books = await (
    await fetch("http://localhost:3000/books", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
  ).json();
  const bookDisplay = document.getElementById("display-book");
  books.forEach((data) => {
    displayToClient(bookDisplay, data);
  });
}
function addNewBook() {
  {
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        ISBN: document.getElementById("ISBN").value,
        publishDate: document.getElementById("publishDate").value,
        author: document.getElementById("author").value,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.error === "unauthorize");
        if (data.error !== "unauthorize") {
          // document.getElementById('add_book_id').style.display='none';
          const bookDisplay = document.getElementById("display-book");
          displayToClient(bookDisplay, data);
        }else{
          alert(data.error)
        }
      });
  }
}
function displayToClient(bookDisplay, data) {
  const listInfo = document.createElement("div");
  listInfo.className = "col-lg-4";
  listInfo.id = data.id;
  bookDisplay.append(listInfo);
  const image = document.createElement("img");
  image.src = "./image/libraray.jpeg";
  image.alt = "image";
  image.width = "100";
  image.height = "60";
  listInfo.append(image);
  const titleH = document.createElement("h2");
  titleH.innerHTML = data.title;
  listInfo.append(titleH);
  const viewBtn = document.createElement("button");
  viewBtn.className = "btn btn-info";
  viewBtn.innerHTML = "view details";
  viewBtn.dataset.id = data.id;
  listInfo.append(viewBtn);
  bookDisplay.append(listInfo);
  document.getElementById("add_form").reset();
  viewBtn.addEventListener("click", function () {
    const viewDetail = document.getElementById(`${data.id}`);
    const isbn = document.createElement("h5");
    isbn.innerHTML = "ISBN :" + data.ISBN;
    viewDetail.appendChild(isbn);
    const publishDate = document.createElement("h5");
    publishDate.innerHTML = "Publish date: " + data.publishDate;
    viewDetail.appendChild(publishDate);
    const author = document.createElement("h5");
    author.innerHTML = "Author: " + data.author;
    viewDetail.appendChild(author);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.innerHTML = "delete";
    deleteBtn.dataset.id = data.id;
    viewDetail.append(deleteBtn);
    const updateBtn = document.createElement("button");
    updateBtn.className = "btn btn-warning";
    updateBtn.innerHTML = "update";
    updateBtn.dataset.id = data.id;
    viewDetail.append(updateBtn);
    deleteBtn.addEventListener("click", function () {
      fetch("http://localhost:3000/books/" + data.id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }).then((data) =>data.json()
      ).then(res=>{
       if(res.error !== "unauthorize"){
        viewDetail.remove();
       }else{
        alert(res.error+" to delete") 
       } 
      });
    });
    updateBtn.addEventListener("click", function () {
      fetch("http://localhost:3000/books/" + data.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
        .then((data) => data.json())
        .then((data) => {
          document.getElementById("form-title").textContent = "Edit a Product";
          document.getElementById("title").value = data.title;
          document.getElementById("ISBN").value = data.ISBN;
          document.getElementById("publishDate").value = data.publishDate;
          document.getElementById("author").value = data.author;
          document.getElementById("addBtn").dataset.id = data.id;
        });
    });
  });
}
