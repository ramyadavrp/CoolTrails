declare module 'select2';

// Extend JQuery interface so .select2(...) is allowed
interface JQuery {
  select2(...args: any[]): JQuery;
}