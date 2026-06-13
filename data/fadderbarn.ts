export type FadderbarnData = {
    name: string;
    image: string;
    description: string;
    amount: number;
    category: "fadderbarn" | "andre";
};

export const fadderbarnList: FadderbarnData[] = [
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
    // {
    //     name: "Ndelekwa",
    //     image: "/ndelekwa.jpg",
    //     description: "Han er lam etter en ulykke. Han har ingen familie til å ta vare på seg. Litt tilbake i tid ble han alvorlig syk, og måtte bli innlagt. Nå blir han tatt vare på av en sykepleier. Du kan være fadder for Ndelekwa, med et valgfritt beløp i mnd.",
    //     amount: 450,
    //     category: "andre",
    // }
];
