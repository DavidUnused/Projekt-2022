const express = require("express");
const mysql = require("mysql");
const {
  mindentermek,
  asztalfoglalas,
  mindentermekadmin,
  torles,
  adminok,
  admintorles,
  foglalasok,
  kategoriatermekek,
} = require("./dbfunc");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const random = require("random");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
app.use(express.json());
var Port = 3001;
//Cors beállítása
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(fileUpload());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//Bejelentkezéshez használt süti beállítása
app.use(
  session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30
    },
  })
);

//Adatbázishoz való csatlakozás
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
});

//Adatbázis létrehozása, ha még nem létezik
db.query("CREATE DATABASE IF NOT EXISTS projektadatbazis;");
//Adatbázis beállítása
db.changeUser({ database: "projektadatbazis" });

//Bemutató
app.get("/", (req, res) => {
  res.send("Szia, én a projekt API-ja vagyok!");
});

//Kijelentkezés
app.post("/logout", async (req, res) => {
  const logout = true;
  const igen = req.body.logout;
  if (logout === igen) {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      } else {
        console.log("Sikeres kijelentkezés!")
        res.send({status: 200, msg: "Sikeres kijelentkezés!"})
      }
    });
  }
});

//Itt küldi ki a regisztrációt a Backend az Adatbázisba
app.post("/register", (req, res) => {
  const felhasznalonev = req.body.felhasznalonev;
  const jelszo = req.body.jelszo;
  const email = req.body.email;
  const rang = "Admin";
  //Jelszó titkosítása
  bcrypt.hash(jelszo, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO Admins (felhasznalonev, jelszo, email, rang) VALUES (?,?,?,?)",
      [felhasznalonev, hash, email, rang],
      (err, result) => {
        if (err) {
          console.log("\x1b[31mHiba az adat beszúrása közben!\x1b[0m");
          res.send({status: 400, msg: "Hiba az adat beszúrása közben!"})
        } else {
          console.log("\x1b[32mSikeres adatbeszúrás!\x1b[0m");
          res.send({status: 200, msg: "Sikeres adatbeszúrás!"})
        }
      }
    );
  });
});

//Mindentermék lekérdezése
app.get("/mindentermek", async (req, res) => {
  mindentermek(db)
    .then((res) => res.send({ termekek: res }))
    .catch((err) => res.send(err));
});

//Kategóriánkénti termék lekérdezése
app.get("/kategoriatermekek/:kategoria", async (req, res) => {
  const kategoria = req.params['kategoria']
  console.log(kategoria)
  kategoriatermekek(db, kategoria)
    .then((res) => res.send({ termekek: res }))
    .catch((err) => res.send(err));
});

//Mindentermék lekérdezése Adminok számára
app.get("/mindentermekadmin", async (req, res) => {
  mindentermekadmin(db)
    .then((res) => res.send({ termekek: res }))
    .catch((err) => res.send(err));
});

//Termékek törlése Adminok számára
app.post("/torles", async (req, res) => {
  torles(db, req.body.id).catch((err) => res.send(err));
});

//Adminlista lekérdezése
app.get("/adminok", async (req, res) => {
  adminok(db)
    .then((res) => res.send({ adminok: res }))
    .catch((err) => res.send(err));
});

//Admin törtlése
app.post("/admintorles", async (req, res) => {
  admintorles(db, req.body.id).catch((err) => res.send(err));
});

//Itt küldi ki az asztalfoglalást a Backend az Adatbázisba
app.post("/asztalfoglalas", async (req, res) => {
  asztalfoglalas(db, req.body)
    .then((res) => res.send(res))
    .catch((err) => res.send(err));
});

//Asztalfoglalások lekérdezése
app.get("/foglalasok", async (req, res) => {
  foglalasok(db)
    .then((res) => res.send({ foglalasok: res }))
    .catch((err) => res.send(err));
});

//A Backend itt küldi vissza a bejelentkezési státuszt
app.get("/login", async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

//A Backend itt küldi vissza a Frontendnek a bejelentkezést
app.post("/login", async (req, res) => {
  const felhasznalonev = req.body.felhasznalonev;
  const jelszo = req.body.jelszo;
  db.query(
    "SELECT * FROM Admins WHERE felhasznalonev=?;",
    felhasznalonev,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          //Jelszó decryptelése, majd összehasonlítása
          bcrypt.compare(jelszo, result[0].jelszo, (error, response) => {
            if (response) {
              req.session.user = result;
              console.log("\x1b[32mSikeres bejelentkezés!\x1b[0m");
              res.send({ message: "Sikeres bejelentkezés!" });
            } else {
              res.send({ message: "Hibás felhasználónév vagy jelszó!" });
            }
          });
        } else {
          res.send({ message: "Nincs ilyen felhasználó!" });
        }
      }
    }
  );
});

