'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

type Section = { id: string; name: string; slug: string };

export default function SectionTabs({ sections }: { sections: Section[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = sp.get('sec') || (sections[0]?.slug ?? '');

  const go = (slug: string) => {
    const params = new URLSearchParams(sp);
    if (slug) params.set('sec', slug); else params.delete('sec');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {sections.map(s => (
        <button
          key={s.id}
          onClick={() => go(s.slug)}
          className={`btn btn-secondary ${current===s.slug ? 'opacity-100' : 'opacity-70'}`}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}
