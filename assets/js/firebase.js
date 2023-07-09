var userEmail
var formQuota
var teamQuota
var prospectQuota
const firebaseConfig = {
    apiKey: "AIzaSyAeK4Sa-5hitMezvtaqC9qBKDxO-VN-X7w",
    authDomain: "Elev8 Admin-ae310.firebaseapp.com",
    projectId: "Elev8 Admin-ae310",
    storageBucket: "Elev8 Admin-ae310.appspot.com",
    messagingSenderId: "102241139444",
    appId: "1:102241139444:web:86e243c660628a044bfca1",
    measurementId: "G-WV3JX67Y6Y"
};
firebase.initializeApp(firebaseConfig);
db = firebase.firestore();
db.settings({ timestampsInSnapshots: true, merge: true });

function getUser() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.email;
            userEmail = uid
            db.collection("users").doc(uid).get().then((doc) => {
                if (doc.exists) {
                  document.getElementById('user').innerHTML = `<option>${doc.data().name}</option>
        <option value = "dumb" onclick="signOut()">Sign Out</option>`
                    if (doc.data().status == "cretin") {
                        window.location.href = './pricing.html'
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
           
            // ...
        } else {
            // User is signed out
            //window.location.href = "https://dashboard.admin.elev8.cards/pages/sign-in.html"
            // ...
        }
    });
}


function createUser() {
    email = document.getElementById("Input_Email").value
    password = document.getElementById("Input_Password").value
    name = document.getElementById("Input_Name").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "value1": email
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://Elev8 Admin.obimedia.agency/onboard", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

            // Add a new document in collection "cities"
            db.collection("users").doc(email.toLowerCase()).set({
                    "email": email,
                    "name": name,
                    "status": "cretin"
                })
                .then(() => {
                    console.log("Document successfully written!");
                    // Signed in 
                    var user = userCredential.user;
                    window.location.href = "./dashboard.html"
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    document.getElementById("error").innerHTML = errorMessage
                    document.getElementById("error").style.display = 'block'
                });

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById("error").innerHTML = errorMessage
            document.getElementById("error").style.display = 'block'
            // ..
        })
}

function SignIn() {
    email = document.getElementById("Input_Email").value
    password = document.getElementById("Input_Password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user.email)
            window.location.href = "./dashboard.html"
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            document.getElementById("error").innerHTML = errorMessage
            document.getElementById("error").style.display = 'block'
        });

}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function createNewForm(name) {
    var id = makeid(100)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("forms").doc(id).set({
                    "id": id,
                    "name": name
                })
                .then(() => {
                    console.log("Document successfully written!");
                    var requestOptions = {
                        method: 'POST',
                        redirect: 'follow'
                    };

                    fetch("https://Elev8 Admin.obimedia.agency/create/" + id + "/" + userEmail, requestOptions)
                        .then(response => response.text())
                        .then(result => window.location.href = "./editor.html?formRef=" + id)
                        .catch(error => console.log('error', error));
                })
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}

function getForms() {
    var template = ""
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("forms").get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    console.log(Object.keys(querySnapshot.docs).length)
                    if (Object.keys(querySnapshot.docs).length == 0) {
                        document.getElementById("Forms").innerHTML = "You have no forms"
                    }
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        template = template + `<tr>
                      <td>
                        <div class="d-flex px-2">

                          <div class="my-auto">
                            <h6 class="mb-0 text-sm">${doc.data().name}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a class="text-sm font-weight-bold mb-0" target="_blank" href="./preview.html?formRef=${doc.id}">Preview</a>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">Private</span>
                      </td>
                      
                      <td class="align-middle">
                        <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" onclick="document.getElementById('${doc.id}-popup').classList.toggle('show')">
                          <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>

                        </button>
                        <div class="popup">
                          <span class="popuptext" id="${doc.id}-popup">
                             <p class="popup-item" onclick="window.open('./editor.html?formRef=${doc.id}')">Edit</p>
                                <br>
                                <p class="popup-item">Publish</p>
                                  <br>
                                  <p class="popup-item" onclick="deleteForm('${doc.id}')">Delete</p>
                            
                            </span>
                            </div>
                      </td>
                    </tr>`
                    });
                    document.getElementById("Forms").innerHTML = template
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    document.getElementById("Forms").innerHTML = "You have no forms"
                });
        }

    })
}

