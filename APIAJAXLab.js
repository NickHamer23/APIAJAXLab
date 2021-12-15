(function () {
  const textInput = document.querySelector("#textInput");
  const submitButton = document.querySelector("#submitButton");
  const displayTable = document.querySelector(".displayTable");
  let subreddit = "aww";
  let isLoaded = false;
  loadPage();

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    subreddit = textInput.value;
    console.log(subreddit);
    isLoaded = true;
    loadPage();
  });
  function loadPage() {
    fetch(`https://www.reddit.com/r/${subreddit}/.json`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < 10; i++) {
          if (isLoaded === true) {
            displayTable.deleteRow(i);
          }
          const newRow = displayTable.insertRow(i);
          const cell0 = newRow.insertCell(0);
          const cell1 = newRow.insertCell(1);
          const cell2 = newRow.insertCell(2);

          newRow.classList.add("newRow");
          cell0.classList.add("cell", "cell0");
          cell1.classList.add("cell", "cell1");
          cell2.classList.add("cell", "cell2");

          if (
            data.data.children[i].data.thumbnail === "default" ||
            data.data.children[i].data.thumbnail === "self" ||
            data.data.children[i].data.thumbnail === "spoiler"
          ) {
            cell0.innerHTML = `<img src='assests/defualtImg.jpg'>`;
            cell0.style.height = "20px";
            cell0.style.width = "20px";
          } else {
            cell0.innerHTML = `<img src=${data.data.children[i].data.thumbnail}>`;
          }
          cell1.innerText = data.data.children[i].data.title;
          cell2.innerHTML = `<a href=${data.data.children[i].data.url}>${data.data.children[i].data.url}</a>`;
        }
      });
  }
})();
