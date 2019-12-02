let list = [
  { id: 1, text: "Eat", icons: "💀 👻 👽 🤖" },
  { id: 2, text: "Dream", icons: "🤡 💅 🙏 🙀" },
  { id: 3, text: "Create", icons: "👩‍🎓 👊 🐥 🌟" }
];
const listItemsWrap = document.querySelector('[data-type="dropzone"]');
let dragStart;
let dragEnd;

window.onload = function() {
  list.forEach(el => createElement(el));
  setCurrentListIndex(Array.from(listItemsWrap.children));
};

function createElement(itemToCreate) {
  const listItem = document.createElement("div");
  const listItemInnersList = Object.keys(itemToCreate);

  listItem.classList.add("content_item");
  listItem.setAttribute("draggable", true);

  listItemInnersList.forEach((el) => {
    const listItemText = document.createElement("span");
    listItemText.innerHTML = itemToCreate[el];
    listItemText.classList.add("content_item-inner");
    if (el === "icons") {
      listItemText.classList.add("content_item-icons");
    }
    if (el === "id") {
      listItemText.classList.add('content_item-counter')
    }
    listItem.appendChild(listItemText);
  });
  listItemsWrap.appendChild(listItem);
}

listItemsWrap.addEventListener("dragstart", function(event) {
  const target = event.target;
  if (target.hasAttribute("draggable")) {
    dragStart = target;
    target.classList.add("dragged");
  }
});

listItemsWrap.addEventListener("dragenter", setDragOverAppearance);

listItemsWrap.addEventListener("dragleave", setDragOverAppearance);

listItemsWrap.addEventListener("dragover", function(event) {
  event.preventDefault();
});

listItemsWrap.addEventListener("drop", function(event) {
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
});

listItemsWrap.addEventListener("dragend", function() {
  dragStart.classList.remove("dragged");
  dragStart = undefined;
  dragEnd = undefined;
  Array.from(listItemsWrap.children).forEach(el =>
    el.classList.remove("dragged_over")
  );
});

function getItemId(el) {
  return el.match(/\d/).map(Number)[0];
}

function isInDragZone() {
  dragEnd = getDraggableItemOnEvent(dragEnd);
  return dragEnd.parentNode === dragStart.parentNode;
}

function sortCurrentDataList(incomeRow) {
  const currentList = [];
  const listCounter = Array.from(document.getElementsByClassName('content_item-counter'))
  incomeRow.forEach((sortParam, index)=> {
    list[sortParam].id = index + 1;
    listCounter[index].innerHTML = list[sortParam].id;
    currentList.push(list[sortParam]);
  });
  list = currentList;
}

function setCurrentListIndex(arr) {
  arr.forEach((el, index) => {
    el.id = `item_${index}`;
  });
}

function setDragOverAppearance(event) {
  const target = getDraggableItemOnEvent(event.target);
  if (target.classList.contains("content_item")) {
    target.classList.toggle("dragged_over");
  }
}

function getDraggableItemOnEvent(elem) {
  if (elem.classList.contains("content_item-inner")) {
    return elem.parentNode;
  }
  return elem;
}
