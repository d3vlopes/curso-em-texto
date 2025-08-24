import { ExampleTemplate } from '@/templates/ExampleTemplate';
import { exampleTemplateMock } from '@/templates/ExampleTemplate/ExampleTemplate.mock';

export default function Home() {
  const exampleData = exampleTemplateMock;

  return <ExampleTemplate {...exampleData} />;
}
