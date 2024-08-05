const code = [
    {
        id: 1,
        letter: 'I',
        color: '#ec6d00',
        name: 'Indira'
    },
    {
        id: 2,
        letter: 'Z',
        color: '#326a1b',
        name: 'Zarina'
    },
    {
        id: 3,
        letter: 'B',
        color: '#586bbc',
        name: 'Bibin B',

    },
    {
        id: 4,
        letter: 'A',
        color: '#7920a0',
        name: 'Aishwarya'
    },
    {
        id: 5,
        letter: 'S',
        color: '#0088CF',
        name: 'Suresh'
    },
    {
        id: 6,
        letter: 'G',
        color: '#76909A',
        name: 'Ganesh'
    },
    {
        id: 7,
        letter: 'L',
        color: '#BD3706',
        name: 'Lakshmi'
    },
    {
        id: 8,
        letter: 'X',
        color: '#005799',
        name: 'Xavier'
    },
    {
        id: 9,
        letter: 'P',
        color: '#AA48BB',
        name: 'Pooja'
    },
    {
        id: 0,
        letter: 'O',
        color: '#8A6F61',
        name: 'Omana G'
    }
]

export const generateCode = (num) => {
    return code[num - 1]
}
