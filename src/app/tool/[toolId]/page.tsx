import { Metadata } from 'next';
import UgaChatbot from '@/components/tools/UgaChatbot';
import WelcomeHub from '@/components/tools/WelcomeHub';

type Props = {
  params: Promise<{ toolId: string }>;
};

const tools: Record<string, { component: React.ComponentType; title: string; desc: string }> = {
  'uga-chat': {
    component: UgaChatbot,
    title: 'Chat with UGA',
    desc: 'Chat with our AI mascot UGA about our tools.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId } = await params;
  const tool = tools[toolId];

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

export default async function ToolPage({ params }: Props) {
  const { toolId } = await params;
  const tool = tools[toolId];

  if (!tool) {
    return <WelcomeHub />;
  }

  const ToolComponent = tool.component;

  return <ToolComponent />;
}

