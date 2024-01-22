import React, { useState, useRef } from 'react';

function TodoList() {
  const [activity, setActivity] = useState('');
  const [listData, setListData] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const refElement = useRef('');

  function addActivity() {
    const trimmedActivity = activity.trim();

    if (trimmedActivity !== '') {
      setListData((listData) => [...listData, trimmedActivity]);
      setActivity('');
      refElement.current.focus()
    }
  }

  function removeActivity(index) {
    const updatedList = listData.filter((_, i) => i !== index);
    setListData(updatedList);
  }

  function editActivity(index) {
    setEditedIndex(index);
    setEditedValue(listData[index]);
  }

  function handleEditSubmit() {
    if (editedIndex !== null) {
      const updatedList = [...listData];
      updatedList[editedIndex] = editedValue;
      setListData(updatedList);
      setEditedIndex(null);
      setEditedValue('');
    }
  }

  function removeAll() {
    setListData([]);
  }

  return (
    <div className="container">
      <div className="header">TodoList</div>
      <input
        type="text"
        ref={refElement}
        placeholder="Enter Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <button className="btn-cont" onClick={addActivity}>
        Add
      </button>
      {listData.length > 0 &&
        listData.map((data, i) => (
          <p key={i}>
            <div className="listData">{editedIndex === i ? <input type="text" value={editedValue} onChange={(e) => setEditedValue(e.target.value)} /> : data}</div>
            <div className="btns">
              <div>
                <button className="btn-cont" onClick={() => removeActivity(i)}>
                  Remove
                </button>
              </div>
              <div>
                {editedIndex === i ? (
                  <button className="btn-cont" onClick={handleEditSubmit}>
                    Save
                  </button>
                ) : (
                  <button className="btn-cont" onClick={() => editActivity(i)}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </p>
        ))}
      {listData.length >= 2 && (
        <button className="btn-cont" onClick={removeAll}>
          Remove All
        </button>
      )}
    </div>
  );
}

export default TodoList;





// Concepts used - Hooks, listrendering, conditionalrendering, eventhandling,useRef, trim,map, filter methods
// concepts pending - react component styling, axios, redux
// concepts to be revised again - passing methods as props 

