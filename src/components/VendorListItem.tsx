import Link from 'next/link';

type Vendor = {
  id: string;
  name: string;
  city?: string;
  instagram?: string | null;
  whatsapp?: string | null;
};

export default function VendorListItem({ v }: { v: Vendor }) {
  return (
    <Link href={`/s/${v.id}`} className="card block hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-semibold text-lg">{v.name}</div>
          <div className="text-sm text-neutral-600">{v.city || ''}</div>
        </div>
        <div className="text-sm text-neutral-500">
          {v.instagram ? <span>@{v.instagram.replace(/^@/,'')}</span> : <span>&nbsp;</span>}
        </div>
      </div>
    </Link>
  );
}
