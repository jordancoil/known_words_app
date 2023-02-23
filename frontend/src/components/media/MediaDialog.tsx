import { Row, Col, Modal, Spinner } from "react-bootstrap";
import * as SubtitleApi from '../../network/subtitle_api';
import { useEffect, useState } from "react";
import { Media as MediaModel } from "../../models/media"; 
import Media from "../media/Media";
import { Subtitle } from "../../models/subtitle";

interface MediaDialogProps {
    media: MediaModel,
    onDismiss: () => void,
}

const MediaDialog = ({media, onDismiss}: MediaDialogProps) => {
    const [subs, setSubs] = useState<Subtitle[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoadingError, setShowLoadingError] = useState(false);

    useEffect(() => {
        async function loadSubtitles() {
            try {
                setShowLoadingError(false);
                setLoading(true);
                const subtitles = await SubtitleApi.fetchSubtitlesForMedia(media._id);
                setSubs(subtitles);
            } catch (error) {
                console.log(error);
                setShowLoadingError(true);
            } finally {
                setLoading(false);
            }
        }
        loadSubtitles();
    }, []);

    const subtitleList =
        <Row xs={1} md={1} lg={1} className={`g-4`}>
            {subs.map(line => (
                <Col key={line._id}>
                    test
                </Col>
            ))}
        </Row>

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {media?.title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <>
                {loading && <Spinner animation='border' variant='primary' />}
                {showLoadingError && <p>Something went wrong. Please refresh the page.</p>}
                {!loading && !showLoadingError &&
                    <>
                        {subs.length > 0 ? subtitleList :
                            <p>No Media.</p>}
                    </>
                }
                </>
            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>
        </Modal>
     );
}
 
export default MediaDialog;