// src/helpers/formatDate.js
import { format, parseISO } from 'date-fns';

/**
 * Formats a date string into "Month Day, Year"
 * Example: "January 1, 2020"
 *
 * @param {string} atomDate - The ISO date string to format
 * @returns {string} - The formatted date string
 */
export function formatAsDate(atomDate) {
    if (!atomDate) {
        return '-';
    }

    const date = parseISO(atomDate);

    return format(date, 'MMMM d, yyyy');
}


/**
 * Formats a date string into "Month Day, Year, hh:mm AM/PM"
 * Example: "January 1, 2020, 12:00 PM"
 *
 * @param {string} atomDate - The ISO date string to format
 * @returns {string} - The formatted date and time string
 */
export function formatAsDateTime(atomDate) {
    const date = parseISO(atomDate);

    return format(date, 'MMMM d, yyyy, hh:mm a');
}

/**
 * Returns the current date in "yyyy-MM-dd" format
 * Example: "2024-08-10"
 *
 * @returns {string} - The current date in "yyyy-MM-dd" format
 */
export function now() {
    const date = new Date();

    return format(date, 'yyyy-MM-dd');
}