function deleteForm(doc) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("forms").doc(doc).delete().then(() => {
                console.log("Document successfully deleted!");
                var requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                };

                fetch("https://Elev8 Admin.obimedia.agency/delete/" + doc, requestOptions)
                    .then(response => response.text())
                    .then(result => window.location.reload())
                    .catch(error => console.log('error', error));
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    })
}


function getLeads() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.email;
            var select = ""
            db.collection("users").doc(uid).collection("forms").get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    console.log(Object.keys(querySnapshot.docs).length)
                    createTable(querySnapshot.docs[0].id)
                    querySnapshot.forEach((doc) => {

                        select = select + `<option value="${doc.id}">${doc.data().name}</option>`


                    })
                    document.getElementById('formsSelect').innerHTML = select
                })
        }
    })
}

function createTable(id) {
    console.log(id)
    globalId = id
    var json
    fetch("https://Elev8 Admin.obimedia.agency/leads/" + id + '-leads.js')
        .then(response => response.text())
        .then(result => {
            if (result.charAt(0) == ",") {
                result = result.slice(1);
                json = JSON.parse("[" + result + "]")
                console.log(json)
            } else {
                json = JSON.parse("[" + result + "]")
                console.log(json)
            }
            var template = ""
            var tableCells = ""
            let highestLength = 0;
            for (var i in json) {
                if (json[i].metadata.removed == true) {
                    delete json[i]
                } else {
                    delete json[i].metadata
                    let objLength = Object.keys(json[i]).length;
                    if (objLength > highestLength) {
                        highestLength = objLength;
                    }
                    var tableCells = ""
                    for (var n in json[i]) {
                        console.log(json[i][n])
                        if (json[i][n].removed == true) {
                            console.log("hide This Element")
                            i += 1
                        } else {

                            tableCells = tableCells + `

          <td>
            <span class="text-xs font-weight-bold">${json[i][n]}</span>
          </td> 
`
                        }

                    }
                    var template = template + `<tr>
  ${tableCells}
          <td class="align-middle">
                        <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" onclick="document.getElementById('${i}-popup').classList.toggle('show')">
                          <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>

                        </button>
                        <div class="popup">
                          <span class="popuptext" id="${i}-popup">
                                  <p class="popup-item" onclick='getTeamsAsList();window.localStorage.setItem("lead-to-send",JSON.stringify(${JSON.stringify(json[i])}))'>Assign To Team</p>
                                  <br>

                                  <p class="popup-item" onclick="deleteLead('${id}','${i}')">Delete</p>
                            
                            </span>
                            </div>
                      </td>
  </tr> `

                }
                console.log(highestLength)
                createTableHeaders(highestLength)
                document.getElementById('leads').innerHTML = template
            }
        }).catch(error => {
            console.log('error', error)
            document.getElementById('leads').innerHTML = "<center><p>You have no leads</p></center>"
            document.getElementById('headers').innerHTML = ""
        });
}

function createTableHeaders(highestLength) {
    var template = ""
    var highestLength = highestLength += 1
    for (let i = 1; i < highestLength; i++) {
        template = template + `<th>${i}</th>`
    }
    document.getElementById('headers').innerHTML = template + "<th class='align-middle'></th>"
}

function createTeam(name) {
    var id = makeid(100)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("teams").doc(id).set({
                    "id": id,
                    "name": name,
                    "members": []
                })
                .then(() => {
                    console.log("Document successfully written!");
                    window.location.reload()

                })
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}


function getTeams() {
    var template = ""
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("teams").get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    console.log(Object.keys(querySnapshot.docs).length)
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        template = template + `<!-- Column -->
                                    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                                        <!-- Article -->
                                        <article class="overflow-hidden rounded-lg shadow-lg">
                                            <a href="#">
                                                <img alt="Placeholder" class="block h-auto w-full" src="https://i.imgur.com/PIBNHE3.png">
                                            </a>
                                            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                                <h1 class="text-lg">
                                                    <a class="no-underline hover:underline text-black" href="https://dashboard.admin.elev8.cards/pages/team.html?team=${doc.id}">
                                                        ${doc.data().name}
                                                    </a>
                                                </h1>
                                                <p class="text-grey-darker text-sm">
                                                    ${Object.keys(doc.data().members).length} Members
                                                </p>
                                            </header>
                                            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                                                <a class="flex items-center no-underline hover:underline text-black" href="#">
                                                    
                                                    <p class="ml-2 text-sm">
                                    
                                                    </p>
                                                </a>
                                                <a class="no-underline text-grey-darker hover:text-red-dark"  style="cursor:pointer;width:20px" onclick="document.getElementById('${doc.id}-popup').classList.toggle('show')">
                                                    <span class="hidden">Like</span>
                                                    <i class="fa fa-ellipsis-v"></i>
                                                    
                                                </a>
                                            </footer>
                                        </article>
                                        <div class="popup">
                          <span class="popuptext" id="${doc.id}-popup">
                                <p class="popup-item" onclick="getMembers('${doc.id}')">Settings</p>
                                  <br>
                                  <p class="popup-item">Copy Join Link</p>
                                  <br>
                                  <p class="popup-item">Copy Dashboard Link</p>
                                  <br>
                                  <p class="popup-item" onclick="deleteTeam('${doc.id}')">Delete</p>
                            
                            </span>
                            </div>
                                        <!-- END Article -->
                                    </div>
                                    <!-- END Column -->`
                    });
                    document.getElementById("teamCards").innerHTML = template
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    document.getElementById("teamCards").innerHTML = "You have no teams"
                });
        }

    })
}

