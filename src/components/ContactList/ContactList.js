import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 400,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ContactList({ contacts, onDelete }) {
    const classes = useStyles();

    return (
        <div >
            <div className={classes.root}>
                <div >
                    <List>
                        {contacts.map(({ id, name, number }) => {
                            return (
                                <ListItem key={id}>
                                    <ListItemText primary={name} secondary={number} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="start"
                                            aria-label="delete"
                                            onClick={() => onDelete(id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </div>
        </div>
    );
}