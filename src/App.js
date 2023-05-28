import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import sound1 from "./sounds/mixkit-game-ball-tap-2073.wav";
import sound2 from "./sounds/win.wav";
import sound3 from "./sounds/lose.wav";
import sound4 from "./sounds/draw.wav";
import Rock from './images/Rock.jpg'
import Paper from './images/Paper.png'
import Scissor from './images/scissors.png'
import User from './images/user.jpg'
import Computer from './images/23_10_2020_17_38_04_3127622.jpg'

export default function App() {
  let array = ["Rock", "Paper", "Scissor"];
  let clickSound = new Audio(sound1);
  let winSound = new Audio(sound2);
  let loseSound = new Audio(sound3);
  let drawSound = new Audio(sound4);
  let images = {
    Rock,
    Paper,
    Scissor
  };
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [userImage, setuserImage] = useState(User);
  const [computerImage, setComputerImage] = useState(Computer);
  const choiceHandler = (value) => {
    clickSound.play();
    let item = Math.floor(Math.random() * array.length);
    let user = value;
    let computer = array[item];
    setuserImage(images[value]);
    setComputerImage(images[computer]);
    handleResult(user, computer);
  };
  const handleResult = (user, computer) => {
    if (computer === user) {
      setUserScore((prev) => prev + 1);
      setComputerScore((prev) => prev + 1);
    } else if (
      (user === "Scissor" && computer === "Paper") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Rock" && computer === "Scissor")
    ) {
      setUserScore((prev) => prev + 2);
    } else {
      setComputerScore((prev) => prev + 2);
    }
  };
  const checkResult = () => {
    if (computerScore >= 10 && userScore >= 10) {
      Swal.fire({
        icon: "success",
        title: "Practice More...",
        text: "Match Draw..",
      });
      drawSound.play();
      setUserScore(0);
      setComputerScore(0);
    } else if (computerScore >= 10) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Lose",
      });
      loseSound.play();
      setUserScore(0);
      setComputerScore(0);
    } else if (userScore >= 10) {
      Swal.fire({
        icon: "success",
        title: "Congratulation...",
        text: "You Won",
      });
      winSound.play();
      setUserScore(0);
      setComputerScore(0);
    }
  };
  useEffect(() => {
    checkResult();
  }, [userScore, computerScore]);
  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={6}>
            <div className="play-box d-flex flex-column align-items-center p-5">
              <h3>You</h3>
              <img src={userImage} width={500} height={500} alt="" />
              <h5 className="mt-3">Score:{userScore}</h5>
            </div>
          </Col>
          <Col md={6}>
            <div className="play-box d-flex flex-column align-items-center p-5">
              <h3>Computer</h3>
              <img src={computerImage} width={500} height={500} alt="" />
              <h5 className="mt-3">Score:{computerScore}</h5>
            </div>
          </Col>
        </Row>
        <Container className="w-50">
          <Row>
            <Col md={4}>
              <Button className="w-100 " onClick={() => choiceHandler("Rock")}>
                Rock
              </Button>
            </Col>
            <Col md={4}>
              <Button className="w-100 " onClick={() => choiceHandler("Paper")}>
                Paper
              </Button>
            </Col>
            <Col md={4}>
              <Button
                className="w-100 "
                onClick={() => choiceHandler("Scissor")}
              >
                Scissor
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