function deleteTeam(doc) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("teams").doc(doc).delete().then(() => {
                console.log("Document successfully deleted!");
                window.location.reload()
                /*var requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                };

                fetch("https://Elev8 Admin.obimedia.agency/delete/" + doc, requestOptions)
                    .then(response => response.text())
                    .then(result => window.location.reload())
                    .catch(error => console.log('error', error));*/
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    })
}
var document2

function getMembers(document1) {
    document2 = document1
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("teams").doc(document1).get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    var members = ""
                    for (var i in doc.data().members) {
                        members = members + `<li>${doc.data().members[i]} <span style="background-color:#52b36c;color:white;padding: 0px 5px 0px 5px;cursor:pointer" onclick="removeMember('${doc.data().members[i]}')">X</span></li>`
                    }
                    document.getElementById("membersList").innerHTML = members
                    document.getElementById("membersModal").style.display = 'block'
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    })

}


function addMember(member) {
    console.log(document2)
    console.log(member)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("teams").doc(document2).update({
                    members: firebase.firestore.FieldValue.arrayUnion(member)
                }).then(() => {
                    getMembers(document2)
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    })

}

function removeMember(member) {
    console.log(document2)
    console.log(member)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("teams").doc(document2).update({
                    members: firebase.firestore.FieldValue.arrayRemove(member)
                }).then(() => {
                    getMembers(document2)
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    })

}


function getTeamsAsList() {
    var template = ""
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("teams").get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    console.log(Object.keys(querySnapshot.docs).length)
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        template = template + `<li class="team" onclick="assignToTeam('${doc.id}')">${doc.data().name}</li>`
                    });
                    document.getElementById("teamList").innerHTML = template
                    document.getElementById("teamsModal").style.display = 'block'
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    document.getElementById("teamCards").innerHTML = "You have no teams"
                });
        }

    })
}

function assignToTeam(team) {
    console.log(team)
    console.log(window.localStorage.getItem('lead-to-send'))
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = window.localStorage.getItem('lead-to-send')

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://Elev8 Admin.obimedia.agency/teams/submit/" + team, requestOptions)
        .then(response => response.text())
        .then(result => alertMembers(team))
        .catch(error => console.log('error', error));
}


var globalId

function createTeamTable(id) {
    //console.log(id)
    globalId = id
    console.log(globalId)
    var json
    fetch("https://Elev8 Admin.obimedia.agency/teams/" + id + '-leads.js')
        .then(response => response.text())
        .then(result => {
            if (result.charAt(0) == ",") {
                result = result.slice(1);
                json = JSON.parse("[" + result + "]")
                console.log(json)
            } else {
                json = JSON.parse("[" + result + "]")
                console.log(json)
            }

            var template = ""
            var tableCells = ""
            let highestLength = 0;
            for (var i in json) {
                if (json[i].metadata.removed == true) {
                    delete json[i]
                } else {
                    delete json[i].metadata
                    let objLength = Object.keys(json[i]).length;
                    if (objLength > highestLength) {
                        highestLength = objLength;
                    }
                    var tableCells = ""
                    for (var n in json[i]) {
                        console.log(json[i][n])
                        if (json[i][n].removed == true) {
                            console.log("hide This Element")
                            i += 1
                        } else {

                            tableCells = tableCells + `

          <td>
            <span class="text-xs font-weight-bold">${json[i][n]}</span>
          </td> 
`
                        }

                    }
                    var template = template + `<tr>
  ${tableCells}
  </tr> `

                }
                console.log(highestLength)
                createTeamTableHeaders(highestLength)
                document.getElementById('leads').innerHTML = template
            }
        }).catch(error => {
            console.log('error', error)
            document.getElementById('leads').innerHTML = "<center><p>You have no leads</p></center>"
            document.getElementById('headers').innerHTML = ""
        });
}

