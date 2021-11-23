import {
  FC,
  ReactElement,
  useEffect,
  useState
} from 'react';

import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import {
	red,
} from '@mui/material/colors';

import {
  DataGrid,
  GridCellParams,
  GridRowParams,
} from '@mui/x-data-grid'

import CommentIcon from '@mui/icons-material/Comment';
import CancelIcon from '@mui/icons-material/Cancel';

//TODO: add styline for invalid cells in grid 
import styles from './PeopleList.module.scss';
import * as services from '../dataServices';
import {
  Person,
  PeopleListProps,
} from '../types';

import { AddPersonDialog } from '../Dialogs/AddPersonDialog';
import { RemovePersonDialog } from '../Dialogs/RemovePersonDialog';
import { ViewNoteDialog } from '../Dialogs/ViewNoteDialog';

export const PeopleList: FC<PeopleListProps> = ({ getCount }): ReactElement => {
  const [data, setData] = useState<Person[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [removeId, setRemoveId] = useState<number>(-1);
  const [addPerson, setAddPerson] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loadedMessage, setLoadedMessage] = useState<string>('The table is loading.')
  const [notePerson, setNotePerson] = useState<Person | null>(null);

  useEffect(() => {
    const fn = async () => {
      try{
        const people = await services.retrievePeople();
        setData(people);
        getCount(people.length);
        if (people.length > 0) {
          setLoaded(true);
          setNextId(people[people.length-1].id+1);
        } else {
          setLoadedMessage('There are no people');
        }
      } catch (err) {
        console.log('Failed to retrieve people');
        console.log(err);
      }
      
    };
    fn();
  }, []);

  const onAddClick = () => {
    setAddPerson(true);
  }

  const onAddClose = () => {
    setAddPerson(false);
  }

  const onAddConfirm = async (person: Person) => {
    person.id = nextId;
    setAddPerson(false);
    try {
      const people = await services.createPerson(person);
      setData(people);
      getCount(people.length);
      setNextId(nextId+1);
      setLoaded(true);
    } catch (err) {
      console.log('Failed to create person');
      console.log(err);
    }
  }

  const onRemoveClick = (event: any, cellValues: GridCellParams) => {
    event.stopPropagation();
    setRemoveId(cellValues.row.id);
  }

  const onRemoveCancel = () => {
    setRemoveId(-1);
  }

  const onRemoveConfirm = async () => {
    setRemoveId(-1);
    try {
      const people = await services.deletePerson(removeId);
      setData(people);
      getCount(people.length);
      if (people.length === 0) {
        setLoaded(false);
        setLoadedMessage('There are no people');
      }
    } catch (err) {
      console.log('Failed to remove person');
      console.log(err);
    }
  }

  const onNoteClick = (event: any, cellValues: GridCellParams) => {
    event.stopPropagation();
    setNotePerson(cellValues.row as Person);
  }

  const onNoteCancel = () => {
    setNotePerson(null);
  }

  const onNoteConfirm = async (update: Person) => {
    setNotePerson(null);
    try {
      console.log('test');
      console.log(update);
      const person = await services.updatePerson(update);
      console.log(person);
      const index = data.findIndex((p) => p.id === person.id);
      const updatedData = [...data];
      updatedData[index] = person;
      console.log(updatedData);
      setData([...updatedData])
    } catch (err) {
      console.log('Failed to update person');
      console.log(err);
    }
  }

  const onRowUpdate = async (params: GridRowParams) => {
    const update = params.row as Person;
    try {
      const person = await services.updatePerson(update);
      const index = data.findIndex((p) => p.id === person.id);
      const updatedData = [...data];
      updatedData[index] = person;
      setData([...updatedData])
    } catch (err) {
      console.log('Failed to update person');
      console.log(err);
    }
  }

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      minWidth: 160,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params: any) => {
        const valid = (params.props.value as string).length > 0 && (params.props.value as string).length < 50;
        return { ...params.props, error: !valid };
      }
    },
    {
      field: "lastName",
      headerName: "Last Name",
      minWidth: 160,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params: any) => {
        const valid = (params.props.value as string).length > 0 && (params.props.value as string).length < 50;
        return { ...params.props, error: !valid };
      }
    },
    {
      field: "email",
      headerName: "Email",
      miWidth: 250,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params: any) => {
        const valid = (params.props.value as string).length > 0;
        return { ...params.props, error: !valid };
      }
    },
    {
      field: "phone",
      headerName: "Phone Number",
      minWidth: 160,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params: any) => {
        const valid = (params.props.value as string).length > 0;
        return { ...params.props, error: !valid };
      }
    },
    {
      field: "note",
      headerName: "Note",
      miWidth: 250,
      flex: 1,
      editable: true,
    },
    {
      field: "note",
      headerName: "Notes",
      renderCell: (cellValues: GridCellParams) => {
        return (
          <Tooltip title="Read/Edit Note">
            <IconButton
              onClick={(e) => {
                console.log(cellValues);
                onNoteClick(e, cellValues);
              }}
            >
              <CommentIcon />
            </IconButton>
          </Tooltip>
        )
      } 
    },
    {
      field: "remove",
      headerName: "Remove",
      renderCell: (cellValues: GridCellParams) => {
        return (
          <Tooltip title="Remove Person">
            <IconButton
              onClick={(e) => {
                onRemoveClick(e, cellValues);
              }}
            >
              <CancelIcon sx={{ color: red[500] }} />
            </IconButton>
          </Tooltip>
        )
      } 
    }
  ]

  return (
    <div className={styles.PersonList}>
      <Button
        onClick={() => onAddClick()}
      >
        <Typography variant="button">
          Add Person
        </Typography>
      </Button>
      {loaded ? <DataGrid
          autoHeight
          editMode="row"
          rows={data}
          columns={columns}
          disableSelectionOnClick
          onRowEditStop={(params) => onRowUpdate(params)}
        /> : (
          <Typography variant="body1">
            {loadedMessage}
          </Typography>
        )
      }
      <Typography variant="subtitle1">
        Double click a cell to edit.
      </Typography>
      <AddPersonDialog
        open={addPerson}
        onClose={onAddClose}
        onSubmit={onAddConfirm}
      />
      <RemovePersonDialog
        open={removeId >= 0}
        onSubmit={onRemoveConfirm}
        onClose={onRemoveCancel}
      />
      <ViewNoteDialog
          open={notePerson !== null}
          onSubmit={onNoteConfirm}
          onClose={onNoteCancel}
          person={notePerson}
      />
    </div>
  );
};
