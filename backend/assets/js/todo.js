// Category Background Color Random generator

let container = document.querySelectorAll("#category-div");

for (let index = 0; index < container.length; index++) {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  container[index].style.backgroundColor = "#" + randomColor;
}
