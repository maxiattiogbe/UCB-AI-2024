import { Card, CardTitle, CardDescription } from "@/components/ui/card";

interface FeedbackCardProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  feedback: string;
}

export default function FeedbackCard({
  imgSrc,
  imgAlt,
  title,
  description,
  feedback,
}: FeedbackCardProps) {
  return (
    <Card className="w-full flex items-start gap-6">
      {/* <Card className="w-full max-w-2xl flex items-start gap-6"> */}
      {/* <img
        src={imgSrc}
        width={350}
        height={200}
        alt={imgAlt}
        className="rounded-l-md object-cover"
        // className="rounded-l-md object-cover aspect-[7/4]"
      /> */}
      <div className="w-full max-w-xl h-full overflow-hidden rounded-t-md">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-cover aspect-square"
        />
      </div>
      <div className="flex-1 space-y-4 p-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="text-muted-foreground">{feedback}</div>
      </div>
    </Card>
  );
}
