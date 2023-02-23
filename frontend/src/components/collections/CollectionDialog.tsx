import { Row, Col, Modal, Spinner } from "react-bootstrap";
import { Collection } from "../../models/collections";
import * as MediaApi from '../../network/media_api';
import { useEffect, useState } from "react";
import { Media as MediaModel } from "../../models/media"; 
import Media from "../media/Media";
import MediaDialog from "../media/MediaDialog";

interface CollectionDialogProps {
    collection: Collection,
    onDismiss: () => void,
}

const CollectionDialog = ({collection, onDismiss}: CollectionDialogProps) => {
    const [media, setMedia] = useState<MediaModel[]>([]);
    const [mediaLoading, setMediaLoading] = useState(true);
    const [showMediaLoadingError, setShowMediaLoadingError] = useState(false);

    const [mediaToView, setMediaToView] = useState<MediaModel | null>(null);

    useEffect(() => {
        async function loadMedia() {
            try {
                setShowMediaLoadingError(false);
                setMediaLoading(true);
                const media = await MediaApi.fetchAllMediaForCollection(collection._id);
                setMedia(media);
            } catch (error) {
                console.log(error);
                setShowMediaLoadingError(true);
            } finally {
                setMediaLoading(false);
            }
        }
        loadMedia();
    }, []);

    const mediaList =
        <Row xs={1} md={1} lg={1} className={`g-4`}>
            {media.map(m => (
                <Col key={m._id}>
                    <Media 
                        media={m}
                        onMediaClicked={setMediaToView}/>
                    
                        
                </Col>
            ))}
        </Row>

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {collection?.title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <>
                {mediaLoading && <Spinner animation='border' variant='primary' />}
                {showMediaLoadingError && <p>Something went wrong. Please refresh the page.</p>}
                {!mediaLoading && !showMediaLoadingError &&
                    <>
                        {media.length > 0 ? mediaList :
                            <p>No Media.</p>}
                    </>
                }
                {mediaToView &&
                    <MediaDialog
                        media={mediaToView}
                        onDismiss={() => setMediaToView(null)}
                    />
                }
                </>
            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>
        </Modal>
     );
}
 
export default CollectionDialog;