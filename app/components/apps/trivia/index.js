import React, {Component} from 'react';
import Trivia from './trivia';

const Score = ({score}) => {
    return (
      <div className="fixed" style={{top:'25px', right: '25px'}}>
        <div class="rounded overflow-hidden shadow-lg mt-2">
          <div class="px-4 py-1">
            <div class="font-bold text-xl">{`Score: ${score}`}</div>
          </div>
        </div>
      </div>
    );
};

class TriviaConstructor extends Component{

  state = {
    score: 0,
  }

  handleScore = (num) => {
    let currScore = this.state.score + num;
    this.setState({
      score: currScore
    })
  }

  render () {

    return (
      <div class="flex-1 pl-16 pr-16">
        <div>
          <Score score={this.state.score} />
        </div>
        <div className="mt-8">
          <Trivia handleScore={this.handleScore} />
        </div>
      </div>
    )
  }

};

export default TriviaConstructor;
