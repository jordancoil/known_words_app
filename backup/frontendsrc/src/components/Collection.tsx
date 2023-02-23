import styles from "../styles/Collection.module.css"; // UPDATE
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Collection as CollectionModel } from "../models/collections"; 
// import { formatDate } from "../utils/formatDate";
// import { MdDelete } from 'react-icons/md';

interface CollectionProps {
    collection: CollectionModel,
    onCollectionClicked: (collection: CollectionModel) => void,
    // onDeleteNoteClicked: (collection: NoteModel) => void,
    className?: string,
}

// const Collection = ({ collection, onNoteClicked, onDeleteNoteClicked, className }: CollectionProps) => {
const Collection = ({ collection, onCollectionClicked, className }: CollectionProps) => {
    const {
        title,
        description,
        media,
        imgFile,
        createdAt,
        updatedAt
    } = collection;

    // // TODO: Move to UseEffect or UseMemo
    // // Currently this is executed on each render.
    // let createdUpdatedText: string;
    // if (updatedAt > createdAt) {
    //     createdUpdatedText = "Updated: " + formatDate(updatedAt);
    // } else {
    //     createdUpdatedText = "Created: " + formatDate(createdAt);
    // }

    return (
        <Card className={`${styles.collectionCard}`}>
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

export default Collection;