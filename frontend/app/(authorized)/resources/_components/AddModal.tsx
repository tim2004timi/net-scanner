'use client';

import { Plus } from '@/components/icons';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { useState } from 'react';
import TextArea from '@/components/ui/TextArea';
import Checkbox from '@/components/ui/Checkbox';
import Selector from '@/components/ui/Selector';
import addAsset from '@/actions/addAsset';

function AddModal() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative'>
      <Button
        onClick={() => setIsVisible(true)}
        className='flex items-center gap-3 px-4 py-2 leading-5'
      >
        <span>Добавить</span>
        <Plus size={20} />
      </Button>
      <Modal
        action={addAsset}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        label='Добавить адрес'
        subLabel='Добавьте домен, IP или CDR для начала сканирования'
        onSuccess={() => setIsVisible(false)}
        buttonLabel='Начать обнаружение'
      >
        <div className='flex w-full flex-col gap-4'>
          <Input
            wrapperClassName='w-full'
            name='groupName'
            title='Название группы'
            placeholder='Название группы'
          />
          <TextArea
            wrapperClassName='w-full'
            title='Список элементов для сканирования'
            name='resourceList'
            placeholder={`Введите список доменов или диапазон IP адресов ${'\n\n'}scannerbox.ru${'\n'}192.168.1.1${'\n'}192.168.2.0/24 `}
          />
          <Selector name='times' />
          <Checkbox name='tgAlerts' className='gap-3'>
            <span className='leading-5'>Уведомить в телеграм</span>
          </Checkbox>
        </div>
      </Modal>
    </div>
  );
}

export default AddModal;
