import React from 'react'

export default function TodoInput(props) {
  const { todo, handleChange, handleSubmit, updateTask, edit } = props;

  return (
    <div>
      <div className="card card-body my-3">
        <form onSubmit={edit === false ? handleSubmit : updateTask}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text bg-info text-white">
                <i className="fas fa-book" />
              </div>
            </div>

            <input
              type="text"
              className="form-control"
              placeholder="New Todo"
              value={todo}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-block mt-3 ${edit ? 'btn-success' : 'btn-info'}`}
          >
            {edit ? 'Edit task' : 'Add new task'}
          </button>
        </form>
      </div>
    </div>
  )
}
