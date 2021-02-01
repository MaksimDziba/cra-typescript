import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Select, Button } from 'antd';
import { ITableFilter } from '../../../interfaces/filter';
import { Modal } from '../Modal';

import styles from './ModalTable.module.scss';

import StarService from '../../../api';

const { Option } = Select;

interface IModalTableProps {
  showModal: boolean;
  hideModal: () => void;
  filter: ITableFilter;
  callbackFilter: (filter: ITableFilter) => void;
}

const ModalTable = ({ showModal, hideModal, filter, callbackFilter }: IModalTableProps) => {
  const [state, setState] = useState<ITableFilter>(filter);
  const [searchPeople, setSearchPeople] = useState<number | null>(null);
  const handleSubmitForm = (): void => {
    if (state.isChange) callbackFilter(state);
    hideModal();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setState((prev) => ({ ...prev, input: value, isChange: true }));
  };

  const onChangeCheckbox = (): void => {
    setState((prev) => ({ ...prev, checkbox: !prev.checkbox, isChange: true }));
  };

  const handleChangeSelect = (value: string): void => {
    setState((prev) => ({ ...prev, select: value, isChange: true }));
  };

  useEffect(() => {
    const getCountSearchPeople = async (query: string) => {
      const data = await StarService.getSearch(query);
      setSearchPeople(data.count);
    };
    // for input search
    let debounce: any;
    if (debounce) clearTimeout(debounce);

    if (state.input !== '') {
      debounce = setTimeout(() => getCountSearchPeople(state.input), 800);
    } else {
      setSearchPeople(null);
    }
  }, [state]);

  return (
    <Modal
      isOpen={showModal}
      onHideModal={hideModal}
      onSubmitForm={handleSubmitForm}
      footer={[
        <Button
          key="submit"
          type={searchPeople !== null ? 'primary' : 'default'}
          style={{ display: searchPeople === null ? 'none' : 'block' }}
          onClick={handleSubmitForm}
        >
          {`Отобразить ${searchPeople} записей`}
        </Button>,
        <Button key="back" onClick={handleSubmitForm} type="default">
          Закрыть
        </Button>,
      ]}
    >
      <div className={styles.modalContent}>
        <div>
          <Input placeholder="Поиск персонажа" value={state.input} onChange={handleChangeInput} />
        </div>
        <div>
          <Checkbox onChange={onChangeCheckbox} checked={state.checkbox}>
            Скрыть день рождение
          </Checkbox>
        </div>
        <div>
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChangeSelect} value={state.select}>
            <Option value="" disabled>
              Сортировать
            </Option>
            <Option value="height">по росту</Option>
            <Option value="eye_color">по цвету глаз</Option>
            <Option value="birth_year">по дню рождения</Option>
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export { ModalTable };
