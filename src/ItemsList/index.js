import {v4} from 'uuid'
import {Component} from 'react'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class ItemsList extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    TaskList: [],
    Tasks: [],
    show: true,
    tagValue: tagsList[0].optionId,
    active: '',
  }

  componentDidMount() {
    const {tagValue} = this.state
    if (tagValue !== tagsList[0].optionId) {
      this.setState({tagValue: tagsList[0].optionId})
    }
  }

  task = event => {
    this.setState({task: event.target.value})
  }

  Tag = event => {
    this.setState({tag: event.target.value, tagValue: event.target.value})
  }

  Category = id => {
    const {TaskList} = this.state
    const UpData = TaskList.filter(each => each.tag === id)
    console.log(UpData)
    this.setState({Tasks: UpData, show: false, active: id})
  }

  AddTaskBut = event => {
    event.preventDefault()
    const {task, tag} = this.state
    const firstTagOptionId = tagsList[0].optionId
    this.setState(
      prevState => ({
        TaskList: [...prevState.TaskList, {id: v4(), tag, task}],
        tagValue: firstTagOptionId,
        tag: firstTagOptionId,
        task: '',
      }),
      () => {
        document.getElementById('task').value = ''
      },
    )
  }

  render() {
    const {TaskList, show, Tasks, tagValue, active} = this.state
    const isTaskThere = TaskList.length === 0
    console.log(Tasks)
    return (
      <div className="md">
        <div className="divl">
          <h1 className="h1">Create a Task!</h1>
          <form onSubmit={this.AddTaskBut}>
            <div className="dd">
              <label className="t" htmlFor="task">
                Task
              </label>
              <input
                onChange={this.task}
                className="inp"
                id="task"
                type="text"
                placeholder="Enter the task here"
              />
            </div>
            <div className="dd">
              <label className="t" htmlFor="tag">
                Tags
              </label>
              <select
                className="inp"
                htmlFor="tag"
                value={tagValue}
                onChange={this.Tag}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="but" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="divl">
          <h1 className="k">Tags</h1>
          <ul className="ul">
            {tagsList.map(each => (
              <li key={each.optionId} className="lii">
                <button
                  className={`butTag ${
                    active === each.optionId ? 'active' : ''
                  }`}
                  type="button"
                  onClick={() => this.Category(each.optionId)}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="k">Tasks</h1>
          {isTaskThere ? (
            <p className="k">No Tasks Added Yet</p>
          ) : (
            <div>
              {show ? (
                <ul>
                  {TaskList.map(each => (
                    <li key={each.id}>
                      <div className="div">
                        <p className="k">{each.task}</p>
                        <p className="pp bb">{each.tag}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul>
                  {Tasks.map(each => (
                    <li key={each.id}>
                      <div className="div">
                        <p className="k">{each.task}</p>

                        <p className="pp bb">{each.tag}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default ItemsList
