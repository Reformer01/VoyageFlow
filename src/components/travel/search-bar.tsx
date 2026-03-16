
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SearchBar() {
  const router = useRouter();
  const [type, setType] = useState('flight');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?type=${type}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-2xl p-6">
      <Tabs defaultValue="flight" onValueChange={setType} className="mb-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="flight" className="data-[state=active]:bg-primary data-[state=active]:text-white">Flights</TabsTrigger>
          <TabsTrigger value="hotel" className="data-[state=active]:bg-primary data-[state=active]:text-white">Hotels</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-white">Activities</TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 h-12" placeholder="Where to?" />
        </div>
        <div className="relative md:col-span-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 h-12" type="date" placeholder="When?" />
        </div>
        <div className="relative md:col-span-1">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 h-12" placeholder="Guests" type="number" min="1" defaultValue="1" />
        </div>
        <Button className="h-12 bg-primary hover:bg-primary/90 text-lg font-semibold gap-2">
          <Search className="h-5 w-5" />
          Search
        </Button>
      </form>
    </div>
  );
}
