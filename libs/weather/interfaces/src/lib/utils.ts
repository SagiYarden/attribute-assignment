import { differenceInDays, isAfter, isValid } from 'date-fns';

export function validateDateRange(from: Date | string, to: Date | string) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (!isValid(fromDate) || !isValid(toDate)) {
    return 'Invalid date format.';
  }

  if (isAfter(fromDate, toDate)) {
    return 'The "from" date must be before the "to" date.';
  }

  const diff = differenceInDays(toDate, fromDate);
  if (diff > 31) {
    return 'The date range cannot exceed 31 days.';
  }

  return null;
}
