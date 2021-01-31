import React from 'react';
import { Modal as AntModal } from 'antd';

interface IModalProps {
  isOpen: boolean;
  onHideModal: () => void;
  onSubmitForm: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isOpen, onHideModal, onSubmitForm, children }: IModalProps) => {
  const handleOk = () => onSubmitForm();
  const handleCancel = () => onHideModal();

  return (
    <>
      <AntModal title="Basic Modal" visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </AntModal>
    </>
  );
};

export { Modal };
