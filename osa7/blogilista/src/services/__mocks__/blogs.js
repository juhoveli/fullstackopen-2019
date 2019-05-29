

const setToken = newToken => {
  const token = `bearer ${newToken}`
  console.log(token)
}

const blogs = [
  {
    title: 'notablog',
    author: 'grrm',
    url: 'asd',
    likes: 74,
    user: {
      username: 'janne',
      name: 'Janne Jonkeli',
      id: '5ce7b112cc98b1612a04288b'
    },
    id: '5ce843419f880717eceaad68'
  },
  {
    title: 'On a lovely day',
    author: 'Benjen',
    url: '234',
    likes: 2,
    user: {
      username: 'janne',
      name: 'Janne Jonkeli',
      id: '5ce7b112cc98b1612a04288b'
    },
    id: '5ce8ca6fe51ec32002ee36cf'
  },
  {
    title: 'Myname',
    author: 'Naf',
    url: 'wfgf',
    likes: 2,
    user: {
      username: 'nasse',
      name: 'Nasse Naskali',
      id: '5ce7b105cc98b1612a04288a'
    },
    id: '5ce90f099e7b54393daa355f'
  },
  {
    title: 'I am your father',
    author: 'Vader',
    url: 'starwars.com',
    likes: 10,
    user: {
      username: 'janne',
      name: 'Janne Jonkeli',
      id: '5ce7b112cc98b1612a04288b'
    },
    id: '5ce92ea4c213893fed065b54'
  },
  {
    title: 'aa',
    author: 'aa',
    url: 'AA',
    likes: 15,
    user: {
      username: 'nasse',
      name: 'Nasse Naskali',
      id: '5ce7b105cc98b1612a04288a'
    },
    id: '5ce970541bbde74b41bfaaaf'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }