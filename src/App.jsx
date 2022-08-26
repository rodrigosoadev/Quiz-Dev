import { useState, useEffect } from 'react'
import './App.css'
import data from './components/data'

import audiencePoll from '../src/assets/audience_poll.png'
import fiftyFifty from '../src/assets/fifty_fifty.png'
import flipQuestion from '../src/assets/flip_the_question.png'
import askExpert from '../src/assets/ask_the_expert.png'

import Quiz from './components/Quiz'
import Timer from './components/Timer'
import Play from './components/Play'


function App() {
  const [username, setUsername] = useState(null)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [stop, setStop] = useState(false)
  const [earned, setEarned] = useState('0')

  const moneyList = [
    { id: 1, amount: "1,000" },
    { id: 2, amount: "2,000" },
    { id: 3, amount: "3,000" },
    { id: 4, amount: "5,000" },
    { id: 5, amount: "10,000" },
    { id: 6, amount: "20,000" },
    { id: 7, amount: "40,000" },
    { id: 8, amount: "80,000" },
    { id: 9, amount: "160,000" },
    { id: 10, amount: "320,000" },
    { id: 11, amount: "640,000" },
    { id: 12, amount: "725,000" },
    { id: 13, amount: "850,000" },
    { id: 14, amount: "900,000" },
    { id: 15, amount: "1M" },
    { id: 16, amount: "1,5M" },
  ].reverse()

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyList.find((money) => money.id === questionNumber - 1).amount)
  }, [moneyList, questionNumber])

  return (
    <div className="app_container">

      {
        username ? <><div className="main">
          {
            stop ? questionNumber - 1 === data.length ? (<div className="winner"><div>🏆Parabéns!</div> Você ganhou: <span className='earned_money'> R${earned}</span></div>) : (<div className="earned">Você ganhou: R${earned}</div>) : (<><div className="top">
              <Timer setStop={setStop} questionNumber={questionNumber} />
            </div>
              <div className="bottom">
                <Quiz data={data} earned={earned} setStop={setStop} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} />
              </div>
            </>)
          }

        </div>
          <div className="price_list">
            <div className="lifelines">
              <div className="lifeline">
                <img src={audiencePoll} alt="Audience Poll" />
              </div>
              <div className="lifeline">
                <img src={fiftyFifty} alt="Fifty Fifty" />
              </div>
              <div className="lifeline">
                <img src={flipQuestion} alt="Flip Question" />
              </div>
              <div className="lifeline">
                <img src={askExpert} alt="Ask the Expert" />
              </div>
            </div>
            <ul className='moneyList'>

              {
                moneyList.map(({ id, amount }) => {
                  return (
                    <>
                      <li key={id} className={questionNumber === id ? 'moneyListItem active' : 'moneyListItem'}>
                        <span className="moneyListItemNumber">{id}</span>
                        <span className="moneyListItemAmount">{amount}</span>
                      </li>
                    </>
                  )
                })
              }
            </ul>
          </div>
        </> : <Play setUsername={setUsername}/>
      }

    </div>
  )
}

export default App
