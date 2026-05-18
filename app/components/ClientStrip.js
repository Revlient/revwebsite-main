import Reveal from "./Reveal";

// TODO: replace with real, verified client / partner names (and ideally
// permission-cleared logos). These are placeholders — do NOT ship as fact.
const CLIENTS = [
  "Northbridge Studyabroad",
  "Atlas Commerce",
  "Meridian Agency",
  "Kestrel Labs",
  "Verde Hospitality",
];

export default function ClientStrip() {
  return (
    <section className="clients section--tight">
      <div className="container">
        <Reveal>
          {/* TODO: confirm wording once real names are in place. */}
          <p className="clients__label">
            Trusted by teams who sweat the details
          </p>
          <div className="clients__row">
            {CLIENTS.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
