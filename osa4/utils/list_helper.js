const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    const reducer = (acc, cv) => {
        return acc + cv
    }
    const blogLikes = blogs.map(b => b.likes)
    return blogs.length === 0
    ? 0
    : blogLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return undefined
    if (blogs.length === 1) return blogs[0]
    
    const most = Math.max.apply(Math, blogs.map(b => b.likes))
    return blogs.find(b => b.likes === most)
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

