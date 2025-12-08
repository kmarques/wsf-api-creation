const simpleObject = {
  title: "toto",
};

const simpleObject2 = new Object();
simpleObject2.title = "toto";

console.log(simpleObject.constructor.name, simpleObject2.constructor.name);

function Vehicule(brand, model) {
  this.brand = brand;
  this.model = model;
}
Vehicule.findAll = function () {
  // Récupérer dans la BDD
  // ...
  // Parser le résultat
  // ...
  const result = [
    new Vehicule("Opel", "Meriva"),
    new Vehicule("Citroen", "C3"),
  ];
  return result;
};

const voiture = new Vehicule();

console.log(voiture.constructor.name, Vehicule.name, voiture.brand);

const items = Vehicule.findAll();
console.log(items[0].constructor.name);
