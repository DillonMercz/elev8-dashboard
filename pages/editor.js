function renderForm() {
    for (var f in form) {
        if (form[f].options) {
            form[f].options.forEach((config) => {
                document.getElementById("FormNameInput").value = config.title
                document.getElementById("FormColorPicker").value = config.color
                document.getElementById("FormColorInput").value = config.color
                document.getElementById("FontColorInput").value = config.textColor
                document.getElementById("FontColorPicker").value = config.textColor
                document.getElementById("ButtonColorInput").value = config.buttonColor
                document.getElementById("ButtonColorPicker").value = config.buttonColor

                color = config.color
                textColor = config.textColor

            })
        }
    }
}
renderForm()


function renderElements() {
            if (JSON.stringify(questions) == {} || JSON.stringify(questions) == undefined || JSON.stringify(questions) == "undefined") {
        console.log("No Elements")
        document.getElementById('elementsContainer').innerHTML = `<center><p>You have no elements. Click <a style="color:blue;cursor:pointer" onclick="document.getElementById('AddTab').click()">Add</a> to get started.</p></center?`
        document.getElementById('Elev8 Admin').innerHTML = ''
    }
    
    html = ""
    for (var i in questions) {



        if (questions[i].type == "textbox") {
            html = html + `
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Textbox Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}email-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div><br>
                            <p style="margin-bottom:0px">Placeholder:</p>
                            <div>
                                <input id="${i}email-placeholder" type="text" class="elementSettingsInput colorInput" placeholder="Start Typing..." value="${questions[i].placeholder}" oninput="questions[${i}].placeholder = this.value;renderQuestions();uploadForm()">
                            </div><br>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}email-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
                            </div>
                        </div>
                   </div>
                </div>
`
        }



        if (questions[i].type == "multiple") {
            var start = ""
            var choices = ""
            var optionNum = -1
            var newOption1 = questions[i].options.length
            var newOption = newOption1 += 1
            var nextQuestion1 = i
            var nextQuestion2 = nextQuestion1++
            var nextQuestion = nextQuestion2++
            if (questions[i].options) {
                questions[i].options.forEach((options) => {
                    optionNum += 1

                    choices = choices + `

                            <div style="margin-bottom:10px">
                                <input id="${i}multiple-option-${optionNum}" type="text" class="elementSettingsInput colorInput" placeholder="Option Title" value="${questions[i].options[optionNum].text}" oninput="questions[${i}].options[${optionNum}].text = this.value;renderQuestions();uploadForm()">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}multiple-option-${optionNum}-question" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].options[optionNum].next}" oninput="questions[${i}].options[${optionNum}].next = this.value;renderQuestions();uploadForm()">
                                </div>
                            </div>

  `
                });
            }
            if (i == 1) {
                start = "start"
            }


            html = html + `
            <button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Multiple Choice </button>
                        <div class="content">
                        <div class="setting">
                        <p style="margin-bottom:0px">Section Title</p>
                            <div>
                                <input id="${i}multiple-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                        </div><br>
                        <p style="margin-bottom:0px">Options:</p>
                        ${choices}
                        <center><button class="w3-button w3-xsmall w3-circle w3-teal w3-card-4" onclick="questions[${i}].options.push({text:'Option ${newOption}', next: ${nextQuestion}});renderElements();renderQuestions();uploadForm()">+</button></center>

                    </div>
                    `
        }
        if (questions[i].type == "select") {
            var start = ""
            var choices = ""
            var optionNum = -1
            var newOption1 = questions[i].options.length
            var newOption = newOption1 += 1
            var nextQuestion1 = i
            var nextQuestion2 = nextQuestion1++
            var nextQuestion = nextQuestion2++
            if (questions[i].options) {
                questions[i].options.forEach((options) => {
                    optionNum += 1

                    choices = choices + `

                            <div style="margin-bottom:10px">
                                <input id="${i}multiple-option-${optionNum}" type="text" class="elementSettingsInput colorInput" placeholder="Option Title" value="${questions[i].options[optionNum].text}" oninput="questions[${i}].options[${optionNum}].text = this.value;renderQuestions();uploadForm()">
                            </div>

  `
                });
            }
            if (i == 1) {
                start = "start"
            }


            html = html + `
            <button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Dropdown Select </button>
                        <div class="content">
                        <div class="setting">
                        <p style="margin-bottom:0px">Section Title</p>
                            <div>
                                <input id="${i}select-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                        </div><br>
                        <p style="margin-bottom:0px">Options:</p>
                        ${choices}

                        <center><button class="w3-button w3-xsmall w3-circle w3-teal w3-card-4" onclick="questions[${i}].options.push({text:'Option ${newOption}', next: ${nextQuestion}});renderElements();renderQuestions();uploadForm()">+</button></center>
                        <br>
                        <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                            <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                <input id="${i}select-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Color Input </button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}color-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}color-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Date Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}date-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}date-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Date and Time Input </button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}datetime-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}datetime-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Email Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}email-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div><br>
                            <p style="margin-bottom:0px">Placeholder:</p>
                            <div>
                                <input id="${i}email-placeholder" type="text" class="elementSettingsInput colorInput" placeholder="Start Typing..." value="${questions[i].placeholder}" oninput="questions[${i}].placeholder = this.value;renderQuestions();uploadForm()">
                            </div><br>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}email-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: File Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}file-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}file-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Month Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}month-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}month-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Number Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}number-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}number-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Submit Button</button>

                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Button Text:</p>
                            <div>
                                <input id="${i}text-title" type="text" class="elementSettingsInput colorInput" placeholder="Button Text" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div><br>
                            <p style="margin-bottom:0px">Redirect Url:</p>
                            <div>
                                <input id="${i}text-placeholder" type="text" class="elementSettingsInput colorInput" placeholder="https://admin.elev8.cards" value="${questions[i].redirect}" oninput="questions[${i}].redirect = this.value;renderQuestions();uploadForm()">
                            </div><br>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}text-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
                            </div>
                        </div>
                   </div>
                </div>
     `
        }
        if (questions[i].type == "range") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + ` 
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Range Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}range-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div><br>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Minimum Value:</p>
                                    <input id="${i}text-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].min}" oninput="questions[${i}].min = this.value;renderQuestions();uploadForm()">
                                </div>
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Maximum Value:</p>
                                    <input id="${i}range-max" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].max}" oninput="questions[${i}].max = this.value;renderQuestions();uploadForm()">
                                </div>
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}text-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
                            </div>
                        </div>
                   </div>
                </div>
      `
        }

        if (questions[i].type == "text") {
            html = html + `
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Text Input</button>

                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}text-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div><br>
                            <p style="margin-bottom:0px">Placeholder:</p>
                            <div>
                                <input id="${i}text-placeholder" type="text" class="elementSettingsInput colorInput" placeholder="Start Typing..." value="${questions[i].placeholder}" oninput="questions[${i}].placeholder = this.value;renderQuestions();uploadForm()">
                            </div><br>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}text-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Time Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}time-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}time-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
                            </div>
                        </div>
                   </div>
                </div>`
        }
        if (questions[i].type == "url") {
            var start = ""
            if (i == 1) {
                start = "start"
            }
            html = html + `        
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: URL Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}url-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div><br>
                            <p style="margin-bottom:0px">Placeholder:</p>
                            <div>
                                <input id="${i}url-placeholder" type="text" class="elementSettingsInput colorInput" placeholder="Start Typing..." value="${questions[i].placeholder}" oninput="questions[${i}].placeholder = this.value;renderQuestions();uploadForm()">
                            </div><br>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}url-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Week Input</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}week-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}week-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
                <button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Message</button>
                    <div class="content">
                        <div class="setting">
                            <p style="margin-bottom:5px">Message Content:</p>
                                <div>
                                    <center><textarea id="${i}message-title" class="textarea" placeholder="Start typing your message..." rows="7" cols="27" maxlength="200" value="${questions[i].content}" oninput="questions[${i}].content = this.value;renderQuestions();uploadForm()">${questions[i].content}</textarea></center>
                                </div>
                            </div><br>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}message-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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

<button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Currency Input</button>
                        <div class="content">
                                 
                         <div class="setting">
                        <p style="margin-bottom:0px">Section Title</p>
                            <div>
                                <input id="${i}currency-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div><br>
                            <p style="margin-bottom:0px">Placeholder:</p>
                            <div>
                                <input id="${i}currency-placeholder" type="text" class="elementSettingsInput colorInput" placeholder="Start Typing" value="${questions[i].placeholder}" oninput="questions[${i}].placeholder = this.value;renderQuestions();uploadForm()">
                            </div><br>
                            <p style="margin-bottom:0px">Currency Symbol:</p>
                            <div>
                                <input id="${i}currency-symbol" type="text" class="elementSettingsInput colorInput" placeholder="Start Typing" value="${questions[i].prefix}" oninput="questions[${i}].prefix = this.value;renderQuestions();uploadForm()">
                            </div>

                            </div><br>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}currency-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
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
        <button class="w3-button w3-xsmall w3-circle w3-red w3-card-4 deleteBtn" onclick="deleteQuestion(${i});renderElements();renderQuestions();uploadForm()">-</button><button type="button" class="collapsible">${i}: Contact Form</button>
                <div class="content">
                    <div class="setting">
                        <p style="margin-bottom:0px">Section Title:</p>
                            <div>
                                <input id="${i}contact-title" type="text" class="elementSettingsInput colorInput" placeholder="Section title" value="${questions[i].text}" oninput="questions[${i}].text = this.value;renderQuestions();uploadForm()">
                            </div>
                             <div style="margin-bottom:10px">
                                <div style="display:inline-block;margin-top:5px;margin-bottom:5px">
                                    <p style="margin-bottom:0px;display:inline">Go to Question:</p>
                                    <input id="${i}contact-setting" type="number" style="width:60px" class="elementSettingsInput colorInput" value="${questions[i].next}" oninput="questions[${i}].next = this.value;renderQuestions();uploadForm()">
                            </div>
                        </div>
                   </div>
                </div>
    `
        }


        document.getElementById("elementsContainer").innerHTML = html
        document.getElementById('ViewTab').click()
        document.getElementById('ViewTab').click()
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    }
}
renderElements()
document.getElementById('ViewTab').click()






