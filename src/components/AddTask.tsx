import { render } from "@testing-library/react";
import { number } from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import Task from "./Task";

const AddTask = () => {
  const [inputList, setInputList] = useState([] as any);

  useEffect(() => {
    Object.keys(localStorage)
      .sort()
      .forEach((value: string) => {
        const taskData = JSON.parse(localStorage.getItem(value)!);
        const localTaskId = taskData[0];
        const localTaskStatus = taskData[1];
        const localTaskName = taskData[2];
        const localTaskDate = taskData[3];
        const localTaskBody = taskData[4];

        //https://stackoverflow.com/questions/63207294/useeffect-overriding-the-state-instead-of-appending-the-values-while-making-fire

        setInputList((prevState: any) => [
          ...prevState,
          <Task
            id={localTaskId}
            locallyMounted={true}
            removeComponent={removeComponent}
            taskStatus={localTaskStatus}
            taskName={localTaskName}
            taskDate={localTaskDate}
            taskBody={localTaskBody}
          />,
        ]);
      });
    console.log(inputList);
  }, []);

  const [taskNumber, setTaskNumber] = useState(666);

  useEffect(() => {
    if (taskNumber !== 666) {
      setInputList(
        inputList.filter((data: any) => data.props.id !== taskNumber)
      );
    }
  }, [taskNumber]);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(getDate());
  }, [inputList]);

  const getDate = () => {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth();
    const day = current.getDate();
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const seconds = current.getSeconds();
    return `${day}-${month + 1}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const focusTask = useRef<HTMLDivElement>(null);

  function removeComponent(taskId: number) {
    setTaskNumber(taskId);
    // console.log(taskId);
  }

  const createTask = (name: string, body: string, date: string) => {
    getDate();
    !name && !body
      ? alert("Escribe algo")
      : setInputList((prevState: any) => [
          ...prevState,
          <Task
            key={inputList.length}
            id={inputList.length}
            locallyMounted={false}
            removeComponent={removeComponent}
            taskStatus={false}
            taskName={name}
            taskDate={date}
            taskBody={body}
          />,
        ]);
    focusTask.current?.scrollIntoView();
  };

  return (
    <div>
      <div
        style={{ backgroundColor: "#FFFFFF", width: "410px" }}
        className="border rounded  mx-auto my-auto"
      >
        <div className="row">
          <div className="m-3 mb-2 col-12">
            <h2>add task:</h2>
          </div>
        </div>

        <div className="row">
          <div className="m-3 mt-0 col-11">
            <form>
              <div className="form-group ">
                <span className="mb-1">task name:</span>
                <input
                  className="form-control"
                  required
                  type={"text"}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>

                <span>task body:</span>
                <textarea
                  className="form-control"
                  required
                  name="body"
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                ></textarea>

                <button
                  className="form-control btn btn-primary mt-4"
                  type={"button"}
                  onClick={() => createTask(name, body, date)}
                >
                  <i className="bi bi-list-task me-2"> </i> generate new task!
                </button>
              </div>
              {/* <div className="mb-1"></div>
              <div>
                <p className="mt-3"></p>
              </div> */}
            </form>
          </div>
        </div>
      </div>

      {inputList.length === 0 ? (
        <div
          style={{ backgroundColor: "#FFFFFF" }}
          className="mt-5 pt-3 w-75  mx-auto my-auto border rounded"
        >
          <div className="text-center">
            <h2>to-do list:</h2>
          </div>
          <div style={{ backgroundColor: "#f8f9fa" }}>
            <h5 className="text-center pt-5 pb-5 mb-0 mt-3 text-secondary ">
              there's no tasks! <i className="bi bi-emoji-laughing"></i>
            </h5>
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#FFFFFF" }}
          className="mt-5 p-3 w-75  mx-auto my-auto border rounded"
        >
          <div className="row ">
            <div className="col-12 text-center">
              <h2>to-do list:</h2>
            </div>
          </div>

          <div style={{ position: "relative" }} className="row mt-2 ge-5">
            {inputList}
          </div>
          <div ref={focusTask}></div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
