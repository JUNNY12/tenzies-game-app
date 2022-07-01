import React from 'react'
import "./App.css"
import Die from './Die'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'


export const db = new Dexie("scoreDatabase");
db.version(2).stores({
    scores:"++id, playerScore"
});

const {scores} = db

const App = () => {

  // Adding Score to db
  const addScore = async () => {
    await scores.add({
      playerScore:countRoll,
    })
  }
  const playerScores = useLiveQuery(() => scores.toArray())
  const scoreItem = playerScores?.map((k, id) => {
    return <li key={id}>{k.playerScore} </li>
  })

// Game States
  const [diceEl, setDice] = useState(AllNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [countRoll, setCountRoll]= useState(0)
  const [display, setDisplay] = useState(false)
  const [date, setDate] = useState(new Date())

// Funtion to show Score
  const showScore = () => {
      setDisplay(prevData => !prevData)
  }

  const showDate = () => {
    setDate()
  }
  



// Checking if all dice holds thesame Value
  useEffect(() =>{
    const allHeldDice = diceEl.every(die => die.isHeld)
    const firstValue = diceEl[0].value
    const sameValue = diceEl.every(die => die.value === firstValue)

    if(allHeldDice && sameValue){
      setTenzies(true)
      addScore()
      showDate()
    }
  }, [diceEl])


// Function to generate random number from 1 to 6
  function generateNewDie() {
    return{
        value:Math.ceil(Math.random() * 6),
        isHeld:false,
        id:nanoid()
    }
  }

// Function to loop through the random numbers generatec 10 times

    function AllNewDice() {
      const newDice = []
      for(let i=0 ; i < 10; i++){
        newDice.push(
          generateNewDie()
        )
    }
    return newDice
  }

  // Function to load the generated number to the dice container

  const diceElement = diceEl.map((die) => 
  <Die 
  value = {die.value}
  key={die.id}
  isHeld = {die.isHeld}
  holdDice ={() => holdDice(die.id)}
  /> )

  // Function to roll dice and aslo keep value of the held dice

  const rollDice = () => {

   if(!tenzies){
    setDice(oldDie => oldDie.map(die => {
      return die.isHeld? 
      die:
      generateNewDie()
    }))
    
    setCountRoll(prevCount => prevCount + 1 )
    
   }
   else{
     setTenzies(false)
     setDice(AllNewDice())
   }
  }

// Function to hold the dice being clicked

  const holdDice = (id) => {

    setDice(oldDie => oldDie.map(die =>{
      return die.id === id?
      {...die, isHeld:!die.isHeld} : 
      die
    }))
  }


  return (
    <div className='App'>
      
      {tenzies && <h1 className='won'>You Won the game with {countRoll} Roll of the Dice !!!</h1>}

        <main className='Main'>
          {tenzies && <Confetti />}
          <h1 className='header'>Tenzies</h1>

          <p className='para'>Roll until all dice are thesame. Click each die to freeze it at its current position.</p>
           <div className='diceContainer'>
              {diceElement}
            </div>

            <div>
              <button className='btnRoll'
               onClick={rollDice}

               >{tenzies? "Start New Game" :"Roll Dice"}</button>
            </div>
        </main>

       <div>
       <div>
            <button className="view" onClick={showScore}>View Score</button>
        </div> 

      <div className={display? "scores" : "hide scores"}>
        <h3>Your Score</h3>
        <div>
          <p>{!playerScores?.length && "You don't Have any score yet"}</p>
          <div>{scoreItem}</div>
        </div>
      </div>
       </div>
    </div>
  )
}

export default App