"use client";

import Image from "next/image";
import type { TeamMember } from "@/types";

/* ━━ sb-member 카드 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   generousbranding.com .s-people-grid .sb-member 재현:
   ① .es-member__img: ::before padding-top 140.553% (3:4 비율)
      - hover 시 bio overlay: clip-path polygon 리빌 (.es-member__bio)
      - bio 텍스트: translateY(3em → 0) 슬라이드 업 (.es-member__bio-text)
   ② .es-member__info: 이름 + 직함 (이미지 아래)
   hover CSS → SCSS .es-member:hover .es-member__bio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface Props {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: Props) {
  return (
    <article className="es-member">
      {/* ── 이미지 + hover bio overlay ── */}
      <div className="es-member__img">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />

        {/* bio overlay: clip-path 리빌 on hover (.es-member__bio) */}
        <div className="es-member__bio">
          <div className="es-member__bio-text">
            <p className="es-member__bio-name">{member.name}</p>
            <p className="es-member__bio-title">{member.title}</p>
            <p className="es-member__bio-desc">{member.bio}</p>
          </div>
        </div>
      </div>

      {/* ── 이름 + 직함 (이미지 아래) ── */}
      <div className="es-member__info">
        <h3 className="es-member__name" style={{ fontWeight: 400 }}>
          {member.name}
        </h3>
        <p className="es-member__title-text">{member.title}</p>
      </div>
    </article>
  );
}
