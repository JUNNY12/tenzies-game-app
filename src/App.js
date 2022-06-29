import React from 'react'
import "./App.css"
import Die from './Die'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


const App = () => {

  

  const [diceEl, setDice] = useState(AllNewDice())
  const [tenzies, setTenzies] = useState(false)


  useEffect(() =>{
    const allHeldDice = diceEl.every(die => die.isHeld)
    const firstValue = diceEl[0].value
    const sameValue = diceEl.every(die => die.value === firstValue)

    if(allHeldDice && sameValue){
      setTenzies(true)
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
        <main className='Main'>
          {tenzies && <Confetti />}
          {tenzies && <p className='won'>You Won!!!</p>}
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
    </div>
  )
}

export default App