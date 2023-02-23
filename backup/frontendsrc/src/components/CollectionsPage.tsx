import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Collection as CollectionModel } from '../models/collections';
import * as CollectionsApi from '../network/collections_api';
import styles from '../styles/CollectionsPage.module.css';
import styleUtils from '../styles/utils.module.css';
// import AddEditCollectionDialog from "./AddEditCollectionDialog";
import Collection from "./Collection";

const CollectionsPageLoggedInView = () => {
    const [collections, setCollections] = useState<CollectionModel[]>([]);
    const [collectionsLoading, setCollectionsLoading] = useState(true);
    const [showCollectionsLoadingError, setShowCollectionsLoadingError] = useState(false);

    const [showAddCollectionDialog, setShowAddCollectionDialog] = useState(false);
    const [collectionToEdit, setCollectionToEdit] = useState<CollectionModel | null>(null);

    useEffect(() => {
        async function loadCollections() {
            try {
                setShowCollectionsLoadingError(false);
                setCollectionsLoading(true);
                const collections = await CollectionsApi.fetchCollections();
                setCollections(collections);
            } catch (error) {
                console.log(error);
                setShowCollectionsLoadingError(true);
            } finally {
                setCollectionsLoading(false);
            }
        }
        loadCollections();
    }, []);

    const collectionsGrid =
        <Row xs={1} md={2} lg={3} className={`g-4 ${styles.collectionsGrid}`}>
            {collections.map(collection => (
                <Col key={collection._id}>
                    <Collection
                        collection={collection}
                        className={styles.collection}
                        onCollectionClicked={setCollectionToEdit}/>
                </Col>
            ))}
        </Row>

    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddCollectionDialog(true)}>
                <FaPlus />
                Add new collection
            </Button>
            {collectionsLoading && <Spinner animation='border' variant='primary' />}
            {showCollectionsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!collectionsLoading && !showCollectionsLoadingError &&
                <>
                    {collections.length > 0 ? collectionsGrid :
                        <p>No collections.</p>}
                </>
            }
        </>
    );
}

export default CollectionsPageLoggedInView;