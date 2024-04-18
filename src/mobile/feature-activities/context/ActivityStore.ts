import { Activity } from "@/mobile/feature-activities/context/ActivityContext";
import {
  readCookie,
  readData,
  storeCookie,
  storeData,
} from "@/shared/lib/utils";

const localstorageSupport = typeof localStorage !== "undefined";

const ACTIVITY_STORAGE_KEY = "@uitpas-balie/mobile/activity";

export const storeActivity = (activity: Activity) => {
  localstorageSupport
    ? storeData(ACTIVITY_STORAGE_KEY, activity)
    : storeCookie(ACTIVITY_STORAGE_KEY, activity);
};

export const readActivity = (): Activity => {
  return localstorageSupport
    ? readData(ACTIVITY_STORAGE_KEY, {
        "@id":
          "https://io-test.uitdatabank.be/event/8db1e263-29ce-44f6-bda0-00c7963a72b8",
        "@context": "/contexts/event",
        name: { nl: "Trio Fenix", fr: "Trio Fenix", en: "Trio Fenix" },
        description: {
          nl: "Het Trio Fenix speelt werk van L. van Beethoven en J. Cras.\n\nHet Trio Fenix bestaat uit Shirley Laub (viool), Tony Nys (altviool) en Karel Steylaerts (cello).",
        },
        availableFrom: "2017-02-06T13:11:55+01:00",
        availableTo: "2017-02-16T00:00:00+01:00",
        labels: ["Broodje Brussel"],
        hiddenLabels: ["Paspartoe"],
        location: {
          "@type": "Place",
          mainLanguage: "nl",
          name: { nl: "MIM - Muziekinstrumentenmuseum (KMKG)." },
          address: {
            nl: {
              addressCountry: "BE",
              addressLocality: "Brussel",
              postalCode: "1000",
              streetAddress: "Hofberg ",
            },
          },
          status: { type: "Available" },
          bookingAvailability: { type: "Available" },
        },
        organizer: {
          "@id":
            "https://io-test.uitdatabank.be/organizers/28808C2F-0DB2-D2CF-F508ECB994D2505F",
          "@context": "/contexts/organizer",
          mainLanguage: "nl",
          name: "Muntpunt",
          address: {
            nl: {
              addressCountry: "BE",
              addressLocality: "Brussel",
              postalCode: "1000",
              streetAddress: "Munt 6",
            },
          },
          labels: ["Cultuurbon", "UiTPAS Herita"],
          hiddenLabels: ["Paspartoe"],
          contactPoint: {
            phone: ["+32 2 2781111"],
            email: ["info@muntpunt.be"],
            url: [],
          },
          workflowStatus: "ACTIVE",
          languages: ["nl"],
          completedLanguages: ["nl"],
          modified: "2019-11-26T12:51:04+00:00",
          geo: { latitude: 50.8493849, longitude: 4.3538025 },
        },
        bookingInfo: { description: "Normaal", priceCurrency: "EUR", price: 9 },
        contactPoint: {
          phone: ["02 880 61 45"],
          url: ["http://www.concertsdemidi.be"],
        },
        priceInfo: [
          {
            category: "base",
            name: {
              nl: "Basistarief",
              fr: "Tarif de base",
              en: "Base tariff",
              de: "Basisrate",
            },
            price: 9,
            priceCurrency: "EUR",
          },
        ],
        terms: [
          { label: "Klassieke muziek", domain: "theme", id: "1.8.1.0.0" },
          {
            label: "Kunststad Brussel",
            domain: "flanderstouristregion",
            id: "reg.357",
          },
          { label: "Concert", domain: "eventtype", id: "0.50.4.0.0" },
          { label: "1000 Brussel", domain: "flandersregion", id: "reg.1565" },
        ],
        creator: "webmaster@agenda.be",
        created: "2017-01-10T15:31:30+01:00",
        modified: "2022-09-23T10:11:59+00:00",
        publisher: "SKB import",
        calendarType: "single",
        startDate: "2017-02-15T12:30:00+01:00",
        endDate: "2017-02-15T13:30:00+01:00",
        subEvent: [
          {
            id: 0,
            status: { type: "Available" },
            bookingAvailability: { type: "Available" },
            "@type": "Event",
            startDate: "2017-02-15T12:30:00+01:00",
            endDate: "2017-02-15T13:30:00+01:00",
          },
        ],
        sameAs: [
          "http://www.uitinvlaanderen.be/agenda/e/trio-fenix/8db1e263-29ce-44f6-bda0-00c7963a72b8",
        ],
        seeAlso: ["http://www.concertsdemidi.be"],
        workflowStatus: "APPROVED",
        audience: { audienceType: "everyone" },
        mainLanguage: "nl",
        languages: ["nl", "fr", "en", "de"],
        completedLanguages: ["nl"],
        production: null,
        status: { type: "Available" },
        bookingAvailability: { type: "Available" },
        typicalAgeRange: "-",
        attendanceMode: "offline",
        regions: [],
        isNew: false,
      } as unknown as Activity)
    : readCookie(ACTIVITY_STORAGE_KEY, undefined);
};
