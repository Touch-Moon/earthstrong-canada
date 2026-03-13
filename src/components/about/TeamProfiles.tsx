import { team } from "@/data/team";
import TeamMemberCard from "./TeamMember";

/* ━━ Reproducing s-people-grid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   - flex-wrap layout (flex, not grid)
   - Each card: image first -> name/title below
   - On hover bio overlay: clip-path reveal (same as s-people-grid)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function TeamProfiles() {
  return (
    <section className="es-team">
      <div className="es-team__inner">
        <div className="es-team__heading">
          <p className="es-team__tag">The People Behind The Science</p>
          <h2 className="es-team__title">Leadership</h2>
        </div>

        <div className="es-team__list">
          {team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