function createTeamTableHeaders(highestLength) {
    var template = ""
    var highestLength = highestLength += 1
    for (let i = 1; i < highestLength; i++) {
        template = template + `<th>${i}</th>`
    }
    document.getElementById('headers').innerHTML = template
}


function unicornFuck(status) {
    if (status == null || status == "null") {
        window.location.href = './pricing.html'
    } else {
        console.log(status)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.email;
                db.collection("users").doc(uid).update({
                        "status": status
                    }).then(() => {
                        console.log("verified")
                        //window.location.href = "https://dashboard.admin.elev8.cards"
                    })
                    .catch((error) => {
                        console.log("Error getting document:", error);
                    });
            }
        })
    }

}

function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.href = "./sign-in.html"
    }).catch((error) => {
        // An error happened.
    });

}


function populateDashboard() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("forms").get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    console.log(Object.keys(querySnapshot.docs).length)
                    if (Object.keys(querySnapshot.docs).length == 0) {
                        document.getElementById("formsCount").innerHTML = "0"
                    }

                    document.getElementById("formsCount").innerHTML = Object.keys(querySnapshot.docs).length
                    db.collection("users").doc(uid).collection("teams").get()
                        .then((querySnapshot) => {
                            console.log(querySnapshot)
                            console.log(Object.keys(querySnapshot.docs).length)
                            if (Object.keys(querySnapshot.docs).length == 0) {
                                document.getElementById("teamsCount").innerHTML = "0"
                            }

                            document.getElementById("teamsCount").innerHTML = Object.keys(querySnapshot.docs).length
                        })
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    document.getElementById("Forms").innerHTML = "You have no forms"
                });
        }

    })
}

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function downloadLeads() {
    var id = globalId
    console.log(id)
    fetch("https://Elev8 Admin.obimedia.agency/leads/" + id + '-leads.js')
        .then(response => response.text())
        .then(result => {
            if (result.charAt(0) == ",") {
                result = result.slice(1);
                json = JSON.parse("[" + result + "]")
                console.log(json)
            } else {
                json = JSON.parse("[" + result + "]")
                console.log(json)
            }
            var template = ""
            var tableCells = ""
            let highestLength = 0;
            var itemsNotFormatted = []
            var headers = []
            for (var i in json) {
                delete json[i].metadata
                let objLength = Object.keys(json[i]).length;
                if (objLength > highestLength) {
                    highestLength = objLength;
                }
                var tableCells = ""
                for (var n in json[i]) {
                    console.log(json[i][n])
                    if (json[i][n].removed == true) {
                        console.log("hide This Element")
                        i += 1
                    } else {
                        itemsNotFormatted.push(json[i][n])

                    }
                }
            }
            var itemsFormatted = []
            var highestLength1 = highestLength += 1
            for (let i = 1; i < highestLength1; i++) {
                headers.push(i)
            }

            // format the data
            itemsNotFormatted.forEach((item) => {
                console.log(item)
                item = JSON.stringify(item)
                itemsFormatted.push({
                    item
                });
            });

            var fileTitle = globalName; // or 'my-unique-title'

            exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
        }).catch(error => {
            console.log('error', error)
        });
}


function deleteLead(form, lead) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://Elev8 Admin.obimedia.agency/leads/delete/" + form + "/" + lead, requestOptions)
        .then(response => response.text())
        .then(result => createTable(form))
        .catch(error => console.log('error', error));
}


