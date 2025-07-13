import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

interface Gallery {
  slug: string;
  title: string;
  description?: string;
  images?: { alt?: string; image: string }[];
}

export default function Home({ galleries }: { galleries: Gallery[] }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Karyn Ru Dance</h1>
      <p>This is the portfolio homepage.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {galleries.map((gallery) => (
          <div
            key={gallery.slug}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              maxWidth: '300px',
              flex: '1 1 300px',
              padding: '1rem',
            }}
          >
            {gallery.images?.[0]?.image && (
              <Image
                src={`/uploads/${gallery.images[0].image}`}
                alt={gallery.images[0].alt || gallery.title}
                width={300}
                height={200}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                unoptimized
              />
            )}
            <h2>{gallery.title}</h2>
            {gallery.description && <p>{gallery.description}</p>}
            <Link href={`/galleries/${gallery.slug}`}>View Gallery</Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const galleriesDir = path.join(process.cwd(), 'content/galleries');
  const files = fs.readdirSync(galleriesDir);

  const galleries = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(galleriesDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      images: data.images || [],
    };
  });

  return {
    props: {
      galleries,
    },
  };
}
