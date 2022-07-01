import { useState } from "react"

const Score = (props) => {
    console.log(props.k.playerScore)

    const[display, setDisplay] = useState(false)

    const showScore = () => {
        setDisplay(prevData => !prevData)
    }


  return (
    <div className="scoreContainer">
        {/* <div>
            <button className="view" onClick={showScore}>View Score</button>
        </div> */}

        <div className="container">
            <h4>Your Scores</h4>
            <ul className="list">
                {/* {props.k.playerScore} */}
            </ul>
        </div>
    </div>
  )
}

export default Score