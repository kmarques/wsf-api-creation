# TPs

## TP1

Écrire un middleware express afin de gérer automatiquement le format de sortie à partir de n'importe quelle route avec une fonction unique (ex: res.render)   

[ ] Créer le middleware  
[ ] Mettre en place la gestion du format XML

## TP2

Ajouter la gestion de la langue dans l'API   

[ ] Créer le middleware de traduction   
[ ] Définir la traduction à partir de l'entête HTTP `Accept-Language`   
[ ] Définir l'entête `Content-Language` dans la réponse HTTP   
[ ] Mettre à jour les routes pour utiliser la traduction   

## TP3

Ajouter la gestion du versionning des routes   

[ ] Créer le middleware de versionning   
[ ] Définir plusieurs versions d'un controlleur   
[ ] Appliquer le versionning dans les routes   

## TP4

Ajouter la gestion de l'HATEOAS dans l'API   

[ ] Créer le middleware HATEOAS   
[ ] Définir les liens HATEOAS pour la réponse dans les controlleurs `setHateoas()`   
[ ] Mettre à jour les routes pour inclure la gestion de l'HATEOAS

```js
// Example of GET collection
setHateoas({
    self: "/tasks?page=1",
    next: "/tasks?page=2",
    // ...
});
// Example of GET collection
setHateoas({
    self: "/tasks?page=1",
    create: { method: "POST", href: "/tasks" },
    next: "/tasks?page=2",
    // ...
});
// Example of GET item
setHateoas({
    self: "/tasks/{id}",
    list: "/tasks",
    update: { method: "PATCH", href: "/tasks/{id}" },
    delete: { method: "DELETE", href: "/tasks/{id}" },
    // ...
});
// Example of POST item
setHateoas({
    self: "/tasks/{id}",
    list: "/tasks",
    update: { method: "PATCH", href: "/tasks/{id}" },
    delete: { method: "DELETE", href: "/tasks/{id}" },
    // ...
});
```