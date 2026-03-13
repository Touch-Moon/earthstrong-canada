"use client";

import Image from "next/image";
import type { TeamMember } from "@/types";

/* ━━ sb-member card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Reproducing generousbranding.com .s-people-grid .sb-member:
   1) .es-member__img: ::before padding-top 140.553% (3:4 aspect ratio)
      - on hover bio overlay: clip-path polygon reveal (.es-member__bio)
      - bio text: translateY(3em -> 0) slide up (.es-member__bio-text)
   2) .es-member__info: name + title (below image)
   hover CSS -> SCSS .es-member:hover .es-member__bio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface Props {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: Props) {
  return (
    <article className="es-member">
      {/* ── Image + hover bio overlay ── */}
      <div className="es-member__img">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />

        {/* bio overlay: clip-path reveal on hover (.es-member__bio) */}
        <div className="es-member__bio">
          <div className="es-member__bio-text">
            <p className="es-member__bio-name">{member.name}</p>
            <p className="es-member__bio-title">{member.title}</p>
            <p className="es-member__bio-desc">{member.bio}</p>
          </div>
        </div>
      </div>

      {/* ── Name + title (below image) ── */}
      <div className="es-member__info">
        <h3 className="es-member__name" style={{ fontWeight: 400 }}>
          {member.name}
        </h3>
        <p className="es-member__title-text">{member.title}</p>
      </div>
    </article>
  );
}
