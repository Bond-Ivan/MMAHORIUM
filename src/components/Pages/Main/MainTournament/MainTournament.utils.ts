export type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export function getTimeLeft(targetDate: number): TimeLeft {
  const now = Date.now();
  const difference = targetDate - now;

  if (difference <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
}