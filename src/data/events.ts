export interface DinnerEvent {
  date: string; // "YYYY-MM-DD"
  title: string;
  startTime: string; // "HH:MM" 24h
  endTime: string; // "HH:MM" 24h
  venueName: string;
  address1: string;
  address2: string;
  timeZone: string;
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeStr: string): string {
  const [hour, minute] = timeStr.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export function mapsUrl(address1: string, address2: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address1}, ${address2}`)}`;
}

// Last Monday of each month in 2026
export const events: DinnerEvent[] = [
  {
    date: "2026-02-23",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-03-30",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-04-27",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-05-25",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-06-29",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-07-27",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-08-31",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-09-28",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-10-26",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-11-30",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
  {
    date: "2026-12-28",
    title: "Dude Talk Dinners",
    startTime: "18:00",
    endTime: "20:00",
    venueName: "2 Dads Eatery and Taproom",
    address1: "60006 US Highway 285",
    address2: "Bailey, CO 80421",
    timeZone: "America/Denver",
  },
];
