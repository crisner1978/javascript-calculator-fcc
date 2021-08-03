import "./App.css";
import React from "react";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+"];
const ids = {
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add",
};

class App extends React.Component {
  state = {
    lastPressed: undefined,
    memory: "0",
    operation: undefined,
  };

  handleClick = (e) => {
    const { memory, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText) {
      case "AC": {
        this.setState({
          memory: "0",
        });
        break;
      }
      case "=": {
        const evaluate = eval(memory);
        this.setState({
          lastPressed: evaluate,
          memory: evaluate,
        });
        break;
      }
      case ".": {
        const splitted = memory.split(/[+\-*/]/);
        const last = splitted.slice(-1)[0];

        if (!last.includes(".")) {
          this.setState({
            memory: memory + ".",
          });
        }

        break;
      }

      default: {
        let e = undefined;
        if (ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== "-") {
            const lastNumber = memory.split("").reverse()
              .findIndex((char) => char !== " " && nums.includes(+char));
            e = memory.slice(0, memory.length - lastNumber) + ` ${innerText} `;
          } else {
            e = `${memory} ${innerText} `;
          }
        } else {
          e = memory === "0" ? innerText : memory + innerText;
        }

        this.setState({
          memory: e,
        });
      }
    }

    this.setState({
      lastPressed: innerText,
    });
  };

  render() {
    const { memory } = this.state;
    return (
      <div className="calculator">
        <div id="display" className="display">
          {memory}
        </div>
        <div className="numbers">
          <button onClick={this.handleClick} className="light AC" id="clear">
            AC
          </button>
          {nums.map((num) => (
            <button
              onClick={this.handleClick}
              className={`dark ${num === 0 && "big"}`}
              key={num}
              id={ids[num]}>
              {num}
            </button>
          ))}
          <button onClick={this.handleClick} className="dark" id="decimal">
            .
          </button>
        </div>
        <div className="operation">
          {ops.map((op) => (
            <button
              onClick={this.handleClick}
              className="orange"
              key={op}
              id={ids[op]}>
              {op}
            </button>
          ))}
          <button onClick={this.handleClick} className="orange" id="equals">
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
