'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextHead from "../components/NextHead";
import { buildDonasjonerLenke } from "../utils/donasjonerLenke";

const TakkFadder = () => {
  const router = useRouter();
  const [vippsLenke, setVippsLenke] = useState("");

  const ref = typeof router.query.ref === "string" ? router.query.ref : "";
  const name = typeof router.query.name === "string" ? router.query.name : "";

  useEffect(() => {
    if (ref) setVippsLenke(buildDonasjonerLenke(ref));
  }, [ref]);

  return (
    <>
      <NextHead
        title="Takk - Helping Hands"
        description="Fullfør den faste donasjonen i Vipps."
      />
      <div className="kontakt">
        <div className="confirmation kontakt--padding">
          {!router.isReady ? (
            <p>Laster...</p>
          ) : ref ? (
            <>
              <h2>Takk for at du vil bli fadder! 🧡</h2>
              <p>
                {name
                  ? `Du er nesten i mål med å bli fadder for ${name}.`
                  : "Du er nesten i mål."}{" "}
                Siste steg er å sette opp den faste donasjonen i Vipps. Der velger
                du selv beløp og trekkdato.
              </p>
              <a
                className="btn btn--orange"
                href={vippsLenke}
                target="_blank"
                rel="noopener noreferrer"
              >
                Åpne Vipps og fullfør
              </a>
              <p style={{ marginTop: "1.5rem" }}>
                Når avtalen er på plass, tar vi kontakt med informasjon om
                fadderbarnet ditt.
              </p>
              <a href="/" className="sponsor-link sunshinelink">
                Tilbake til forsiden
              </a>
            </>
          ) : (
            <>
              <h2>Noe mangler</h2>
              <p>Vi fant ingen registrering å fullføre. Prøv å bli fadder på nytt.</p>
              <a href="/fadderordning" className="sponsor-link sunshinelink">
                Til fadderordningen
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TakkFadder;