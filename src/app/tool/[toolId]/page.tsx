import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import UgaChatbot from '@/components/tools/UgaChatbot';
import WelcomeHub from '@/components/tools/WelcomeHub';

type Props = {
  params: Promise<{ toolId: string }>;
};

// Araç Haritası (Şimdilik sadece UGA Chat mevcut, diğerleri sonra eklenecek)
const tools: Record<string, { component: React.ComponentType; title: string; desc: string }> = {
  'uga-chat': {
    component: UgaChatbot,
    title: 'Chat with UGA',
    desc: 'Chat with our AI mascot UGA about our tools.',
  },
};

type ToolId = keyof typeof tools;

// Dinamik SEO fonksiyonu
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];
  
  if (!tool) {
    return {
      title: 'Tool Not Found | UtilityGenAI',
      description: 'The requested tool could not be found.',
    };
  }

  return {
    title: `${tool.title} | UtilityGenAI`,
    description: tool.desc,
  };
}

// "Ana Sayfa" ile aynı "Çerçeve"yi (Layout) kullanan Araç Sayfası
export default async function ToolPage({ params }: Props) {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];

  if (!tool) {
    notFound();
  }

  const ActiveComponent = tool.component;

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-shrink-0 overflow-y-auto">
          <Sidebar /> 
        </div>
        <main className="flex-1 w-full px-4 py-8 sm:px-8 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-4xl justify-center">
            <div className="w-full">
              <ActiveComponent />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
