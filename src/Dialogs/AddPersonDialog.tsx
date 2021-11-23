import {
	FC,
	ReactElement,
	useState,
	useEffect
} from "react";
  
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
	Typography,
} from "@mui/material";

import {
	Person,
	AddPersonDialogProps,
} from "../types";
  
export const AddPersonDialog: FC<AddPersonDialogProps> = ({
	open,
	onClose,
	onSubmit,
}): ReactElement => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhoneNumber] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [valid, setValid] = useState<boolean>(false);

	//TODO: Add specific validation for email and phone numbers
	useEffect(() => {
		let checkValid = firstName.length > 0 && firstName.length <= 50;
		checkValid = checkValid && lastName.length > 0 && lastName.length <= 50;
		checkValid = checkValid && email.length > 0;
		checkValid = checkValid && phone.length > 0;
		checkValid = checkValid && note.length <= 500;
		setValid(checkValid);
  }, [firstName, lastName, email, phone, note]);
	
	const onClickSubmit = () => {
		const person: Person = {
			id: 0,
			firstName,
			lastName,
			email,
			phone,
			note,
		}
		console.log(person);

		setFirstName('');
		setLastName('');
		setEmail('');
		setPhoneNumber('');
		setNote('');

		onSubmit(person);
	}

	const onClickCancel = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPhoneNumber('');
		setNote('');

		onClose();
	}

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={onClose}
		>
			<DialogTitle>
				<Typography variant="h5">
					Add Person
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Grid 
					container
					direction={"column"}
					spacing={2}
					alignItems="center"
					justifyContent="center"
				>
					<Grid item>
						<Box mt={1}>
							<TextField
								id="first-name"
								name="first-name"
								label="First Name"
								value={firstName}
								style = {{width: 400}}
								required
								error={firstName.length > 50}
								helperText={firstName.length > 50 ? 'The first name must be less than 50 characters.' : ''}
								onChange={(val) => setFirstName(val.target.value)}
							/>
						</Box>
					</Grid>
					<Grid item>
						<TextField
							id="last-name"
							name="last-name"
							label="Last Name"
							value={lastName}
							style = {{width: 400}}
							required
							error={lastName.length > 50}
							helperText={lastName.length > 50 ? 'The last name must be less than 50 characters.' : ''}
							onChange={(val) => setLastName(val.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							id="email"
							name="email"
							label="Email"
							value={email}
							style = {{width: 400}}
							required
							onChange={(val) => setEmail(val.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							id="phone"
							name="phone"
							label="Phone Number"
							value={phone}
							style = {{width: 400}}
							required
							onChange={(val) => setPhoneNumber(val.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							id="note"
							name="note"
							label="Note"
							value={note}
							multiline
							rows={4}
							style = {{width: 400}}
							error={note.length > 500}
							helperText={note.length > 500 ? 'The note must be less than 500 characters.' : ''}
							onChange={(val) => setNote(val.target.value)}
						/>
					</Grid>
					<Grid item>
						<Button
							disabled={!valid}
							onClick={() => onClickSubmit()}
						>
							Submit
						</Button>
						<Button
							onClick={() => onClickCancel()}
						>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};
  
  