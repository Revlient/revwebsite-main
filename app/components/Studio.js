import Reveal from "./Reveal";

// "Studio" is earned by people and taste, not claimed. Personality here.
// TODO: replace placeholder team members with real names, roles and photos.
const TEAM = [
  { initials: "RV", name: "TODO: name", role: "Founder · Creative Direction" },
  { initials: "RV", name: "TODO: name", role: "Lead Engineer" },
  { initials: "RV", name: "TODO: name", role: "Design · Motion" },
  { initials: "RV", name: "TODO: name", role: "Systems & Delivery" },
];

const VALUES = [
  "Taste is a discipline",
  "Ship, then sharpen",
  "Plain speech",
  "No hand-offs",
];

export default function Studio() {
  return (
    <section className="section" id="studio">
      <div className="container">
        <div className="studio">
          <Reveal className="studio__copy">
            <span className="eyebrow">The studio</span>
            <h2>Small on purpose. Senior on purpose.</h2>
            <p>
              Revlient Intercontinental LLP is a compact creative studio. The
              people who pitch the work are the people who make it — which is
              why the craft survives contact with the deadline.
            </p>
            <div className="studio__values">
              {VALUES.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
          </Reveal>

          <Reveal className="studio__team" delay={120}>
            {TEAM.map((m, i) => (
              <div className="member" key={i}>
                <div className="member__avatar" aria-hidden="true">
                  {m.initials}
                </div>
                {/* TODO: real name + role + photo before launch. */}
                <div className="member__name">{m.name}</div>
                <div className="member__role">{m.role}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
