var html = ""
var color
var textColor
var buttonColor
var formResponses = {}
var form
var questions
var owner

function createForm() {
    for (var f in form) {
        if (form[f].options) {
            form[f].options.forEach((config) => {
                document.getElementById("FormImg").src = config.image
                document.getElementById("FormTitle").innerHTML = config.title
                owner = config.owner

                color = config.color
                textColor = config.textColor
                buttonColor = config.buttonColor

            })
        }
    }
}

createForm()


function renderQuestions() {
    html = ""
    for (var i in questions) {




        if (questions[i].type == "button") {
            html = html + ``
        }



        if (questions[i].type == "multiple") {
            var start = ""
            var choices = ""
            if (questions[i].options) {
                questions[i].options.forEach((options) => {
                    choices = choices + `
          <li>
            <input type="radio" class="custom-checkbox" name="${i}question-option-${options.text}" id="${i}question-option-${options.text}" value="${options.text}" onclick="formResponses[${i}]=this.value;console.log(formResponses[${i}]);document.getElementById('${options.next}').style.display='block';window.location.href='#${options.next}'">
            <label for="${i}question-option-${options.text}">
                ${options.text}
            </label>
        </li>
  `
                });
            }
            if (i == 1) {
                start = "start"
            }

            html = html + `<div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <ul class="options full">
                                    ${choices}
                                    </ul>
                                </div>
                            </div>
                        </div>`
        }
        if (questions[i].type == "select") {
            var start = ""
            var choices = ""
            if (questions[i].options) {
                console.log(questions[i].options)
                questions[i].options.forEach((option) => {
                    console.log(option)
                    choices = choices + `
<option value="${option.text}">${option.text}</option>
  `
                });
            }
            console.log(questions[i].type)
            console.log(i)
            if (i == 1) {
                start = "start"
            }
            html = html + `         <div class="step  ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div><br>

                            </div>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <select name="age" id="select${i}" onchange="formResponses[${i}]=this.value;console.log(formResponses[${i}]);document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">
                                    <option>Please Select A Value</option>
                                    ${choices}
                                    </select>
                                    <div class="help text-size-smaller">
                                    </div>
                                </div>
                            </div>
                        </div>




                        `
        }
        if (questions[i].type == "checkbox") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ``
        }
        if (questions[i].type == "color") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
         <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" type="color" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])" style="
    padding-top: 15px;
">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
     `
        }
        if (questions[i].type == "date") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + `         
    <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="date${i}" size="60" type="date" format="DD/MM/YYYY" placeholder="Please select a date:" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }
        if (questions[i].type == "datetime-local") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
        <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" size="60" class="date" type="datetime-local" format="DD/MM/YYYY" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>

     `
        }
        if (questions[i].type == "email") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
        <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" type="email" placeholder="${questions[i].placeholder}" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>

     `
        }
        if (questions[i].type == "file") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + `       
     <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}file" size="60" type="file" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])" style="
    padding-top: 15px;
">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
`
        }

        if (questions[i].type == "month") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
        <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" size="60" type="month" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
     `
        }
        if (questions[i].type == "number") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
        <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" type="number" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>

     `
        }
        if (questions[i].type == "submit") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
        <div class="step ${start}" id="${i}" style="padding-top:70px !important">
            <center><span class="button next" id="Submit" style="position:absolute; left:30%;" onclick="submitForm('${questions[i].redirect}')">${questions[i].text}</span></center>
        </div>
     `
        }
        if (questions[i].type == "range") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
        <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" size="60" type="range" min="${questions[i].min}" max="${questions[i].max}" style="padding:0;-webkit-appearance: auto;" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
      `
        }

        if (questions[i].type == "text") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + `
         <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                    <input type="text" name="${i}input" id="${i}input" class="input" pattern="\d*" maxlength="${questions[i].maxLength}" placeholder="${questions[i].placeholder}">
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="formResponses[${i}]=document.getElementById('${i}input').value;console.log(formResponses[${i}]);document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
    `
        }
        if (questions[i].type == "time") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
            <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" size="60" type="time" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div> `
        }
        if (questions[i].type == "url") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + `        
    <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" size="60" type="text" placeholder="${questions[i].placeholder}" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }
        if (questions[i].type == "week") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
        <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <input id="${i}input" size="60" type="week" onchange="formResponses[${i}] = this.value; console.log(formResponses[${i}])">
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
      `
        }
        if (questions[i].type == "message") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
        <div class="step ${start}" id="${i}">
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <fieldset>
                                            <h3 style="color:${textColor} !important;font-size:${questions[i].fontSize} !important" id="${i}message">
                                            ${questions[i].content}
                                            </h3>
                                         </fieldset><br>                                    
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
    `
        }
        if (questions[i].type == "currency") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 


         <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="field-icon">

                                        <span style="
    top: 44px;
    z-index: 10;
    left: 20px;
    FONT-SIZE: 20px;
">${questions[i].prefix}</span>
                                    <input type="text" name="${i}input" id="${i}input" class="currency_input" pattern="\d*" maxlength="${questions[i].maxLength}" placeholder="${questions[i].placeholder}" oninput="formatCurrency(this.id)">
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="formResponses[${i}]='${questions[i].prefix}'+document.getElementById('${i}input').value;console.log(formResponses[${i}]);document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
    `
        }
        if (questions[i].type == "textbox") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + `
         <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color}!important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div><br>
                            <div class="answer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                    <center><textarea id="${i}textarea" class="textarea" placeholder="Start typing your response..." rows="7" cols="27" maxlength="200" oninput="formResponses[${i}]=this.value"></textarea>
                                    </div>
                                    <p class="h5 print margin-none"><span class="answer_pull"></span></p>
                                    <div class="help text-size-smaller">
                                    </div><br>
                                    <div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="formResponses[${i}]=document.getElementById('${i}textarea').value;console.log(formResponses[${i}]);document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
    `
        }
        if (questions[i].type == "contact") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + `
         <div class="step ${start}" id="${i}">
                            <div class="question" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <label style="color:${textColor} !important" class="h6 margin-none">${questions[i].text}</label>
                                </div>
                            </div>
                            <div class="answer" id="contactAnswer" style="display: block;">
                                <div class="content" style="background-color:${color} !important">
                                    <div class="">
                                        <div class="container">
                                            <h5 style="color:${textColor}">Contact Details:</h5>
                                            <br>
                                            <fieldset>
                                                <label style="color:${textColor}">Name:</label>
                                                <input placeholder="Your name" type="text" tabindex="1" required="" autofocus="" onchange="contactName${i} = this.value" onblur="contactName${i} = this.value; console.log(contactName${i})">
                                                <span class="error" id="nameofapplicanterror1"><i class="fa-solid fa-triangle-exclamation"></i>This Field is Required</span>
                                            </fieldset><br>
                                            <fieldset>
                                                <label style="color:${textColor}">Email:</label>
                                                <input placeholder="Your Email Address" type="email" tabindex="2" required="" onchange="contactEmail${i} = this.value" onblur="contactEmail${i} = this.value;console.log(contactEmail${i})">
                                            </fieldset><br>
                                            <fieldset>
                                                <label style="color:${textColor}">Phone Number</label>
                                                <input placeholder="Your Phone Number" type="tel" tabindex="3" required="" onchange="contactPhone${i} = this.value " onblur="contactPhone${i} = this.value;console.log(contactPhone${i})">
                                            </fieldset><br>
                                                <center><div class="navigation">
                                        <span class="button next" style="background-color:${buttonColor} !important; color:${textColor} !important" onclick="document.getElementById('${questions[i].next}').style.display='block';window.location.href='#${questions[i].next}'">Next</span>
                                    </div></center>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
        }

        document.getElementById("Elev8 Admin").innerHTML = html
    }
}
renderQuestions()





function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var docId = getParameterByName('formRef');
fetch('https://Elev8 Admin.obimedia.agency/forms/' + docId + '-config.js').then(v => {
    v.text().then(txt => {
        eval(txt)
        window.form = form
        window.questions = questions
        createForm(form)
        renderQuestions(questions)
        window.localStorage.setItem("form", form)
        window.localStorage.setItem("questions", questions)

    })
    form = window.localStorage.getItem("form")
    questions = window.localStorage.getItem("questions")
})


function formatCurrency(id) {
    var finalValue
    var input = document.getElementById(id).value
    var rex = /(^\d{2})|(\d{1,3})(?=\d{1,3}|$)/g,
        val = input.replace(/^0+|\.|,/g, ""),
        res;

    if (val.length) {
        res = Array.prototype.reduce.call(val, (p, c) => c + p) // reverse the pure numbers string
            .match(rex) // get groups in array
            .reduce((p, c, i) => i - 1 ? p + "," + c : p + "." + c); // insert (.) and (,) accordingly
        res += /\.|,/.test(res) ? "" : ".0"; // test if res has (.) or (,) in it
        finalValue = Array.prototype.reduce.call(res, (p, c) => c + p); // reverse the string and display
    }
    if (finalValue == undefined) {
        document.getElementById(id).value = ""
    } else {
        document.getElementById(id).value = finalValue
    }
}



function submitForm(redirect) {
    console.log(owner)
    docId = getParameterByName("formRef")
    console.log(formResponses)
    for (var i in questions) {
        var hello = Object.keys(questions).length
        if (questions[i].type == "contact") {
            formResponses[hello += 1] = window[`contactName${i}`]
            formResponses[hello += 1] = window[`contactEmail${i}`]
            formResponses[hello += 1] = window[`contactPhone${i}`]
        }

    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(formResponses)

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://Elev8 Admin.obimedia.agency/submit/" + docId+"/"+owner, requestOptions)
        .then(response => response.text())
        .then(result => window.location.href = redirect)
        .catch(error => console.log('error', error));


}