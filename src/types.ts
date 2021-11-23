export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
};

export type PeopleListProps = {
  getCount: (num: number) => void,
};

export type AddPersonDialogProps = {
	open: boolean,
	onClose: () => void,
	onSubmit: (person: Person) => void,
}

export type RemovePersonDialogProps = {
	open: boolean,
	onSubmit: () => void,
	onClose: () => void,
}

export type ViewNoteProps = {
	open: boolean,
	onClose: () => void,
	onSubmit: (person: Person) => void,
  person: Person | null,
}
