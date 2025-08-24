import { type ExampleProps, Example } from '@/components/Example';

export interface ExampleTemplateProps {
  heading: string;
  example: ExampleProps;
}

export const ExampleTemplate = ({ heading, example }: ExampleTemplateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="font-bold text-5xl text-gradient-primary">{heading}</h1>

      <Example {...example} />
    </div>
  );
};
