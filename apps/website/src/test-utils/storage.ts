export function clearLocalStorage() {
  localStorage.clear();
}

export function seedLocalStorage(entries: Record<string, string>) {
  clearLocalStorage();
  for (const [key, value] of Object.entries(entries)) {
    localStorage.setItem(key, value);
  }
}
