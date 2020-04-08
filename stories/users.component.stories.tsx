import React from 'react'
import UserContainer from '../src/containers/user.container';
import GenerateData from './generateData'
import { ITableColumn } from '../src/components/table/type'

const constSchema = {
    id: 'id',
    name: 'name',
    cardNumber: 'cardNumber',
    cardType: 'cardType',
}
const initialSchema = {
    [constSchema.id]: 0,
    [constSchema.name]: '',
    [constSchema.cardNumber]: '',
    [constSchema.cardType]: '',
}
const generateData = new GenerateData(initialSchema)
const data = generateData.dataEXST()
const columns: ITableColumn[] = [
    {
        label: 'id',
        key: 'id'
    },
    {
        label: 'name',
        key: 'name',
    },
    {
        label: 'address',
        key: 'address',

    },
    {
        label: 'phone',
        key: 'phone',
    },
    {
        label: 'birthday',
        key: 'birthday',
    }
]

export const Users = () => {
    return (
        <UserContainer 
            users ={data}
        />
    )
}

export default { title: 'Container/Users' }

