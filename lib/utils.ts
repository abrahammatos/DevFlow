import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLocaleLowerCase();
  return techMap[normalizedTechName] ? `${techMap[normalizedTechName]} colored` : "devicon-devicon-plain";
};

export const getTimeStamp = (date: Date): string => {
  const now = new Date();
  const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If the date is in the future, fallback to 'just now' or handle accordingly
  if (secondsPast < 0) return "just now";

  if (secondsPast < 60) {
    return `${secondsPast} second${secondsPast === 1 ? "" : "s"} ago`;
  }

  if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (secondsPast < 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (secondsPast < 2592000) {
    // 30 days
    const days = Math.floor(secondsPast / 86400);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  if (secondsPast < 31536000) {
    // 365 days
    const months = Math.floor(secondsPast / 2592000);
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(secondsPast / 31536000);
  return `${years} year${years === 1 ? "" : "s"} ago`;
};
