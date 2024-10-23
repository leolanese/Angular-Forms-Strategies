export interface Pet {
  name: string;
  isChecked: boolean;
}

export const cats: Pet[] = [
  { name: 'Mittens', isChecked: false },
  { name: 'Whiskers', isChecked: false }
];

export const dogs: Pet[] = [
  { name: 'Buddy', isChecked: false },
  { name: 'Max', isChecked: false }
];