//Adabázis alaphelyzetbe való állítása
app.post("/reset", (req, res) => {
  const titokkulcs = req.body.titokkulcs;
  const nemJelszo = "Admin";
  const kulcs = "1";
  if (titokkulcs == kulcs) {
    db.query("DROP TABLE IF EXISTS `admins`,`products`,`asztalfoglalas`;");
    db.query(
      "CREATE TABLE `admins` (`id` INT AUTO_INCREMENT NOT NULL,`felhasznalonev` VARCHAR(32) NOT NULL,`email` VARCHAR(320) NOT NULL,`jelszo` VARCHAR(500) NOT NULL,`rang` VARCHAR(20) NOT NULL, PRIMARY KEY (`id`))"
    );
    bcrypt.hash(nemJelszo, saltRounds, (err, hash) => {
      db.query(
        "INSERT INTO `admins` (`id`, `felhasznalonev`, `jelszo`, `email`, `rang`) VALUES (?,?,?,?,?);",
        [1, "Admin", hash, "Admin@admin.hu", "Admin"]
      );
    });
    db.query(
      "CREATE TABLE `Products` (`id` INT AUTO_INCREMENT NOT NULL,`name` VARCHAR(50) NOT NULL,`description` VARCHAR(500) NOT NULL,`price` INT(100) NOT NULL,`category` VARCHAR(50) NOT NULL,`image` VARCHAR(1024) NOT NULL,PRIMARY KEY (`id`));"
    );
    db.query(
      "INSERT INTO `Products` (`id`, `name`, `description`, `price`, `category`, `image`) VALUES (1, 'Gombás Pizza', 'Paradicsomszósz, gomba, oregánó, sajt', 1250, 'Sima Pizza', 'termekek/gombas.jpg'),(2, 'Sonkás Pizza', 'Paradicsomszósz, sonka, sajt', 1250, 'Sima Pizza', 'termekek/sonkas.jpg'),(3, 'Szalámis Pizza', 'Paradicsomszósz, Pick szalámi, sajt', 1450, 'Sima Pizza', 'termekek/szalamis.jpg')" +
      ",(4, 'Viharsarok Pizza', 'Kolbásszal és erőspaprikával töltött fekete szezámmagos perem, paradicsomos erős alap, kolbász, tarja, hagyma, pfefferoni paprika, sajt', 2090, 'Töltött Peremű Pizza', 'termekek/viharsarok.jpg'),(5, 'Ízbomba Pizza', '2-féle sajttal töltött szezámmagos perem, sajtkrémes alap, sonka, csirkemell, szalámi, lapkasajt, sajt', 2090, 'Töltött Peremű Pizza', 'termekek/izbomba.jpg'),(6, 'Laktózmentes Kolbászos Pizza', 'Laktózmentes tészta, paradicsomszósz, kolbász, laktózmentes sajt', 1490, 'Laktózmentes Pizza', 'termekek/lkolbaszos.jpg')" +
      ",(7, 'Sajtos Hamburger', 'Szósz, hamburgerhús, zöldségek, sajt', 770, 'Hamburger', 'termekek/sajtoshambi.jpg'),(8, 'Ananászos Hamburger', 'Szósz, hamburgerhús, zöldségek, ananász, sajt', 830, 'Hamburger', 'termekek/ananaszoshambi.jpg'),(9, 'XIXO Epres Fekete Tea', '250ml', 170, 'Üdítő', 'termekek/xixoeper.jpg')" +
      ",(10, 'Coca-Cola', '0,5l', 370, 'Üdítő', 'termekek/cocacola.jpg'),(11, 'Burn Original Energiaital', '250ml', 390, 'Energiaital', 'termekek/burn.jpg'),(12, 'Szent András Meggyes Sör', '1,33l', 670, 'Sör', 'termekek/meggyessor.jpg'),(13, 'Gösser Natur Zitrone Citromos Alkoholmentes Sör', '0,5l', 370, 'Alkoholmentes Sör', 'termekek/gosser.jpg');");
    db.query(
      "CREATE TABLE `Asztalfoglalas` (`id` INT AUTO_INCREMENT NOT NULL,`nev` VARCHAR(50) NOT NULL,`telszam` int(20) NOT NULL,`asztal` INT(20) NOT NULL, `foglalas` VARCHAR(50) NOT NULL, PRIMARY KEY (`id`));"
    );
    db.query(
      "INSERT INTO `Asztalfoglalas` (`id`, `nev`, `telszam`, `asztal`, `foglalas`) VALUES (1, 'Kiss Pista', 709876543, 2, '2022 Apr 29, 04:10'),(2, 'Nagy Géza', 201234567, 5, '2022 Apr 24, 14:22'),(3, 'Egresi Nóra', 305555555, 1, '2022 Jan 2, 16:10');"
    );
    console.log("\x1b[32mAdatbázis sikeresen resetelve!\x1b[0m");
    res.send("Adatbázis sikeresen alaphelyzetbe állítva!");
  }
});

app.post("/termekfeltoltes", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("Nem lett kép feltölve.");
  }

  let targetFile = req.files.imgfile;
  let extName = path.extname(targetFile.name);
  const num = random.int(10000, 999999);

  let uploadDir = path.join(
    __dirname,
    "../kliens",
    "public",
    "termekek",
    num + targetFile.name
  );

  let imgList = [".png", ".jpg", ".jpeg", ".gif"];
  // Checking the file type
  if (!imgList.includes(extName)) {
    return res.json({
      submit: false,
      msg: "Támogatott formátumok: .png|.jpg|.jpeg|.gif",
    });
  }
  if (targetFile.size > 20000000) {
    return res.json({
      submit: false,
      msg: "Túl nagy fájl! Maximális méret: 20MB",
    });
  }

  targetFile.mv(uploadDir, (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      const imgname = num + targetFile.name;
      const path = "termekek/";
      const data = path + imgname;
      const nametermek = req.body.name;
      const description = req.body.description;
      const price = Number(req.body.price);
      const category = req.body.category;
      db.query(
        "INSERT INTO products (name, description, price, category, image) VALUES (?,?,?,?,?)",
        [nametermek, description, price, category, data],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Termék sikeresen feltöltve!");
            res.json({status: 200, msg: "Termék sikeresen feltöltve!"})
          }
        }
      );
    }
  });
});

//Egy ciklus, amely meggátolja az adatbázis bezáródását, ezáltal nem okoz hibát!
setInterval(function () {
  db.query("USE projektadatbazis");
}, 600000);

//Backend szerver port beállítása
app.listen(Port, () => {
  console.log("");
  console.log("\x1b[32mA szerver fut! Ezen a porton keresd:", Port);
});
