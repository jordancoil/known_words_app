import styles from "../../styles/Collection.module.css";
import styleUtils from "../../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Collection as CollectionModel } from "../../models/collections"; 

interface CollectionProps {
    collection: CollectionModel,
    onCollectionClicked: (collection: CollectionModel) => void,
    className?: string,
}

const Collection = ({ collection, onCollectionClicked, className }: CollectionProps) => {
    const {
        title,
        description,
        imgFile,
    } = collection;

    return (
        <Card 
            className={`${styles.collectionCard}`}
            onClick={() => onCollectionClicked(collection)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {description}
                </Card.Text>
                <Card.Img src={`/images/${imgFile}`} />
            </Card.Body>
        </Card>
    );
};

export default Collection;