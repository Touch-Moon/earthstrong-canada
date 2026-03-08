import { team } from "@/data/team";
import TeamMemberCard from "./TeamMember";

/* ━━ s-people-grid 재현 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   - flex-wrap 레이아웃 (grid가 아닌 flex)
   - 각 카드: 이미지 먼저 → 이름/직함 아래
   - hover 시 bio overlay: clip-path 리빌 (s-people-grid 동일)
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
