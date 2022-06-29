import React from 'react'

const Die = (props) => {

  const styles = {
    backgroundColor:props.isHeld? "#59E392" :"#ffff"
  }
  return (
    <div className='diceFace'
     style={styles} 
     onClick={props.holdDice}>
      <h1 className='dieNum'>{props.value}</h1>
    </div>
  )
}

export default Die