import { RefObject, useEffect, useRef, useState } from "react";
import { motion, Reorder } from "framer-motion";

const Task = (props: {
  id: number;
  locallyMounted: boolean;
  removeComponent: Function;
  taskStatus: boolean;
  taskName: string;
  taskDate: string;
  taskBody: string;
  borderLimitRef: RefObject<HTMLDivElement>;
}) => {
  const id = props.id;
  const [status, setStatus] = useState(props.taskStatus);
  const [name, setName] = useState(props.taskName);
  const date = props.taskDate;
  const [body, setBody] = useState(props.taskBody);
  const borderLimit = props.borderLimitRef;

  const cardHeaderColor = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [taskData, setTaskData] = useState([
    id,
    status,
    name,
    date,
    body,
  ] as any);

  useEffect(
    () => {
      // component mounts
      !props.locallyMounted
        ? localStorage.setItem(String(id), JSON.stringify(taskData))
        : console.log("localStorage mounted: " + props.locallyMounted);

      // called before component unmount
      return () => {
        localStorage.removeItem(String(id));
      };
    },
    [] /*<- only on the first mount*/
  );

  return (
    <Reorder.Item
      key={id}
      value={Task}
      drag
      dragConstraints={props.borderLimitRef}
      dragSnapToOrigin={true}
      whileDrag={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-4 col-sm-6"
    >
      <div
        className="border rounded shadow"
        style={{ backgroundColor: "#ffffff", fontFamily: "Nunito" }}
      >
        <div className="card-header">
          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              let newArray = [...taskData];
              newArray[1] = !newArray[1];
              setTaskData(newArray);

              localStorage.removeItem(String(id));
              localStorage.setItem(String(id), JSON.stringify(newArray));
              setStatus((prevCheck) => !prevCheck);
            }}
          >
            STATUS:
            {"   "}
            <span
              style={{ fontSize: "18px" }}
              className="ms-2 ps-2 badge bg-light"
            >
              {status ? (
                <strong className="text-success">COMPLETE</strong>
              ) : (
                <strong className="text-warning">TODO</strong>
              )}
            </span>
          </motion.button>
        </div>

        <div>
          {/* Conditional rendering */}

          {/* NORMAL MODE */}
          {!editMode ? (
            <div className="m-3">
              <h3>task:</h3>
              <h5>{name}</h5>
              <p className="font-sm">
                <label className="me-1">date: </label>
                <label>{date}</label>
              </p>
              <p className="font-italic">
                <label>{body}</label>
              </p>{" "}
              <div className="row">
                <div className="col-6">
                  {status ? (
                    <motion.button
                      onClick={() => setEditMode((prevState) => !prevState)}
                      className="btn btn-warning w-100 me-0"
                      disabled
                    >
                      <i className="bi bi-pencil-fill me-2"> </i>edit task
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditMode((prevState) => !prevState)}
                      className="btn btn-warning w-100 me-0"
                    >
                      <i className="bi bi-pencil-fill me-2"> </i>edit task
                    </motion.button>
                  )}
                </div>
                <div className="col-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      props.removeComponent(id);
                    }}
                    className="btn btn-danger w-100"
                  >
                    <i className="bi bi-trash-fill me-2"> </i>delete task
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            // EDITOR MODE
            <div className="m-3">
              <p className="m-0">
                <label>task:</label>
              </p>
              <p className="m-0">
                <input
                  className="form-control"
                  type={"text"}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </p>
              <p className="m-0">
                <label>body:</label>
              </p>
              <p>
                <textarea
                  className="form-control"
                  name="body"
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                ></textarea>
              </p>
              <p>
                <motion.button
                  onClick={() => {
                    let newArray = [...taskData];
                    newArray[2] = name;
                    newArray[4] = body;
                    setTaskData(newArray);

                    localStorage.removeItem(String(id));
                    localStorage.setItem(String(id), JSON.stringify(newArray));
                    setEditMode((prevState) => !prevState);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-success w-50"
                >
                  <i className="bi bi-card-checklist me-2"></i>
                  save
                </motion.button>
              </p>
            </div>
          )}
        </div>
      </div>
    </Reorder.Item>
  );
};

export default Task;
