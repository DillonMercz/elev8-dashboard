form = {
  1: {
    options: [
      {
        image: "https://i.imgur.com/RotdGOu.png",
        title: "",
        color: "#3b6d48",
        textColor: "#ffffff",
        buttonColor: "#1f6dea"
      }
    ]
  }
}

questions = {
  1: {
    type: "message",
    fontSize: 15,
    text: "This is a title",
    content: "Hey There!<br><br>\nYou must be looking to increase your income, and if so, you have come to the right place!",
    next: 2
  },
  2: {
    type: "message",
    fontSize: 15,
    text: "This is a title",
    content: "These next few questions are going to help us decide if you are a good fit for the program.",
    next: 3
  },
  3: {
    type: "currency",
    next: 4,
    text: "What is your ideal monthly income?",
    prefix: "$",
    placeholder: "Eg: $5,000",
    maxLength: 10
  },
  4: {
    type: "multiple",
    text: "The program is going to cost $50/month, however you have about a 72% chance of making 10 times your investment within the first month. Would you be okay with paying this amount?",
    options: [
      {
         text: "Yes",
        next: 5
      },
      {
         text: "No",
        next: "5"
      }
    ]
  },
  5: {
    type: "multiple",
    text: "What is your ideal work environement?",
    options: [
      {
         text: "Home/Anywhere",
        next   : 6
      },
      {
         text: "Random Peoples Houses",
        next   : "6"
      },
      {
         text: "Work on other company's property",
        next   : "6"
      }
    ]
  },
  6: {
    type: "multiple",
    text: "What type of business would you be interested in?",
    options: [
      {
         text: "Lead sales",
        next   : 7
      },
      {
         text: "Lead Generation for companies",
        next   : "7"
      },
      {
         text: "Home Maintenance",
        next   : "7"
      },
      {
         text: "Pressure Washing",
        next   : "7"
      },
      {
         text: "Pre Built Agency",
        next   : "7"
      },
      {
         text: "Ecommerce",
        next   : "7"
      },
      {
         text: "Affiliate Marketing",
        next   : "7"
      }
    ]
  },
  7: {
    type: "multiple",
    text: "Do you have access to a computer?",
    options: [
      {
         text: "Yes",
        next   : 8
      },
      {
         text: "No",
        next   : "8"
      }
    ]
  },
  8: {
    type: "contact",
    next: 9,
    text: "Please enter your contact information so we can reach out to you."
  },
  9: {
    type: "message",
    fontSize: 15,
    text: "This is a title",
    content: "Thank you for filling out those questions! We appreciate you taking the time to do so, and we look forward to working with you to help you achieve financial stability and freedom!",
    next: 10
  },
  10: {
    type: "submit",
    text: "Submit",
    redirect: "./thanks.html",
    next: 11
  }
}