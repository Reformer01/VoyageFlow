
import Image from 'next/image';
import { SearchBar } from '@/components/travel/search-bar';
import { ServiceCard } from '@/components/travel/service-card';
import { TravelService } from '@/context/basket-context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Hotel, Map } from 'lucide-react';

const featuredOffers: TravelService[] = [
  {
    id: '1',
    type: 'flight',
    title: 'Paris - Romance in the Air',
    provider: 'Air France',
    price: 450,
    rating: 4.8,
    image: 'https://picsum.photos/seed/voyage-paris/800/600',
    location: 'Paris, France'
  },
  {
    id: '2',
    type: 'hotel',
    title: 'Azure Bay Resort & Spa',
    provider: 'Marriott',
    price: 299,
    rating: 4.9,
    image: 'https://picsum.photos/seed/voyage-azure/800/600',
    location: 'Maldives'
  },
  {
    id: '3',
    type: 'activity',
    title: 'Ancient Wonders Guided Tour',
    provider: 'HistoryGo',
    price: 85,
    rating: 4.7,
    image: 'https://picsum.photos/seed/voyage-ancient/800/600',
    location: 'Cairo, Egypt'
  },
  {
    id: '4',
    type: 'hotel',
    title: 'Tokyo Skyscraper Luxury',
    provider: 'Hilton',
    price: 340,
    rating: 4.6,
    image: 'https://picsum.photos/seed/voyage-tokyo/800/600',
    location: 'Tokyo, Japan'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/voyage-hero/1920/1080"
          alt="Hero"
          fill
          className="object-cover brightness-75"
          priority
          data-ai-hint="aerial beach"
        />
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg font-headline">
            Where your journey <span className="text-accent">flows</span>
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
            Experience the world like never before with seamless travel planning and real-time bookings.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Popular Adventures</h2>
            <p className="text-muted-foreground">Handpicked destinations for your next unforgettable escape.</p>
          </div>
          <Button variant="outline" className="group">
            View all deals <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredOffers.map((offer) => (
            <ServiceCard key={offer.id} service={offer} />
          ))}
        </div>
      </section>

      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose VoyageFlow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-6 rounded-full">
                <Plane className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Fastest Bookings</h3>
              <p className="text-muted-foreground">Real-time confirmation with our direct carrier integration.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-6 rounded-full">
                <Hotel className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Premium Selection</h3>
              <p className="text-muted-foreground">Only the top-rated hotels and activities vetted for quality.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-6 rounded-full">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Itinerary</h3>
              <p className="text-muted-foreground">Automated travel flows that connect your dots effortlessly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
