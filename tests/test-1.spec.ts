import { test, expect } from "@playwright/test";

function generateRandomEmail() {
  let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let stringLength = 10;
  let randomstring = "";
  for (let i = 0; i < stringLength; i++) {
    let rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  // append a random domain
  let domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  let randomDomain = domains[Math.floor(Math.random() * domains.length)];

  return randomstring + "@" + randomDomain;
}

function generateRandomPhoneNumber() {
  let phoneNumber = "06";
  for (let i = 0; i < 8; i++) {
    phoneNumber += Math.floor(Math.random() * 10); // generates a random digit from 0 to 9
  }
  return phoneNumber;
}

function generateRandomName() {
  let firstNames = [
    "John",
    "Jane",
    "Sam",
    "Sara",
    "Michael",
    "Michelle",
    "Emma",
    "Ethan",
    "Sophia",
    "Mason",
    "Olivia",
    "Liam",
    "Ava",
    "Noah",
    "Isabella",
    "Jacob",
  ];
  let lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
    "Martinez",
    "Anderson",
    "Taylor",
    "Thomas",
    "Hernandez",
    "Moore",
  ];

  let randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  let randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return { randomFirstName, randomLastName };
}

function generateRandomNumber(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // generates a random digit from 0 to 9
  }
  return parseInt(result);
}

function generateRandomDateOfBirth() {
  let start = new Date(1950, 0, 1);
  let end = new Date(2003, 11, 31);
  let randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );

  let day = ("0" + randomDate.getDate()).slice(-2);
  let month = ("0" + (randomDate.getMonth() + 1)).slice(-2);
  let year = randomDate.getFullYear();

  return `${day}/${month}/${year}`;
}
let numberTries = 0;

test("test", async ({ browser }) => {
  test.setTimeout(200000000);
  // Create a new incognito browser context
  const context = [browser.newContext()];

  const resolvedContexts = context.map(async (c) => {
    const page = await (await c).newPage();
    // while (true) {

    await page.goto("your url");
    await page.getByPlaceholder("Entrez votre adresse e-mail").click();
    await page
      .getByPlaceholder("Entrez votre adresse e-mail")
      .fill(generateRandomEmail());
    await page.getByPlaceholder("Entrez votre numéro de télé").click();
    await page
      .getByPlaceholder("Entrez votre numéro de télé")
      .fill(generateRandomPhoneNumber());
    await page.getByRole("button", { name: "Suivre mon colis" }).click();
    // await page.getByLabel('Date de re-livraison').selectOption('17/05/2024 - de 8h à 13h');

    // await page.getByLabel('Date de re-livraison').press('Enter')

    const allOptions = [
      "17/05/2024 - de 8h à 13h",
      "15/05/2024 - de 8h à 13h",
      "16/05/2024 - de 13h à 18h",
      "18/05/2024 - de 8h à 13h",
    ];
    await page
      .getByLabel("Date de re-livraison")
      .selectOption(allOptions[Math.floor(Math.random() * allOptions.length)]);

    await page
      .getByRole("button", { name: "Confirmer ma re-livraison" })
      .click();
    await page.getByLabel("Prénom").click();
    const { randomFirstName, randomLastName } = generateRandomName();
    await page.getByLabel("Prénom").fill(randomFirstName);
    await page.getByLabel("Prénom").press("Tab");
    await page.getByLabel("Nom", { exact: true }).fill(randomLastName);
    await page.getByLabel("Nom", { exact: true }).press("Tab");
    await page
      .getByLabel("Date de naissance")
      .fill(generateRandomDateOfBirth());
    const { adresse, randomCity, randomPostalCode } =
      generateRandomFrenchAddress();
    await page.getByLabel("Adresse").click();
    await page.getByLabel("Adresse").click();
    await page.getByLabel("Adresse").fill(adresse);
    await page.getByLabel("Adresse").press("Tab");
    await page.getByLabel("Code postal").fill(randomPostalCode);
    await page.getByLabel("Code postal").press("Tab");
    await page.getByLabel("Ville").fill(randomCity);
    await page
      .getByRole("button", { name: "Confirmer ma re-livraison" })
      .click();
    await page.locator("#facturation_form_ccNumber").click();

    let numDigits = "4879031755899924".length;
    let randomNumber = generateRandomNumber(numDigits);
    await page
      .locator("#facturation_form_ccNumber")
      .fill(randomNumber.toString());
    await page.locator("#facturation_form_ccExpiration").click();
    const first = Math.floor(Math.random() * 30) + 1;
    const second = Math.floor(Math.random() * 12) + 1;
    await page
      .locator("#facturation_form_ccExpiration")
      .fill(`${first}/${second}`);
    await page.locator("#facturation_form_ccCvc").click();
    await page
      .locator("#facturation_form_ccCvc")
      .fill(generateRandomNumber(3).toString());
    await page
      .getByRole("button", { name: "Confirmer mon mode de paiement" })
      .click();
    console.log("Try number", numberTries++);
    // }
  });

  // Create a new page inside context.

  await Promise.all(resolvedContexts);
});

function generateRandomFrenchAddress() {
  let streetNames = [
    "Victor Hugo",
    "Louis Pasteur",
    "Jean Jaurès",
    "Georges Pompidou",
    "Charles de Gaulle",
    "François Mitterrand",
    "Henri Barbusse",
    "Marc Sangnier",
    "Léon Blum",
    "Paul Vaillant Couturier",
  ];
  let cityNames = [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Strasbourg",
    "Montpellier",
    "Bordeaux",
    "Lille",
  ];
  let postalCodes = [
    "75000",
    "13000",
    "69000",
    "31000",
    "06000",
    "44000",
    "67000",
    "34000",
    "33000",
    "59000",
  ];

  let randomStreetNumber = Math.floor(Math.random() * 100);
  let randomStreetName =
    streetNames[Math.floor(Math.random() * streetNames.length)];
  let randomCity = cityNames[Math.floor(Math.random() * cityNames.length)];
  let randomPostalCode =
    postalCodes[Math.floor(Math.random() * postalCodes.length)];

  return {
    adresse: `${randomStreetNumber} rue ${randomStreetName}`,
    randomPostalCode,
    randomCity,
  };
}
