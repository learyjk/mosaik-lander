"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:${3e3}/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/demo/index.ts
  document.addEventListener("DOMContentLoaded", () => {
    let debug = false;
    const form = document.querySelector("form");
    if (!form)
      return;
    const wTabContent = form.querySelector(".w-tab-content");
    if (!wTabContent)
      return;
    const formContentPanes = wTabContent.querySelectorAll("[data-w-tab]");
    const tabMenu = form.querySelector(".w-tab-menu");
    if (!tabMenu)
      return;
    const tabLinks = tabMenu.querySelectorAll("a");
    if (!tabLinks)
      return;
    const nextButton = form.querySelector('[wb-data="next-button"]');
    if (!nextButton)
      return;
    const submitButton = form.querySelector('[wb-data="submit-button"]');
    if (!submitButton)
      return;
    debug && console.log("selectors finished");
    let currentStep = 0;
    let numberOfSteps = formContentPanes.length;
    debug && console.log({ numberOfSteps });
    debug && console.log({ currentStep });
    const formFields = document.querySelectorAll("input");
    const validateEmail = (value) => {
      const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
      if (value.match(emailValidation)) {
        return true;
      }
      return false;
    };
    const checkInputValidity = (input) => {
      let { type, value, checked } = input;
      if (type === "text") {
        if (value.length > 0) {
          return true;
        } else {
          return false;
        }
      } else if (type === "email") {
        return validateEmail(value);
      } else if (type === "radio") {
        return checked;
      }
    };
    const checkStepValidityAndRequired = () => {
      const stepInputs = wTabContent.children[currentStep].querySelectorAll("input");
      for (const input of stepInputs) {
        let isRequired = input.required;
        let isValid = checkInputValidity(input);
        if (isRequired && !isValid)
          return false;
      }
      return true;
    };
    const updateUI = (isValid) => {
      if (currentStep === numberOfSteps - 1) {
        nextButton.classList.add("hide");
      } else {
        nextButton.classList.remove("hide");
      }
      if (isValid) {
        nextButton.classList.remove("disabled");
      } else {
        nextButton.classList.add("disabled");
      }
    };
    updateUI(false);
    const handleFormChange = (e) => {
      let type = e.target.type;
      let value = e.target.value;
      const isValid = checkStepValidityAndRequired();
      updateUI(isValid);
    };
    const handleNextButtonClicked = (e) => {
      currentStep++;
      let oncomingForm = formContentPanes[currentStep].querySelector("input");
      if (!oncomingForm)
        return;
      let type = oncomingForm.type;
      let value = oncomingForm.value;
      let isValid = checkInputValidity(oncomingForm);
      updateUI(isValid);
      tabLinks[currentStep].click();
    };
    const getFormData = (form2) => {
      let fData = new FormData(form2);
      return {
        name: fData.get("name")?.toString() || "",
        email: fData.get("email")?.toString() || "",
        phone: fData.get("phone")?.toString() || "",
        role: fData.get("role")?.toString() || ""
      };
    };
    Webflow.push(function() {
      $("form").submit(function() {
        if (currentStep === numberOfSteps - 1) {
          document.querySelector(".bg_radial-gradient")?.classList.remove("opacity-0");
          document.querySelectorAll(".demo-shapes")?.forEach((demoShape) => {
            demoShape.classList.remove("opacity-0");
          });
          const form2 = this;
          const { name, email, phone, role } = getFormData(form2);
          const calendlyButton = document.querySelector("#calendly-button");
          if (!calendlyButton)
            return true;
          calendlyButton.href += `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(
            email
          )}`;
          return true;
        } else {
          return false;
        }
      });
    });
    formFields.forEach((formField) => {
      formField.addEventListener("input", handleFormChange);
    });
    nextButton?.addEventListener("click", handleNextButtonClicked);
    document.addEventListener("keypress", function(e) {
      if (currentStep === numberOfSteps - 1)
        return;
      if (e.key === "Enter") {
        if (nextButton.classList.contains("disabled"))
          return;
        setTimeout(() => {
          nextButton.click();
        }, 500);
      }
    });
  });
})();
//# sourceMappingURL=index.js.map
