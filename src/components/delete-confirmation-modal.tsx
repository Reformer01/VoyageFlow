"use client";

import * as React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  bookingReference: string;
  bookingLocation?: string;
  loading?: boolean;
}

export function DeleteConfirmationModal({ 
  open, 
  onOpenChange, 
  onConfirm, 
  bookingReference, 
  bookingLocation = "Your Destination", 
  loading = false 
}: DeleteConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-red-200 dark:border-red-900 p-0">
        <div className="p-8 text-center">
          {/* Delete Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
            <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          
          <AlertDialogTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            Delete Booking?
          </AlertDialogTitle>
          
          <AlertDialogDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
            Are you sure you want to permanently delete your booking for <span className="font-semibold text-slate-900 dark:text-slate-100">{bookingLocation}</span>? 
            <br /><br />
            <span className="text-red-600 dark:text-red-400 font-medium">This action cannot be undone.</span> All booking data, payment records, and itinerary details will be permanently removed.
          </AlertDialogDescription>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <AlertDialogAction asChild>
              <Button 
                variant="destructive" 
                onClick={onConfirm} 
                disabled={loading}
                className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="h-5 w-5" />
                {loading ? "Deleting..." : "Delete Permanently"}
              </Button>
            </AlertDialogAction>
            
            <AlertDialogCancel asChild>
              <Button 
                variant="outline" 
                disabled={loading}
                className="w-full py-4 px-6 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white font-bold rounded-xl transition-colors"
              >
                Keep Booking
              </Button>
            </AlertDialogCancel>
          </div>
          
          <p className="mt-6 text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
            Reference: #{bookingReference}
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
