import {v4} from 'uuid'
import {Component} from 'react'
import './index.css'

const tagsList = [
  {
    Id: v4(),
    displayText: 'Engineer',
  },
  {
    Id: v4(),
    displayText: 'Doctor',
  },
  {
    Id: v4(),
    displayText: 'Scientist',
  },
  {
    Id: v4(),
    displayText: 'Police Officer',
  },
]

class ItemsList extends Component {
  state = {
    Tasks: [],
    showError: false,
    name: '',
    date: '',
    goal: tagsList[0].displayText,
    showHome: true,
    showTasks: false,
  }

  componentDidMount() {
    console.log('t')
    this.intervalId = setInterval(this.updateRemainingTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  updateRemainingTime = () => {
    const {Tasks} = this.state
    const updatedTasks = Tasks.map(task => {
      const remainingTime = this.calculateRemainingTime(task.date)
      return {...task, remainingTime}
    })
    this.setState({Tasks: updatedTasks})
  }

  padNumber = number => {
    let a
    return number.toString().padStart(2, '0')
  }

  calculateRemainingTime = taskDate => {
    const now = new Date().getTime()
    const selectedDate = new Date(taskDate).getTime()
    const timeDiff = selectedDate - now

    if (timeDiff < 0) {
      return 'Expired'
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

    // return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`

    const formattedTime = `${days}d, ${this.padNumber(hours)}:${this.padNumber(
      minutes,
    )}:${this.padNumber(seconds)}`
    return formattedTime
  }

  Submit = event => {
    event.preventDefault()
    const {name, goal, date} = this.state
    if (name === '' || goal === '' || date === '') {
      this.setState({showError: true})
    } else {
      this.setState({showError: false})
      this.setState(prevState => ({
        Tasks: [...prevState.Tasks, {id: v4(), name, goal, date}],
        name: '',
        date: '',
        goal: tagsList[0].displayText,
      }))
    }
  }

  Name = event => {
    this.setState({name: event.target.value})
  }

  Date = event => {
    this.setState({date: event.target.value})
  }

  Select = event => {
    this.setState({goal: event.target.value})
  }

  ShowTask = () => {
    const {Tasks} = this.state
    console.log(Tasks)
    this.setState({showHome: false, showTasks: true})
  }

  GoHome = () => {
    this.setState({showHome: true, showTasks: false})
  }

  render() {
    const {showError, name, goal, showHome, showTasks, Tasks, date} = this.state
    const IsTasksThere = Tasks.length === 0
    return (
      <div className="divl">
        <div className="divNav">
          <div className="dd">
            <p className="p" onClick={this.GoHome}>
              Home
            </p>
            <p className="p" onClick={this.ShowTask}>
              Tasks
            </p>
          </div>
        </div>
        {showHome && (
          <form className="dab" onSubmit={this.Submit}>
            <h1 className="pc">What you want to become in future ?</h1>
            <div className="nam">
              <label className="po" htmlFor="name">
                Name
              </label>
              <input
                onChange={this.Name}
                type="text"
                value={name}
                id="name"
                placeholder="Your name"
                className="inp"
              />
            </div>
            <div className="nam">
              <label className="po" htmlFor="date">
                Date
              </label>
              <input
                onChange={this.Date}
                type="date"
                value={date}
                id="date"
                className="inp"
              />
            </div>
            <div className="nam">
              <label className="po" htmlFor="goal">
                Goal
              </label>
              <select
                id="goal"
                className="select"
                value={goal}
                onChange={this.Select}
              >
                {tagsList.map(each => (
                  <option key={each.Id} value={each.displayText}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="but">
              Submit
            </button>
            {showError && <p className="ep">Please fill all fields</p>}
          </form>
        )}
        {showTasks && (
          <div>
            {IsTasksThere ? (
              <div className="io">No Tasks were there!</div>
            ) : (
              <div>
                <ul className="ul">
                  {Tasks.map(each => (
                    <li key={each.id} className="li">
                      <div className="taskco">
                        <h1 className="ppp">
                          Hi, <span className="sph">{each.name}</span>
                          <br />
                          You have a great goal <br />
                          You just wanted to become
                          <span className="sph"> {each.goal}</span> <br />
                          All the best for your future. <br />
                          <span className="sph m">{each.remainingTime}</span>
                        </h1>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
export default ItemsList
