//Mindentermék lekérdezése
module.exports.mindentermek = function (db) {
  return new Promise((reject, resolve) => {
    const c = `category`;
    db.query(
      "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE " +
        c +
        " = 'Sima Pizza' OR " +
        c +
        "= 'Töltött Peremű Pizza' OR " +
        c +
        "= 'Laktózmentes Pizza' OR " +
        c +
        "= 'Hamburger' OR " +
        c +
        "= 'Üdítő' OR " +
        c +
        "= 'Energiaital' OR " +
        c +
        "= 'Sör' OR " +
        c +
        "= 'Alkoholmentes Sör';",
      (error, result) => {
        if (error) {
          reject({ error: error, status: "400" });
          console.log(
            "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
          );
        } else {
          resolve({ termekek: result, status: "200" });
          console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
        }
      }
    );
  });
};

//Kategóriánkénti termékek lekérdezése
module.exports.kategoriatermekek = function (db, kategoria) {
  return new Promise((reject, resolve) => {
    const foertek = kategoria;
    const pizza = "pizza";
    const tpizza = "tpizza";
    const lpizza = "lpizza";
    const hamburger = "hamburger";
    const udeto = "udeto";
    const edrink = "edrink";
    const sor = "sor";
    const asor = "asor";
    if (foertek === pizza)
      db.query(
        "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE `category` = 'Sima Pizza';",
        (error, result) => {
          if (error) {
            reject({ error: error, status: "400" });
            console.log(
              "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
            );
          } else {
            resolve({ termekek: result, status: "200" });
            console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
          }
        }
      );
    if (foertek === tpizza)
      db.query(
        "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE `category` = 'Töltött Peremű Pizza';",
        (error, result) => {
          if (error) {
            reject({ error: error, status: "400" });
            console.log(
              "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
            );
          } else {
            resolve({ termekek: result, status: "200" });
            console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
          }
        }
      );
    if (foertek === lpizza)
      db.query(
        "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE `category` = 'Laktózmentes Pizza';",
        (error, result) => {
          if (error) {
            reject({ error: error, status: "400" });
            console.log(
              "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
            );
          } else {
            resolve({ termekek: result, status: "200" });
            console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
          }
        }
      );
    if (foertek === hamburger)
      db.query(
        "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE `category` = 'Hamburger';",
        (error, result) => {
          if (error) {
            reject({ error: error, status: "400" });
            console.log(
              "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
            );
          } else {
            resolve({ termekek: result, status: "200" });
            console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
          }
        }
      );
    if (foertek === udeto)
      db.query(
        "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE `category` = 'Üdítő';",
        (error, result) => {
          if (error) {
            reject({ error: error, status: "400" });
            console.log(
              "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
            );
          } else {
            resolve({ termekek: result, status: "200" });
            console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
          }
        }
      );
    if (foertek === edrink)
      db.query(
        "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE `category` = 'Energiaital';",
        (error, result) => {
          if (error) {
            reject({ error: error, status: "400" });
            console.log(
              "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
            );
          } else {
            resolve({ termekek: result, status: "200" });
            console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
          }
        }
      );
    if (foertek === sor)
      db.query(
        "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE `category` = 'Sör';",
        (error, result) => {
          if (error) {
            reject({ error: error, status: "400" });
            console.log(
              "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
            );
          } else {
            resolve({ termekek: result, status: "200" });
            console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
          }
        }
      );
    if (foertek === asor)
      db.query(
        "SELECT `id`, `name`, `description` AS `desc`, `price`, `image` FROM `products` WHERE `category` = 'Alkoholmentes Sör';",
        (error, result) => {
          if (error) {
            reject({ error: error, status: "400" });
            console.log(
              "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
            );
          } else {
            resolve({ termekek: result, status: "200" });
            console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
          }
        }
      );
  });
};

