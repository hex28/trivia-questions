import React, {Component} from 'react';
import * as engine from './engine';
import {decodeEntities} from './utils';

class Trivia extends Component {

  state = {
    trivia: [],
    input: '',
    text: null,
    useTimer: "false",
    timer: 60,
  }

  componentWillMount(){
    this.loadTriviaQuestions()
  }

  loadTriviaQuestions = () => {
    let triviaQuestions = []
    engine.init((data)=>{
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].question.indexOf('Which') === -1){
          triviaQuestions.push({q: data.results[i].question, a: decodeEntities(data.results[i].correct_answer)})
        }
      }
      this.setState({
        trivia: triviaQuestions
      })
    })
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    }, ()=>{
      if (this.state.useTimer === 'true'){
        this.startTimer()
      } else {
        clearInterval(this.timer)
        this.setState({
          timer: 60
        })
      }
    })
  }

  startTimer = () => {
    this.timer = setInterval(this.handleTimer, 1000)
  }

  handleTimer = () => {
    this.setState({
      timer: --this.state.timer,
    }, ()=>{
      if (this.state.timer === 0){
        this.reset()
      }
    })
  }

  handleSubmit = (e) =>{
    const {trivia, input} = this.state
    let inputText = input.toLowerCase().split(' ').join('')
    let triviaText = trivia[trivia.length - 1].a.toLowerCase().split(' ').join('')
    if (inputText === triviaText){
      this.props.handleScore(1)
      this.setState({
        text: true
      }, this.reset)
    } else {
      this.setState({
        text: false
      }, this.reset)
    }
  }

  reset = () => {
    const {trivia} = this.state
    setTimeout(()=>{
      trivia.pop()
      this.setState({
        trivia: trivia,
        input:'',
        text: null,
        timer: 60,
      }, ()=>{
        if (trivia.length < 1){
          this.loadTriviaQuestions()
        }
      })
    }, 1000)
  }

  render () {
    const {trivia, text, useTimer, timer} = this.state
    let index, q, a;
    if (trivia.length > 0){
      index = trivia.length - 1
      q = trivia[index].q
    }

    return (
      <div class="w-1/2 margin-center text-center">
        <div class="margin-center rounded overflow-hidden shadow-lg mt-2">
          <div class="px-6 py-4">
            <div class="font-bold text-4xl mb-2">
              <div class="margin-center">
                <form className="flex flex-1 flex-col text-base">
                  <div className="flex flex-1 self-end">
                    <div className="radio mr-2">
                      <label>
                        <input type="radio" name="useTimer" value={"true"} onChange={this.handleChange} checked={this.state.useTimer === "true"}  />
                        <span className="ml-1">Use Timer</span>
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input type="radio" name="useTimer" value={"false"} onChange={this.handleChange} checked={this.state.useTimer === "false"} />
                        <span className="ml-1">Remove Timer</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>

            </div>
            <div class="font-bold text-4xl mb-2">{'Trivia Questions!'}</div>
            {
              q !== undefined &&
              <div class="text-2xl mb-4">
                {decodeEntities(q)}
              </div>
            }
            {
              useTimer === 'true' &&
              <div className={timer < 10 ? "text-3xl text-red-700 mb-2" : "text-3xl mb-2"}>
                {'Timer: ' + timer}
              </div>
            }
            <div class="flex w-3/5 margin-center mb-6">
              <input
                class="w-4/5 shadow appearance-none border border-red-500 rounded w-full h-10 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mr-2"
                id="input"
                name="input"
                type="text"
                value={this.state.input}
                onChange={this.handleChange}
              />
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 h-10 rounded" onClick={this.handleSubmit}>
                Submit
              </button>
             </div>
             {
               text !== null &&
               <div className={text ? "text-4xl text-green-500" : "text-4xl text-red-700"}>
                 {text ? "Correct!" : "Wrong!"}
               </div>
             }
          </div>
        </div>
      </div>
    )
  }
};

export default Trivia;
