// Simple test to verify soft delete works
// This script can be run in the browser console on a booking detail page

async function testSoftDelete() {
  // Find a booking reference from the current page
  const bookingRefElement = document.querySelector('p:contains("Ref:")');
  const bookingRef = bookingRefElement?.textContent?.replace('Ref: #', '');
  
  if (!bookingRef) {
    console.error('No booking reference found on page');
    return;
  }
  
  console.log(`Testing soft delete for booking: ${bookingRef}`);
  
  try {
    // Get the session token
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    
    if (!token) {
      console.error('No session token found');
      return;
    }
    
    // Call the delete endpoint
    const response = await fetch('/api/bookings/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ reference: bookingRef }),
    });
    
    const result = await response.json();
    
    console.log('Delete response:', result);
    
    if (response.ok) {
      console.log('✅ Soft delete successful!');
      console.log(`Deleted with: ${result.deletedWith}`);
      
      // Check if booking is gone from list
      setTimeout(async () => {
        const listResponse = await fetch('/api/bookings/list', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const listResult = await listResponse.json();
        
        const deletedBooking = listResult.bookings?.find(b => 
          b.booking_reference === bookingRef || b.id === bookingRef
        );
        
        if (!deletedBooking) {
          console.log('✅ Booking successfully removed from list!');
        } else {
          console.log('❌ Booking still appears in list');
        }
      }, 1000);
    } else {
      console.error('❌ Delete failed:', result.error);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testSoftDelete();
