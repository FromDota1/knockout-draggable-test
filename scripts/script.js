function SubItem(name) {
  this.name = ko.observable(name);
}

function Item(title, subitems) {
  this.title = ko.observable(title);
  this.subitems = ko.observableArray(subitems);
  this.isOpen = ko.observable(false);
  this.toggleSublist = function () {
    this.isOpen(!this.isOpen());
  };
}

function ViewModel() {
  let self = this;
  self.items = ko.observableArray([
    new Item("Обязательные для всех", [
      new SubItem("Паспорт"),
      new SubItem("ИИН"),
      new SubItem("Доп. данные"),
    ]),
    new Item("Обязательные для трудоустройства", [
      new SubItem("Паспорт 2"),
      new SubItem("ИИН 2"),
      new SubItem("Доп. данные 2"),
    ]),
    new Item("Специальные", [
      new SubItem("Паспорт 3"),
      new SubItem("ИИН 3"),
      new SubItem("Доп. данные 3"),
    ]),
  ]);
  self.items()[0].isOpen(true);
  self.addChild = function (subitem, targetArray) {
    // console.log("targetArray", targetArray,subitem);
    targetArray.push(subitem);
  };
  self.checkCondition = function (targetItem, subitem) {
    return targetItem.title() !== "Специальные";
  };

  self.receiveSubitem = function (event, ui) {
    var item = ko.dataFor(ui.item[0]);
    if (item && item.title) {
      $(ui.sender).sortable("cancel");
    }
  };
  self.receiveMain = function (event, ui) {
    let subitem = ko.dataFor(ui.item[0]);
    if (subitem && subitem.name) {
      let targetIndex = $(ui.item).prev().attr("data-index");
      let sourceItem = ko.dataFor(ui.sender[0]);
      targetItem = this.items().filter((e, i) => targetIndex == i)[0];
      if (targetItem && targetItem.subitems) {
        sourceItem.subitems.remove(subitem);
        targetItem.subitems.push(subitem);
        $(ui.sender).sortable("cancel");
        setTimeout(() => {
          $(ui.item).remove();
        }, 0);
      }
    }
  };
}

ko.applyBindings(new ViewModel());

$(function () {
  $(".draggable__list__item__sublist").sortable({
    connectWith: ".draggable__list__item__sublist, .draggable__list",
    receive: function (event, ui) {
      ko.contextFor(this).$root.receiveSubitem(event, ui);
    },
  });
  $(".draggable__list").sortable({
    connectWith: ".draggable__list__item__sublist",

    update: function (event, ui) {
      ko.contextFor(this).$root.receiveMain(event, ui);
    },
  });
});
