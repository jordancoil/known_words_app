import styles from "../styles/Note.module.css"; // UPDATE
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Media as MediaModel } from "../models/media"; 
// import { formatDate } from "../utils/formatDate";
// import { MdDelete } from 'react-icons/md';

interface MediaProps {
    media: MediaModel,
    // onNoteClicked: (note: NoteModel) => void,
    // onDeleteNoteClicked: (note: NoteModel) => void,
    // className?: string,
}

// const Media = ({ note, onNoteClicked, onDeleteNoteClicked, className }: MediaProps) => {
const Media = ({ media }: MediaProps) => {
    const {
        title,
        description,
        subtitleFile,
        imgFile,
        createdAt,
        updatedAt
    } = media;

    // // TODO: Move to UseEffect or UseMemo
    // // Currently this is executed on each render.
    // let createdUpdatedText: string;
    // if (updatedAt > createdAt) {
    //     createdUpdatedText = "Updated: " + formatDate(updatedAt);
    // } else {
    //     createdUpdatedText = "Created: " + formatDate(createdAt);
    // }

    return (
        <Card className={`${styles.noteCard}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Media;