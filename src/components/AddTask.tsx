import { useEffect, useRef, useState } from "react";
import Task from "./Task";
import { motion, Reorder } from "framer-motion";

const AddTask = () => {
  const [inputList, setInputList] = useState([] as any);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [taskNumber, setTaskNumber] = useState(666);
  const borderLimit = useRef<HTMLDivElement>(null);
  const focusTask = useRef<HTMLDivElement>(null);

  //Gets all localStorage string 'props' and renders
  //new components based on those.

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
            key={localTaskId}
            id={localTaskId}
            locallyMounted={true}
            removeComponent={removeComponent}
            taskStatus={localTaskStatus}
            taskName={localTaskName}
            taskDate={localTaskDate}
            taskBody={localTaskBody}
            borderLimitRef={borderLimit}
          />,
        ]);
      });
  }, []);

  //UseEffect to fix weird side-effects of
  //components being rendered locally with
  //the ones from the localStorage.

  const removedTask = useEffect(() => {
    //The 'if' is just to fix weird behaviour of React.
    if (taskNumber !== 666) {
      setInputList(
        inputList.filter((data: any) => data.props.id !== taskNumber)
      );
    }
  }, [taskNumber]);

  //UseEffect to fix bug related to first
  //component not getting any date.

  const getDateEffect = useEffect(() => {
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

  //It triggers a useEffect used to remove tasks.
  //Needed to grab the real component in the list.

  function removeComponent(taskId: number) {
    setTaskNumber(taskId);
  }

  //Creates a local task.

  const createTask = (name: string, body: string, date: string) => {
    getDate();
    !name && !body
      ? alert("Escribe algo")
      : setInputList((prevState: any) => [
          ...prevState,
          <Task
            key={inputList.length + 1}
            id={inputList.length + 1}
            locallyMounted={false}
            removeComponent={removeComponent}
            taskStatus={false}
            taskName={name}
            taskDate={date}
            taskBody={body}
            borderLimitRef={borderLimit}
          />,
        ]);
    focusTask.current?.scrollIntoView();
    console.log(Number(Object.keys(localStorage)) + 1);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          width: "410px",
          fontFamily: "Nunito",
        }}
        className="border rounded  mx-auto my-auto"
      >
        <div style={{ fontFamily: "Helvetica" }} className="row">
          <div className="m-3 mb-2 col-12">
            <h1>add task:</h1>
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

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="form-control btn btn-primary mt-4"
                  type={"button"}
                  onClick={() => createTask(name, body, date)}
                >
                  <i className="bi bi-list-task me-2"> </i> generate new task!
                </motion.button>
              </div>
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
        <motion.div
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
        </motion.div>
      )}
    </div>
  );
};

export default AddTask;
