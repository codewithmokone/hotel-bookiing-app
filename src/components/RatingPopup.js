import { Box, Button, Modal, Typography } from '@mui/material';
import CustomButton from './CustomButton';
import React, { useState } from 'react'
import CustomTypography from './CustomTypography';

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #0088a9',
    boxShadow: 24,
    p: 4,
};

function RatingPopup({ onClose, onSubmit, roomId, onOpen }) {

    const [rating, setRating] = useState(0);

    // console.log("Room Id: ", roomId)

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(roomId, rating);
        onClose();
    };

    return (
        <Box className="rating-popup">
            <Modal
                open={onOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <CustomTypography theme="subheading" text="Rate this room" />
                        {/* <Typography id="modal-modal-title" variant="h6" component="h2">Rate this room</Typography> */}
                    </Box>
                    <Box>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={handleRatingChange}
                            style={{ width: 200 }}
                        />
                    </Box>
                    <Box sx={{width:200 ,display:'flex', flexDirection:'row', justifyContent:'space-between',marginTop: 2, marginBottom: 1}}>
                        <Button sx={{ backgroundColor: '#0088a9'}} onClick={handleSubmit} variant="contained" type='submit'>Submit</Button>
                        <Button sx={{ backgroundColor: '#0088a9'}} onClick={onClose} variant="contained" type='submit'>Cancel</Button>
                        {/* <button onClick={handleSubmit}>Submit Rating</button> */}
                        {/* <button onClick={onClose}>Cancel</button> */}
                    </Box>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography> */}
                </Box>
            </Modal>
        </Box>
    )
}

export default RatingPopup
