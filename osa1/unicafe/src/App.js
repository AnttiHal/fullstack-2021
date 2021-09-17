import React, { useState } from 'react'

const Header = ({ text }) => {
  return (<div>
    <h2>{text}</h2>
  </div>
  )
}

const Statistics = ({ good, neutral, bad, allClicks }) => {
  if (allClicks === 0) {
    return (<div>
      <p>No feedback given</p>

    </div>
    )

  } return (


    <table>
      <tbody>
        <tr>
          <StatisticsLine text='Good' value={good} text2='' />
        </tr>
        <tr>
          <StatisticsLine text='Good' value={good} text2='' />
        </tr>
        <tr>
          <StatisticsLine text='Neutral' value={neutral} text2='' />
        </tr>
        <tr>
          <StatisticsLine text='Bad' value={bad} text2='' />
        </tr>
        <tr>
          <StatisticsLine text='All' value={allClicks} text2='' />
        </tr>
        <tr>
          <StatisticsLine text='Average' value={(good - bad) / allClicks} text2='' />
        </tr>
        <tr>
          <StatisticsLine text='Positive' value={(good / allClicks) * 100} text2='%' />
        </tr>
      </tbody>
    </table>



  )
}

const StatisticsLine = ({ text, value, text2 }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
      <td>{text2}</td>
    </>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)


  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setGood(good + 1)

  }

  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <Header text='Give feedback' />

        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
        <Header text='Statistics' />
        <Statistics good={good} bad={bad} neutral={neutral} allClicks={allClicks} />


      </div>
    </div>
  )

}
export default App