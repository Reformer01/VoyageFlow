
"use client";

import Image from 'next/image';
import { Star, MapPin, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { TravelService, useBasket } from '@/context/basket-context';
import { useToast } from '@/hooks/use-toast';

interface ServiceCardProps {
  service: TravelService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { addToBasket } = useBasket();
  const { toast } = useToast();

  const handleAdd = () => {
    addToBasket(service);
    toast({
      title: "Added to Basket",
      description: `${service.title} has been added to your journey.`,
    });
  };

  return (
    <Card className="overflow-hidden glass-card h-full flex flex-col group border-none">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint="travel destination"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold">{service.rating}</span>
        </div>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          {service.type === 'flight' ? <Clock className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
          {service.provider}
        </div>
        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        {service.location && (
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {service.location}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-white/20 mt-auto">
        <div>
          <span className="text-2xl font-bold text-primary">${service.price}</span>
          <span className="text-xs text-muted-foreground ml-1">/ person</span>
        </div>
        <Button size="icon" className="rounded-full bg-accent hover:bg-accent/90" onClick={handleAdd}>
          <Plus className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
