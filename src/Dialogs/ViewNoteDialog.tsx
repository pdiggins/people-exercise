import {
	FC,
	ReactElement,
	useState,
	useEffect,
  } from "react";
  
  import {
		Box,
	  Button,
	  Dialog,
	  DialogActions,
	  DialogContent,
	  DialogTitle,
		TextField,
	  Typography,
	} from "@mui/material";
  
	import {
		ViewNoteProps
	} from "../types";
  
  export const ViewNoteDialog: FC<ViewNoteProps> = ({
	  open,
	  onSubmit,
	  onClose,
	  person,
  }): ReactElement => {
		const [note, setNote] = useState<string>(person !== null ? person.note : '');
		const [valid, setValid] = useState<boolean>(false);

		useEffect(() => {
			let checkValid = note.length <= 500;
			setValid(checkValid);
		}, [note]);

		useEffect(() => {
			setNote(person !== null ? person.note : '');
		}, [person]);

		const onClickSubmit = () => {
			setNote('');
			if (person !== null) {
				const newPerson = {...person, ...{note}}
				onSubmit(newPerson);
			} else {
				onClose();
			}
		}
	
		const onClickCancel = () => {
			setNote('');
	
			onClose();
		}

	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			<DialogTitle>
				<Typography variant="h5">
					{`Note for ${person?.firstName} ${person?.lastName}`}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Box mt={1}>
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
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => onClickSubmit()}
					disabled={!valid}
				>
					Save
				</Button>
				<Button
					onClick={() => onClickCancel()}
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
  };
  
  