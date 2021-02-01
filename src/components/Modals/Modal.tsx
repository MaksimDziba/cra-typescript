import React from 'react';
import { Modal as AntModal } from 'antd';

interface IModalProps {
  isOpen: boolean;
  onHideModal: () => void;
  onSubmitForm: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode[]; 
}

const Modal = ({ isOpen, onHideModal, onSubmitForm, children, footer }: IModalProps) => {
  const handleOk = () => onSubmitForm();
  const handleCancel = () => onHideModal();

  return (
    <>
      <AntModal title="Basic Modal" visible={isOpen} onOk={handleOk} onCancel={handleCancel} footer={footer}>
        {children}
      </AntModal>
    </>
  );
};

export { Modal };
