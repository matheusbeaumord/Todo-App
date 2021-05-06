import React from 'react';

export default function TodoItem(props) {
  const { title, date, completed, handleEdit, handleDelete, doneTask, deleted } = props;

  return (
    <div>
      <li className="list-group-item d-flex justify-content-between my-2">
        <h6
          className={`mt-1 mb-0 align-middle ${completed === true ? 'completed-task' : ''} ${deleted === true ? 'deleted-task' : ''} `}
        >
          {title}
        </h6>
        <div className="todo-icon">
          <span
            className={`mt-1 mb-0 align-middle ${completed === true ? 'completed-task' : ''} ${deleted === true ? 'deleted-task' : ''}`}
          >
            {date}
          </span>
          <span
            className={`mx-2 ${completed === true ? 'text-success' : 'text-secondary'} ${deleted === true ? 'deleted-task' : ''}`}
            onClick={doneTask}
          >
            <i
              className={`${completed === true ? 'far fa-check-square' : 'far fa-square'} ${deleted === true ? 'deleted-task' : ''}`}
            />
          </span>
          <span
            className="mx-2 text-warning"
            onClick={handleEdit}
          >
            <i className="fas fa-pen" />
          </span>
          <span
            className="mx-2 text-danger"
            onClick={handleDelete}
          >
            <i className="fas fa-trash" />
          </span>
        </div>
      </li>
    </div>
  )
}
