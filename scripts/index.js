const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const setupUI = (user) => {
    if (user) {
        //toggle ui elements
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  }
  else{
      //toggle ui elements
      loggedOutLinks.forEach(item=>item.style.display='block');
      loggedInLinks.forEach(item=>item.style.display='none');
  }
};

//setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((element) => {
      const guide = element.data();
      // console.log(guide);
      const li = `
     <li>
     <div class="collapsible-header grey lighten-4">${guide.title}</div>
     <div class="collapsible-body white">${guide.content}</div>
     </li>
    `;
      html += li;
    });

    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = `<h5 class='center-align'>Login to view guides</h5>`;
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
