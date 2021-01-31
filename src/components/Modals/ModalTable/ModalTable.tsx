import React, { useState } from 'react';
import { Input, Checkbox, Select } from 'antd';
import { ITableFilter } from '../../../interfaces/filter';
import { Modal } from '../Modal';

const { Option } = Select;

interface IModalTableProps {
  showModal: boolean;
  hideModal: () => void;
  filter: ITableFilter;
  callbackFilter: (filter: ITableFilter) => void;
}

const ModalTable = ({ showModal, hideModal, filter, callbackFilter }: IModalTableProps) => {
  const [state, setState] = useState<ITableFilter>(filter);

  const handleSubmitForm = (): any => {
    hideModal();
    callbackFilter(state);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState((prev) => ({ ...prev, input: value }));
  };

  const onChangeCheckbox = () => {
    setState((prev) => ({ ...prev, checkbox: !prev.checkbox }));
  };

  const handleChangeSelect = (value: string) => {
    setState((prev) => ({ ...prev, select: value }));
  };

  return (
    <Modal isOpen={showModal} onHideModal={hideModal} onSubmitForm={handleSubmitForm}>
      <div>
        <Input placeholder="Filter by name" value={state.input} onChange={handleChangeInput} />
      </div>
      <div>
        <Checkbox onChange={onChangeCheckbox} checked={state.checkbox}>
          Hide birthday column
        </Checkbox>
      </div>
      <div>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChangeSelect} value={state.select}>
          <Option value="" disabled>
            Choose filter
          </Option>
          <Option value="height">filter Height</Option>
          <Option value="eye_color">filter Eye color</Option>
          <Option value="birth_year">filter Birth year</Option>
        </Select>
      </div>
    </Modal>
  );
};

export { ModalTable };