function updateForm() {
    uploadForm()
    for (var f in form) {
        if (form[f].options) {
            form[f].options.forEach((config) => {
                document.getElementById("FormImg").src = config.image
                document.getElementById("FormTitle").innerHTML = config.title

                color = config.color
                textColor = config.textColor
                buttonColor = config.buttonColor

            })
        }
    }
}

function uploadForm() {
    //console.log(form)
    window.localStorage.setItem("form", form)
    window.localStorage.setItem("questions", questions)
    var docId = getParameterByName('formRef');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "form": form,
        "questions": questions
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://Elev8 Admin.obimedia.agency/update/"+docId, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

function updateTitle(title) {
    form[1].options[0].title = title
    updateForm()

}

function updateImage(img) {

    form[1].options[0].image = img
    document.getElementById("myModal").style.display = 'none'
    updateForm()
    renderQuestions()
    uploadForm()
}

function updateColor(color) {

    form[1].options[0].color = color
    updateForm()
    renderQuestions()
    uploadForm()
}

function updateTextColor(color) {

    form[1].options[0].textColor = color
    updateForm()
    renderQuestions()
    uploadForm()
}

function updateButtonColor(color) {
    form[1].options[0].buttonColor = color
    updateForm()
    renderQuestions()
    uploadForm()
}


function addElement(name) {
    if (name == "textbox") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "textbox",
            next: id += 1,
            text: "This is a Textbox input",
            placeholder: "Placeholder Goes Here",
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }



    if (name == "multiple") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "multiple",
            text: 'This is a multiple choice input',
            options: [{
                    text: 'Option 1',
                    next: id += 1
                },
                {
                    text: 'Option 2',
                    next: id += 1
                }
            ]
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "select") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "select",
            next: id += 1,
            text: "This is a dropdown select",
            options: [{
                    text: 'Option 1',
                },
                {
                    text: 'Option 2',
                },

            ]
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()

    }
    if (name == "checkbox") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "checkbox",
            next: id += 1,
            text: "Question Goes Here",
            prefix: "$",
            placeholder: "Placeholder Goes Here",
            maxLength: 10
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "color") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "color",
            next: id += 1,
            text: "This is a color input"
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "date") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "date",
            next: id += 1,
            text: "This is a date"
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "datetime-local") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "datetime-local",
            next: id += 1,
            text: "This is a date and time input",
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "email") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "email",
            next: id += 1,
            text: "This is an email input",
            placeholder: "Start Typing...",
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "file") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "file",
            text: 'This is a file input',
            next: id += 1
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }

    if (name == "month") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "month",
            text: 'This is a month input',
            next: id += 1
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "number") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "number",
            text: 'This is a number input',
            next: id += 1
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "submit") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "submit",
            text: 'Submit',
            redirect: '',
            next: id += 1
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "range") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "range",
            next: id += 1,
            text: "This is a range input",
            min: 0,
            max: 100
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()

    }

    if (name == "text") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "text",
            text: 'This is a text input',
            placeholder: "Start Typing...",
            next: id += 1
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "time") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "time",
            text: 'This is a time input',
            next: id += 1
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "url") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "url",
            placeholder: "https://awesome.com",
            text: 'This is a URL input',
            next: id += 1

        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "week") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "week",
            text: 'This is a week input',
            next: id += 1

        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "message") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "message",
            fontSize: 15,
            text: 'This is a title',
            content: "This is a message, feel free to include one in your form.",
            next: id += 1
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "currency") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "currency",
            next: id += 1,
            text: "This is a currency input",
            prefix: "$",
            placeholder: "Placeholder Goes Here",
            maxLength: 10
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
    if (name == "contact") {
        var id = Object.keys(questions).length += 1
        questions[id] = {
            type: "contact",
            next: id += 1,
            text: "This is a contact form",
        }
        renderElements()
        document.getElementById('ViewTab').click()
        renderQuestions()
        uploadForm()
    }
}

