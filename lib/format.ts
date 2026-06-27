import { format, parseISO } from 'date-fns'

export function formatPostDate(date: string): string {
  return format(parseISO(date), 'MMMM d, yyyy')
}
