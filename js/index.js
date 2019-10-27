let list = [
  { id: 1, text: "Eat", icons: "💀 👻 👽 🤖" },
  { id: 2, text: "Dream", icons: "🤡 💅 🙏 🙀" },
  { id: 3, text: "Create", icons: "👩‍🎓 👊 🐥 🌟" }
];
const listItemsWrap = document.getElementById("dropzone");
let dragElem;

window.onload = function() {
  list.forEach((el, index) => createElement(el, index));
  setCurrentListIndex(Array.from(listItemsWrap.children));
};

function createElement(itemToCreate, index) {
  const listItem = document.createElement("div");
  const listItemInnersList = Object.keys(itemToCreate);

  listItem.classList.add("content_item");
  listItem.setAttribute("draggable", true);

  listItemInnersList.forEach((el, index) => {
    const listItemText = document.createElement("span");
    listItemText.innerHTML = itemToCreate[el];
    if (index === listItemInnersList.length - 1) {
      listItemText.classList.add("content_item-icons");
    }
    listItem.appendChild(listItemText);
  });
  listItemsWrap.appendChild(listItem);
}

listItemsWrap.addEventListener(
  "dragstart",
  function(event) {
    const target = event.target;
    if (target.hasAttribute("draggable")) {
      dragElem = target;
      target.classList.add("dragged");
    }
  },
  false
);

listItemsWrap.addEventListener(
  "dragover",
  function(event) {
    event.preventDefault();
  },
  false
);

listItemsWrap.addEventListener(
  "drop",
  function(event) {
    event.preventDefault();
    const target = event.target;
    if (isInDragZone(dragElem, target)) {
      getItemId(dragElem.id) > getItemId(target.id)
        ? target.parentNode.insertBefore(dragElem, target)
        : target.parentNode.insertBefore(dragElem, target.nextSibling);
      const parentChildren = Array.from(listItemsWrap.children);
      sortCurrentDataList(parentChildren.map(el => getItemId(el.id)));
      setCurrentListIndex(parentChildren);
    }
  },
  false
);

listItemsWrap.addEventListener(
  "dragend",
  function(event) {
    dragElem.classList.remove("dragged");
    dragElem = undefined;
  },
  false
);

function getItemId(el) {
  return el.match(/\d/).map(Number)[0];
}

function isInDragZone(dragStart, dragEnd) {
  return dragEnd.parentNode === dragStart.parentNode;
}

function sortCurrentDataList(incomeRow) {
  const currentList = [];
  incomeRow.forEach(index => {
    currentList.push(list[index]);
  });
  list = currentList;
}

function setCurrentListIndex(arr) {
  arr.forEach((el, index) => {
    el.id = `item_${index}`;
  });
}
