const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
  }

  const favouriteBlog = (blogs) => {
    const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return max;
  }

  const mostBlogs = (blogs) => {
    let uniqueAuthors = []
    let mostBlogsIndex = 0;
    
    for (let i =0;i<blogs.length;i++) {
        if (!(uniqueAuthors.includes(blogs[i].author))) {  
          uniqueAuthors.push(blogs[i].author)
          
      }    
    }

    let uniqueAuthorsblogCount = new Array(uniqueAuthors.length).fill(0)
    console.log('count '+ uniqueAuthorsblogCount)


    for (let i =0;i<uniqueAuthors.length;i++) {
        for (let j=0;j<blogs.length;j++) {
          if (uniqueAuthors[i]===blogs[j].author) {
            uniqueAuthorsblogCount[i] +=1
          }
          if (uniqueAuthorsblogCount[i]>uniqueAuthorsblogCount[mostBlogsIndex]) {
            mostBlogsIndex = i
          }
        }
           
    }
    
    let obj = {
        author: uniqueAuthors[mostBlogsIndex],
        blogs: uniqueAuthorsblogCount[mostBlogsIndex]
    }
    return obj;
  }

  const mostLikes = (blogs) => {
    let uniqueAuthors = []
    let mostLikesIndex = 0;
    
    for (let i =0;i<blogs.length;i++) {
        if (!(uniqueAuthors.includes(blogs[i].author))) {  
          uniqueAuthors.push(blogs[i].author)
          
      }    
    }

    let uniqueAuthorsLikeCount = new Array(uniqueAuthors.length).fill(0)
    console.log('count '+ uniqueAuthorsLikeCount)


    for (let i =0;i<uniqueAuthors.length;i++) {
        for (let j=0;j<blogs.length;j++) {
          if (uniqueAuthors[i]===blogs[j].author) {
            uniqueAuthorsLikeCount[i] += blogs[j].likes
          }
          if (uniqueAuthorsLikeCount[i]>uniqueAuthorsLikeCount[mostLikesIndex]) {
            mostLikesIndex = i
          }
        }
           
    }
    
    let obj = {
        author: uniqueAuthors[mostLikesIndex],
        likes: uniqueAuthorsLikeCount[mostLikesIndex]
    }
    return obj;
  }

  
  module.exports = {
    dummy,
    totalLikes, favouriteBlog, mostBlogs, mostLikes
  }