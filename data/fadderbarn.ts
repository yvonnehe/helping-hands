export type FadderbarnData = {
    name: string;
    image: string;
    description: string;
    amount: number;
    category: "fadderbarn" | "andre";
};

export const fadderbarnList: FadderbarnData[] = [
    {
        name: "Yahaya",
        image: "/fadderbarn/helping-hands-yahaya.jpg",
        description: "Han er 11 år gammel og går i 5. klasse. Han bor med foreldrene og har 4 søsken. For mat på skolen, sko, sekk, uniform og andre nødvendigheter koster det 100 kr i mnd.",
        amount: 100,
        category: "fadderbarn",
    },
    {
        name: "Nordin",
        image: "/fadderbarn/helping-hands-nordin.jpg",
        description: "Han er 10 år og går i 4. klasse. Han bor med foreldrene og 4 søsken. For mat på skolen, sko, sekk, uniform og andre nødvendigheter koster det 100 kr i mnd.",
        amount: 100,
        category: "fadderbarn",
    },
    {
        name: "Jamal",
        image: "/fadderbarn/helping-hands-jamal.jpg",
        description: "Han er 10 år gammel. Han bor med moren og storebroren. Han har også 2 storesøstre. Han går i 4. klasse. For 100 kr i mnd støtter du han med mat på skolen, uniform og alt annet han trenger i forbindelse med skolegangen.",
        amount: 100,
        category: "fadderbarn",
    },
    {
        name: "Dickson",
        image: "/fadderbarn/helping-hands-dickson.jpg",
        description: "Han er 18 år gammel og går på internatskole. Han har allerede én fadder, men trenger flere for å dekke alle utgiftene. De resterende 170 kronene i måneden bidrar til å dekke skolepenger, kost og losji, uniform og alt annet han trenger i forbindelse med skolegangen.",
        amount: 170,
        category: "fadderbarn",
    },
    {
        name: "Petro",
        image: "/fadderbarn/helping-hands-petro.jpg",
        description: "Han er 8 år gammel og går i 2.klasse. Han bor med moren. For 100 kr i mnd støtter du han med mat på skolen, uniform, hygieneprodukter og alt annet han trenger i forbindelse med skolegangen.",
        amount: 100,
        category: "fadderbarn",
    },
    // {
    //     name: "Ndelekwa",
    //     image: "/ndelekwa.jpg",
    //     description: "Han er lam etter en ulykke. Han har ingen familie til å ta vare på seg. Litt tilbake i tid ble han alvorlig syk, og måtte bli innlagt. Nå blir han tatt vare på av en sykepleier. Du kan være fadder for Ndelekwa, med et valgfritt beløp i mnd.",
    //     amount: 450,
    //     category: "andre",
    // }
];
