export function storeItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function getItem(key: string): string | undefined {
  const value = localStorage.getItem(key) as string | null;
  return value === null ? undefined : value;
}
