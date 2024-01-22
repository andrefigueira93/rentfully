import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format currency in a human readable format
export function formatCurrency(value?: number) {
  // If no value is provided, return NaN
  if (!value) {
    return "NaN";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

// Function to format date in a human readable format
export function humanDate(date: Date | undefined) {
  if (!date) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
}

// Function to calculate the final price of a booking
export function calculateFinalPrice({
  price,
  extraPrice,
  guests = 1,
  totalDays = 1,
}: {
  price?: number;
  extraPrice?: number;
  guests?: number;
  totalDays?: number;
}) {
  // If any of the values are undefined, return NaN
  if (!price || !extraPrice) {
    return NaN;
  }

  const guestSum = guests > 1 ? guests - 1 : 1;
  const extraPriceSum = extraPrice * guestSum;
  const priceSum = price + extraPriceSum;
  const finalPrice = priceSum * totalDays;

  return finalPrice;
}
