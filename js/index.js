let list = [
  { id: 1, text: "Eat", icons: "💀 👻 👽 🤖" },
  { id: 2, text: "Dream", icons: "🤡 💅 🙏 🙀" },
  { id: 3, text: "Create", icons: "👩‍🎓 👊 🐥 🌟" }
];
const listItemsWrap = document.getElementById("dropzone");
let dragStart;
let dragEnd;

window.onload = function() {
  list.forEach((el) => createElement(el));
  setCurrentListIndex(Array.from(listItemsWrap.children));
};

function createElement(itemToCreate) {
  const listItem = document.createElement("div");
  const listItemInnersList = Object.keys(itemToCreate);

  listItem.classList.add("content_item");
  listItem.setAttribute("draggable", true);

  listItemInnersList.forEach((el, index) => {
    const listItemText = document.createElement("span");
    listItemText.innerHTML = itemToCreate[el];
    listItemText.classList.add("content_item-inner");
    if (el === "icons") {
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
      dragStart = target;
      target.classList.add("dragged");
    }
  }
);

listItemsWrap.addEventListener(
  "dragover",
  function(event) {
    event.preventDefault();
  }
);

listItemsWrap.addEventListener(
  "drop",
  function(event) {
    event.preventDefault();
    dragEnd = event.target;
    if (isInDragZone()) {
      getItemId(dragStart.id) > getItemId(dragEnd.id)
        ? dragEnd.parentNode.insertBefore(dragStart, dragEnd)
        : dragEnd.parentNode.insertBefore(dragStart, dragEnd.nextSibling);
      const parentChildren = Array.from(listItemsWrap.children);
      sortCurrentDataList(parentChildren.map(el => getItemId(el.id)));
      setCurrentListIndex(parentChildren);
    }
  }
);

listItemsWrap.addEventListener(
  "dragend",
  function(event) {
    dragStart.classList.remove("dragged");
    dragStart = undefined;
    dragEnd = undefined;
  }
);

function getItemId(el) {
  return el.match(/\d/).map(Number)[0];
}

function isInDragZone() {
  if (dragEnd.classList.contains('content_item-inner')) {
    dragEnd = dragEnd.parentNode;
  }
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
