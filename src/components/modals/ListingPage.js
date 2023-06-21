import React, { useState } from 'react';
import Modal from 'react-modal';
import SearchBar from '../common/SearchBar';
import './ListingPage.css'

// Make sure to set the app element for accessibility
Modal.setAppElement('#root');

function VendorListingPage() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>

     
      

      {/* Modal component */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} shouldCloseOnOverlayClick={false} className="modal-popup">
        <h2>Search for a Location</h2>
        
        <SearchBar/>
      </Modal>
    </div>
  );
}

export default VendorListingPage;