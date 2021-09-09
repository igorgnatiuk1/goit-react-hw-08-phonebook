import TextField from '@material-ui/core/TextField';



export default function Filter({ filterValue, onChange }) {
    return (
        <div >
            <TextField
                id="text"
                label="Find Contact..."
                type="text"
                value={filterValue}
                onChange={onChange}
                variant="filled"
            />
        </div>
    );
}