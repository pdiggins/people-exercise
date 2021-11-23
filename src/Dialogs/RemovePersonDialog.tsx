import {
  FC,
  ReactElement,
} from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
  } from "@mui/material";

	import { RemovePersonDialogProps } from "../types";

export const RemovePersonDialog: FC<RemovePersonDialogProps> = ({
	open,
	onSubmit,
	onClose,
}): ReactElement => (
	<Dialog
		open={open}
		onClose={onClose}
	>
		<DialogTitle>
			<Typography variant="h5">
				Remove person?
			</Typography>
		</DialogTitle>
		<DialogContent>
			<Typography variant="subtitle1">
				This will permenantly remove the person from the database.
			</Typography>
		</DialogContent>
		<DialogActions>
			<Button
				onClick={() => onSubmit()}
			>
				Submit
			</Button>
			<Button
				onClick={() => onClose()}
			>
				Cancel
			</Button>
		</DialogActions>
	</Dialog>
);

