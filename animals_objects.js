"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];
const Animal = {};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    const animal = Object.create(Animal);

    const fullname = jsonObject.fullname;

    const firstSpace = fullname.indexOf(" ");
    const secondSpace = fullname.indexOf(" ", firstSpace + 1);
    const lastSpace = fullname.lastIndexOf(" ");

    const name = fullname.substring(0, firstSpace);
    const desc = fullname.substring(secondSpace + 1, lastSpace);
    const type = fullname.substring(lastSpace + 1);

    animal.name = name;
    animal.desc = desc;
    animal.type = type;

    animal.age = jsonObject.age;

    allAnimals.push(animal);
  });

  displayList(allAnimals);
}

function showCats(animal) {
  if (animal.type === "cat") {
    return true;
  } else {
    return false;
  }
}

function showDogs(animal) {
  if (animal.type === "dog") {
    return true;
  } else {
    return false;
  }
}

function showAll(animal) {
  return true;
}

/* const showCats = allAnimals.filter(cats);
const showDogs = allAnimals.filter(dogs);
const showAll = allAnimals.filter(all); */

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", btnClicked);
});

function btnClicked(evt) {
  let finalFilter;
  /*   ulPointer.replaceChildren();
   */
  if (evt.target.dataset.filter === "cats") {
    finalFilter = showCats;
  } else if (evt.target.dataset.filter === "dogs") {
    finalFilter = showDogs;
  } else {
    finalFilter = showAll;
  }

  displayList(allAnimals.filter(finalFilter));
}
function displayList(arr) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  arr.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