function downloadLeads() {
    var id = globalId
    console.log(id)
    fetch("https://Elev8 Admin.obimedia.agency/leads/" + id + '-leads.js')
        .then(response => response.text())
        .then(result => {
            if (result.charAt(0) == ",") {
                result = result.slice(1);
                json = JSON.parse("[" + result + "]")
                console.log(json)
            } else {
                json = JSON.parse("[" + result + "]")
                console.log(json)
            }
            var template = ""
            var tableCells = ""
            let highestLength = 0;
            var itemsNotFormatted = []
            var headers = []
            for (var i in json) {
                delete json[i].metadata
                let objLength = Object.keys(json[i]).length;
                if (objLength > highestLength) {
                    highestLength = objLength;
                }
                var tableCells = ""
                for (var n in json[i]) {
                    console.log(json[i][n])
                    if (json[i][n].removed == true) {
                        console.log("hide This Element")
                        i += 1
                    } else {
                        itemsNotFormatted.push(json[i][n])

                    }
                }
            }
            var itemsFormatted = []
            var highestLength1 = highestLength += 1
            for (let i = 1; i < highestLength1; i++) {
                headers.push(i)
            }

            // format the data
            itemsNotFormatted.forEach((item) => {
                console.log(item)
                item = JSON.stringify(item)
                itemsFormatted.push({
                    item
                });
            });

            var fileTitle = globalName; // or 'my-unique-title'

            exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
        }).catch(error => {
            console.log('error', error)
        });
}

function alertMembers(document1) {
    document2 = document1
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("teams").doc(document1).get().then((doc) => {
                if (doc.exists) {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "members": doc.data().members
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("https://Elev8 Admin.obimedia.agency/alert/members", requestOptions)
                        .then(response => response.text())
                        .then(result => window.location.reload())
                        .catch(error => console.log('error', error));

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    })

}

function getProspects() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.email;
            var select = ""
            db.collection("users").doc(uid).collection("prospects").get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    console.log(Object.keys(querySnapshot.docs).length)
                    if(Object.keys(querySnapshot.docs).length == 0){
                      document.getElementById('leads').innerHTML = `<center><h3>Download Our Chrome Extension</h3></center><br><center><button style="width: 180px;border: none;background: #52b36c;color: white;" onclick="window.open('https://firebasestorage.googleapis.com/v0/b/Elev8 Admin-ae310.appspot.com/o/Elev8 Admin%20Prospect%202.zip?alt=media&token=b6b53296-5a64-4b61-9d67-c37c11593c49')">Download Now</button>`
                      document.getElementById('headers').innerHTML = ""
                    }else{
                    var template = ""
                    querySnapshot.forEach((doc) => {
                        template = template + `<tr>
         <td>
            <span class="text-xs font-weight-bold"><a href="mailto:${doc.id}">${doc.id}</span>
          </td>
          <td class="align-middle">
                        <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" onclick="document.getElementById('${doc.id}-popup').classList.toggle('show')">
                          <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>

                        </button>
                        <div class="popup">
                          <span class="popuptext" id="${doc.id}-popup">
                                  
                                  <br>

                                  <p class="popup-item" onclick="deleteProspect('${doc.id}')">Delete</p>
                            
                            </span>
                            </div>
                      </td>
  </tr> `


                    })
                    document.getElementById('leads').innerHTML = template
                  }
                    
                })
        }
    })
}




function deleteProspect(doc) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.email;
            db.collection("users").doc(uid).collection("prospects").doc(doc).delete().then(() => {
                console.log("Document successfully deleted!");
                window.location.reload()
                /*var requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                };

                fetch("https://Elev8 Admin.obimedia.agency/delete/" + doc, requestOptions)
                    .then(response => response.text())
                    .then(result => window.location.reload())
                    .catch(error => console.log('error', error));*/
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    })
}


function downloadProspects() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.email;
            var select = ""
            db.collection("users").doc(uid).collection("prospects").get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    console.log(Object.keys(querySnapshot.docs).length)
                    var template = ""
                    var tableCells = ""
                    let highestLength = 0;
                    var itemsNotFormatted = []
                    var headers = ["Email"]

                    querySnapshot.forEach((doc) => {

                        itemsNotFormatted.push(doc.id)

                    })
                    itemsNotFormatted
                    var itemsFormatted = []
                    var highestLength1 = highestLength += 1
                    for (let i = 1; i < highestLength1; i++) {
                        headers.push(i)
                    }

                    // format the data
                    itemsNotFormatted.forEach((item) => {
                        console.log(item)
                        item = JSON.stringify(item)
                        itemsFormatted.push({
                            item
                        });
                    });

                    var fileTitle = "Elev8 Admin-Prospects"; // or 'my-unique-title'

                    exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
                }).catch(error => {
                    console.log('error', error)
                });
        }
    })
}

// Paste this in:
function clearAllProspects(path) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.email;
            var select = ""
             db.collection("users").doc(uid).collection("prospects").onSnapshot((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  console.log(doc.data())
                    ref.doc(doc.id).delete()

                }).then((result)=>{
                  console.log(result)
                })

            })

        }
    })
}