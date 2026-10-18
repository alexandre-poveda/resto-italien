import { MENU_ITEMS as DEFAULT_MENU, EVENTS as DEFAULT_EVENTS } from './restaurantData';

const MENU_KEY = 'santo_mare_menu_v3';
const EVENTS_KEY = 'santo_mare_events_v3';

export function getStoredMenu() {
  if (typeof window === 'undefined') return DEFAULT_MENU;
  try {
    const raw = localStorage.getItem(MENU_KEY);
    if (!raw) {
      localStorage.setItem(MENU_KEY, JSON.stringify(DEFAULT_MENU));
      return DEFAULT_MENU;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading menu from storage', e);
    return DEFAULT_MENU;
  }
}

export function saveStoredMenu(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MENU_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('santo_data_updated', { detail: { type: 'menu' } }));
  } catch (e) {
    console.error('Error saving menu to storage', e);
  }
}

export function resetStoredMenu() {
  if (typeof window === 'undefined') return DEFAULT_MENU;
  try {
    localStorage.setItem(MENU_KEY, JSON.stringify(DEFAULT_MENU));
    window.dispatchEvent(new CustomEvent('santo_data_updated', { detail: { type: 'menu' } }));
    return DEFAULT_MENU;
  } catch (e) {
    return DEFAULT_MENU;
  }
}

export function getStoredEvents() {
  if (typeof window === 'undefined') return DEFAULT_EVENTS;
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (!raw) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(DEFAULT_EVENTS));
      return DEFAULT_EVENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading events from storage', e);
    return DEFAULT_EVENTS;
  }
}

export function saveStoredEvents(events) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    window.dispatchEvent(new CustomEvent('santo_data_updated', { detail: { type: 'events' } }));
  } catch (e) {
    console.error('Error saving events to storage', e);
  }
}

export function resetStoredEvents() {
  if (typeof window === 'undefined') return DEFAULT_EVENTS;
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(DEFAULT_EVENTS));
    window.dispatchEvent(new CustomEvent('santo_data_updated', { detail: { type: 'events' } }));
    return DEFAULT_EVENTS;
  } catch (e) {
    return DEFAULT_EVENTS;
  }
}
