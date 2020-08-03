//LISTEN FOR AUTH STATUS CHANGE
auth.onAuthStateChanged((user) => {
  if (user) {
    //GET DATA FROM FIREBASE
    db.collection("guidez")
      .onSnapshot((snapshot) => {
        setupGuides(snapshot.docs);
        setupUI(user);
      });
  } else {
    // console.log("user logged out");
    setupGuides([]);
    setupUI();
  }
});

//CREATE NEW GUIDE
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("guidez").add({
    title: createForm["title"].value,
    content: createForm["content"].value,
  }).then(()=>{
      //close modal
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
  }).catch(err=>{
      console.log(err.message);
  })
});

//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //sign up the User
  auth.createUserWithEmailAndPassword(email, password).then((credential) => {
    console.log(credential.user);
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

//Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

//Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  auth.signInWithEmailAndPassword(email, password).then((credential) => {
    // console.log(credential.user);
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
