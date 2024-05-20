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
  var self = this;
  self.isDragging = ko.observable(false);
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
}
ko.applyBindings(new ViewModel());
