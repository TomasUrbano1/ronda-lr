'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
type Cat = { slug: string; name: string };
export default function CategoryPills({ cats }: { cats: Cat[] }) {
  const sp = useSearchParams();
  const current = sp.get('cat') || '';
  return (
    <div className="flex flex-wrap gap-2">
      <Link href={'/'} className={`btn btn-secondary ${current===''?'opacity-100':'opacity-70'}`}>Todas</Link>
      {cats.map(c => (
        <Link key={c.slug} href={`/?cat=${c.slug}`} className={`btn btn-secondary ${current===c.slug?'opacity-100':'opacity-70'}`}>
          {c.name}
        </Link>
      ))}
    </div>
  );
}
