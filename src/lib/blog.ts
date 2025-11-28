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

export function getAllPosts(): BlogPost[] {
  // Klasör yoksa oluştur
  if (!fs.existsSync(blogDirectory)) {
    try {
      fs.mkdirSync(blogDirectory, { recursive: true });
    } catch (e) {
      return [];
    }
  }
  
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
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        content,
      } as BlogPost;
    });

  return allPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}