function deleteQuestion(key) {
    var key1 = key
    //console.log(key1)
    var key2 = key1 += 1
    questions[key] = null;
    delete questions[key]
    //console.log(Object.keys(questions).length)
    if (Object.keys(questions).length == 0) {
        console.log("No Elements")
        document.getElementById('elementsContainer').innerHTML = `<center><p>You have no elements. Click <a style="color:blue;cursor:pointer" onclick="document.getElementById('AddTab').click()">Add</a> to get started.</p></center?`
        document.getElementById('Elev8 Admin').innerHTML = ''
    }
    var n = Object.keys(questions).length += 2

    for (let i = key1; i < n; i++) {
        var oldKey = i
        var newKey = oldKey + -1
        //console.log("hello "+newKey)
        if (questions[i].type == "multiple") {
            questions[i].options.forEach((options) => {
                options.next -= 1
            })
        } else {
            questions[i].next -= 1
        }
        questions[newKey] = questions[i]
        delete questions[i]
        console.log(questions)

    }


    renderElements();
    renderQuestions()
    uploadForm()
}

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
document.getElementById("preview").href="https://admin.elev8.cards/demo/preview?formRef="+docId
fetch('https://Elev8 Admin.obimedia.agency/forms/' + docId + '-config.js').then(v => {
    v.text().then(txt => {
        eval(txt)
        window.form = form
        window.questions = questions
        renderForm()
        renderQuestions()
        renderElements()
        window.localStorage.setItem("form", form)
        window.localStorage.setItem("questions", questions)

    })
    form = window.localStorage.getItem("form")
    questions = window.localStorage.getItem("questions")
    console.log(form)
})