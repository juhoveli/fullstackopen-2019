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

  module.exports = {
    dummy,
    totalLikes
  }