//Asztalfoglalás beillesztése
module.exports.asztalfoglalas = function (db, adatok) {
  return new Promise((reject, resolve) => {
    const datum = Date();
    const ezmegdatum = datum.split(" ");
    const ezmegmindigdatum =
      ezmegdatum[3] + " " + ezmegdatum[1] + " " + ezmegdatum[2];
    const time = ezmegdatum[4];
    const times = time.split(":");
    const ido = times[0] + ":" + times[1];
    const vegleges = ezmegmindigdatum + ", " + ido;
    db.query(
      "INSERT INTO `asztalfoglalas` (`nev`, `telszam`, `asztal`, `foglalas`) VALUES (?, ?, ?, ?);",
      [adatok.nev, adatok.telszam, adatok.asztal, vegleges],
      (error, result) => {
        if (error) {
          reject({ error: error, status: "400" });
          console.log("\x1b[31mHiba az adat beszúrása közben!\x1b[0m" + error);
        } else {
          resolve({ status: "200" });
          console.log("\x1b[32mSikeres adatbeszúrás!\x1b[0m");
        }
      }
    );
  });
};

//Mindentermék Adminlap lekérdezése
module.exports.mindentermekadmin = function (db) {
  return new Promise((reject, resolve) => {
    db.query(
      "SELECT `id`, `name`, `description` AS `desc`, `price`, `category` , `image` FROM `products`;",
      (error, result) => {
        if (error) {
          reject({ error: error, status: "400" });
          console.log(
            "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
          );
        } else {
          resolve({ termekek: result, status: "200" });
          console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
        }
      }
    );
  });
};

//Termékek törlése
module.exports.torles = function (db, id) {
  return new Promise((reject, resolve) => {
    db.query("DELETE FROM `products` WHERE `id`= ?;", id, (error) => {
      if (error) {
        reject({ error: error, status: "400" });
        console.log(
          "\x1b[31mHiba történt az adat törlése közben!\x1b[0m" + error
        );
      } else {
        resolve({ message: "Adat törölve!", status: "200" });
        console.log("\x1b[32mSikeres adattörlés!\x1b[0m");
      }
    });
  });
};

//Admin lista kikérése
module.exports.adminok = function (db) {
  return new Promise((reject, resolve) => {
    db.query(
      "SELECT `id`, `felhasznalonev`, `email` FROM `admins`;",
      (error, result) => {
        if (error) {
          reject({ error: error, status: "400" });
          console.log(
            "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
          );
        } else {
          resolve({ adminok: result, status: "200" });
          console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
        }
      }
    );
  });
};

//Admin törlése
module.exports.admintorles = function (db, id) {
  return new Promise((reject, resolve) => {
    db.query("DELETE FROM `admins` WHERE `id`= ?;", id, (error) => {
      if (error) {
        reject({ error: error, status: "400" });
        console.log(
          "\x1b[31mHiba történt az adat törlése közben!\x1b[0m" + error
        );
      } else {
        resolve({ message: "Adat törölve!", status: "200" });
        console.log("\x1b[32mSikeres adattörlés!\x1b[0m");
      }
    });
  });
};

//Adminok kikérése
module.exports.adminok = function (db) {
  return new Promise((reject, resolve) => {
    db.query(
      "SELECT `id`, `felhasznalonev`, `email` FROM `admins`;",
      (error, result) => {
        if (error) {
          reject({ error: error, status: "400" });
          console.log(
            "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
          );
        } else {
          resolve({ adminok: result, status: "200" });
          console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
        }
      }
    );
  });
};

//Asztalfoglalások kikérése
module.exports.foglalasok = function (db) {
  return new Promise((reject, resolve) => {
    db.query(
      "SELECT * FROM `asztalfoglalas` ORDER BY `foglalas` DESC;",
      (error, result) => {
        if (error) {
          reject({ error: error, status: "400" });
          console.log(
            "\x1b[31mHiba történt a lekérdezése közben!\x1b[0m" + error
          );
        } else {
          resolve({ foglalasok: result, status: "200" });
          console.log("\x1b[32mSikeres lekérdezés!\x1b[0m");
        }
      }
    );
  });
};
