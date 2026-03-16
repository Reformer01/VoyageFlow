
"use client";

import { useSearchParams } from 'next/navigation';
import { ServiceCard } from '@/components/travel/service-card';
import { TravelService } from '@/context/basket-context';
import { SearchBar } from '@/components/travel/search-bar';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Mock data generator for results
const getResults = (type: string | null): TravelService[] => {
  const providers = ['AirJet', 'Oceanic', 'Summit Stay', 'Vista Views', 'EcoTravel'];
  const locations = ['New York, USA', 'Bali, Indonesia', 'Cape Town, SA', 'Kyoto, Japan', 'Berlin, Germany'];
  
  return Array.from({ length: 8 }).map((_, i) => ({
    id: `search-${i}`,
    type: (type as any) || 'flight',
    title: `${type === 'flight' ? 'Direct to' : 'Stay at'} ${locations[i % locations.length]}`,
    provider: providers[i % providers.length],
    price: Math.floor(Math.random() * 500) + 100,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    image: `https://picsum.photos/seed/search-${type}-${i}/800/600`,
    location: locations[i % locations.length]
  }));
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const results = getResults(type);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 flex flex-col gap-8">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-bold mb-6 text-lg">Filters</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Price Range ($)</Label>
                <Slider defaultValue={[500]} max={1000} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Rating</Label>
                {[5, 4, 3].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <Checkbox id={`rating-${star}`} />
                    <label htmlFor={`rating-${star}`} className="text-sm font-medium leading-none flex items-center gap-1">
                      {star}+ Stars
                    </label>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label>Amenities</Label>
                {['Wifi', 'Breakfast', 'Pool', 'Parking'].map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Checkbox id={`amenity-${amenity}`} />
                    <label htmlFor={`amenity-${amenity}`} className="text-sm font-medium leading-none">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold capitalize">{type} Results</h2>
            <p className="text-muted-foreground">{results.length} results found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
