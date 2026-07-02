document.getElementById('reservationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const val = document.getElementById('journeyDate').value;
  if (!val) return;

  const journey = new Date(val + 'T00:00:00');
  
  const booking = new Date(journey);
  booking.setDate(journey.getDate() - 60);

  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const journeyStr = journey.toLocaleDateString('en-IN', opts);
  const bookingStr = booking.toLocaleDateString('en-IN', opts);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const bookingMidnight = new Date(booking);
  bookingMidnight.setHours(0, 0, 0, 0);

  const diff = Math.ceil((bookingMidnight - today) / (1000 * 60 * 60 * 24));

  let tagMsg = '';
  if (diff > 0) {
    tagMsg = `Booking opens in ${diff} day${diff === 1 ? '' : 's'}`;
  } else if (diff === 0) {
    tagMsg = 'Booking opens today!';
  } else {
    tagMsg = 'Booking window has passed';
  }

  document.getElementById('result').innerHTML = `
    <div class="result-box">
      <p class="small">Booking opens on</p>
      <p class="big">${bookingStr}</p>
      <p class="small">at 8:00 AM IST </p>
      <span class="tag">${tagMsg}</span>
    
    </div>
  `;
});
