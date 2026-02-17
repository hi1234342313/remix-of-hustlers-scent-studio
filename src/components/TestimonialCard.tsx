import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  image: string;
  name: string;
  review: string;
  rating?: number;
}

export const TestimonialCard = ({ image, name, review, rating = 5 }: TestimonialCardProps) => {
  return (
    <Card className="overflow-hidden border-border bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 space-y-3">
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic">"{review}"</p>
        {name && <p className="font-semibold text-foreground">— {name}</p>}
      </div>
    </Card>
  );
};
