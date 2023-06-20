import { range } from '@douglasneuroinformatics/utils';
import type { Meta, StoryObj } from '@storybook/react';

import { Table, TableColumn } from './Table';


type User = {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
};

const columns: TableColumn<User>[] = [
  {
    name: 'First Name',
    field: 'firstName'
  },
  {
    name: 'Last Name',
    field: 'lastName'
  },
  {
    name: 'Gender',
    field: 'gender'
  }
];

const data: User[] = range(25).map(() => ({
  firstName: 'Bob',
  lastName: 'Smith',
  gender: 'male'
}));

export default { component: Table } as Meta<typeof Table>;

export const Default: StoryObj<typeof Table<User>> = {
  args: {
    columns,
    data
  }
};
