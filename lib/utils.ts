import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'h:mm a')}`;
  } else if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'h:mm a')}`;
  } else if (isThisWeek(dateObj)) {
    return format(dateObj, 'EEEE h:mm a');
  } else if (isThisMonth(dateObj)) {
    return format(dateObj, 'MMM d, h:mm a');
  } else {
    return format(dateObj, 'MMM d, yyyy h:mm a');
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export function getRandomColor(): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500',
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

export function calculateLevel(points: number): number {
  // Every 100 points is a new level
  return Math.floor(points / 100) + 1;
}

export function calculateProgress(points: number): number {
  // Progress within current level (0-100)
  return points % 100;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}