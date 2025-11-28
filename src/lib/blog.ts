import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

// 1. Tüm yazıları getir
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];
  
  const fileNames = fs.readdirSync(blogDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || '',
        tags: data.tags || [],
        content,
      } as BlogPost;
    });

  return allPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

// 2. Tek bir yazıyı getir (EKSİK OLAN BU)
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    // Dosyanın varlığını kontrol et
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      tags: data.tags || [],
      content,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}
