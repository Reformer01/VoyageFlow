
"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Download, Share2, Mail, MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ConfirmationPage() {
  const params = useParams();
  const bookingId = params.id as string;

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <CheckCircle2 className="h-16 w-16 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold mb-2">Bon Voyage!</h1>
      <p className="text-xl text-muted-foreground mb-10">Your booking is confirmed.</p>

      <Card className="w-full max-w-2xl glass-card border-none overflow-hidden mb-12">
        <div className="bg-primary p-6 text-primary-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Booking Reference</p>
            <p className="text-2xl font-mono font-bold">{bookingId}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </div>
        <CardContent className="p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold border-b pb-2">Passenger Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Primary Passenger</span>
                    <span className="font-semibold">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-semibold">john@example.com</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold border-b pb-2">Support</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">Need help with your booking?</p>
                  <Button variant="link" className="p-0 h-auto text-primary font-bold">
                    Visit Support Center
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> Next Steps
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-primary text-xs">1</div>
                  <p>Check your email for the detailed itinerary and boarding passes.</p>
                </li>
                <li className="flex gap-3">
                  <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-primary text-xs">2</div>
                  <p>Download the VoyageFlow app for real-time gate updates and mobile check-in.</p>
                </li>
                <li className="flex gap-3">
                  <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-primary text-xs">3</div>
                  <p>Enjoy your adventure!</p>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline" size="lg">Return Home</Button>
        </Link>
        <Button size="lg" className="bg-primary hover:bg-primary/90">Manage Bookings</Button>
      </div>
    </div>
  );
}
