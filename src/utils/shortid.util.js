import { nanoid } from 'nanoid';

export function generateShortId(size = 7) {
  return nanoid(size);
}