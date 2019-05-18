import React from 'react'

const Header = ({course}) => {
    return (
        <h2>{course}</h2>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({parts}) => {
  const total = parts.reduce((s, p) => s += p.exercises, 0)

    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const Course = ({course}) => {
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts}/>
          <Total parts={course.parts} />
        </div>
    )
}

export default Course     